import express, { RequestHandler } from "express";
import { WebsocketRequestHandler } from "express-ws";
import { db } from "../firestore";
import { EMPTY_NOTE } from "../definitions";
import "./patchRouter";

const router = express.Router();

const notesHandler: WebsocketRequestHandler = async (ws) => {
  db.collection("notes").onSnapshot((snapshot) => {
    const notes = snapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.get("title"),
      contentId: doc.get("contentId"),
    }));
    ws.send(JSON.stringify({ notes }));
  });
};
router.ws("/", notesHandler);

const createNoteHandler: RequestHandler = async (_req, res) => {
  const contentDoc = await db
    .collection("content")
    .add({ content: EMPTY_NOTE });
  const newNote = { title: "", contentId: contentDoc.id };
  const { id } = await db.collection("notes").add(newNote);
  res.json({ id });
};
router.post("/", createNoteHandler);

const updateNoteHandler: RequestHandler = async (req, res) => {
  await db.collection("notes").doc(req.params.id).update(req.body);
  res.json({});
};
router.put("/:id", updateNoteHandler);

const deleteNoteHandler: RequestHandler = async (req, res) => {
  const doc = db.collection("notes").doc(req.params.id);
  const contentId = await (await doc.get()).get("contentId");
  if (contentId) {
    await db.collection("content").doc(contentId).delete();
  }
  await doc.delete();
  res.json({});
};
router.delete("/:id", deleteNoteHandler);

export default router;
