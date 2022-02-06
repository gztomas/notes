import express, { RequestHandler, Response } from "express";
import { WebsocketRequestHandler } from "express-ws";
import { Descendant } from "slate";
import { db } from "../firestore";

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

const postNoteHandler: RequestHandler = async (_req, res) => {
  const doc = await db.collection("notes").add({
    title: "",
    content: [{ type: "paragraph", children: [{ text: "" }] }],
  });
  res.json({
    id: doc.id,
  });
};

const deleteNoteHandler: RequestHandler = async (req, res) => {
  await db.collection("notes").doc(req.params.id).delete();
  res.json({});
};

const noteHandler: WebsocketRequestHandler = async (ws, req) => {
  const note = (await db.collection("notes").doc(req.params.id).get()).data();
  ws.send(JSON.stringify({ id: req.params.id, ...note }));

  ws.on("message", async (data) => {
    const update = data ? JSON.parse(String(data)) : null;
    if (update) {
      db.collection("notes").doc(req.params.id).update(update);
    }
  });
};

router.get("/", getNotesHandler);
router.post("/", postNoteHandler);
router.delete("/:id", deleteNoteHandler);
router.ws("/:id", noteHandler);

export default router;
