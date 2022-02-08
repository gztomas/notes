import express, { RequestHandler, Response } from "express";
import { WebsocketRequestHandler } from "express-ws";
import { Descendant } from "slate";
import { db } from "../firestore";
import { EMPTY_NOTE } from "./definitions";

// Patch `express.Router` to support `.ws()` without needing to pass around a `ws`-ified app.
// https://github.com/HenningM/express-ws/issues/86
// eslint-disable-next-line @typescript-eslint/no-var-requires
const patch = require("express-ws/lib/add-ws-method");
patch.default(express.Router);

const router = express.Router();

export interface NotesResponse {
  notes: Array<{
    id: string;
    title: string;
  }>;
}

export interface NoteResponse {
  id: string;
  title: string;
  content: Array<Descendant>;
}

const getNotesHandler: RequestHandler = async (
  _req,
  res: Response<NotesResponse>
) => {
  const data = (
    await Promise.all(
      (await db.collection("notes").listDocuments()).map((doc) => doc.get())
    )
  ).map((snapshot) => ({ title: snapshot.data()?.title, id: snapshot.id }));
  res.json({
    notes: data,
  });
};

const notesHandler: WebsocketRequestHandler = async (ws) => {
  db.collection("notes").onSnapshot((snapshot) => {
    const notes = snapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.get("title"),
    }));
    ws.send(JSON.stringify({ notes }));
  });
};

const postNoteHandler: RequestHandler = async (_req, res) => {
  const contentDoc = await db.collection("content").add({
    content: EMPTY_NOTE,
  });
  const doc = await db.collection("notes").add({
    title: "",
    contentId: contentDoc.id,
  });
  res.json({
    id: doc.id,
  });
};

const deleteNoteHandler: RequestHandler = async (req, res) => {
  const doc = db.collection("notes").doc(req.params.id);
  const contentId = await (await doc.get()).get("contentId");
  await db.collection("content").doc(contentId).delete();
  await doc.delete();
  res.json({});
};

const noteHandler: WebsocketRequestHandler = async (ws, req) => {
  const note = (await db.collection("notes").doc(req.params.id).get()).data();
  if (note) {
    const content = (
      await db.collection("content").doc(note.contentId).get()
    ).data();

    if (content) {
      ws.send(
        JSON.stringify({
          title: note.title,
          content: content.content,
        })
      );

      ws.on("message", async (data) => {
        const update = data ? JSON.parse(String(data)) : null;
        if (update) {
          if ("content" in update) {
            db.collection("content").doc(note.contentId).update(update);
          }
          if ("title" in update) {
            db.collection("notes").doc(req.params.id).update(update);
          }
        }
      });
    }
  }
};

router.get("/", getNotesHandler);
router.ws("/", notesHandler);
router.post("/", postNoteHandler);
router.delete("/:id", deleteNoteHandler);
router.ws("/:id", noteHandler);

export default router;
