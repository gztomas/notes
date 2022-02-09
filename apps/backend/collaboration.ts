import { SocketIOConnection } from "@slate-collaborative/backend";
import { EMPTY_NOTE } from "./definitions";
import { db } from "./firestore";

const PORT = 3002;

export const startCollaborationServer = () =>
  new SocketIOConnection({
    entry: PORT,
    defaultValue: EMPTY_NOTE,
    saveFrequency: 2000,

    onDocumentLoad: async (pathname) => {
      const doc = (await db.collection("content").doc(pathname).get()).data();
      return doc ? doc.content : EMPTY_NOTE;
    },

    onDocumentSave: (pathname, content) => {
      db.collection("content").doc(pathname).set({ content });
    },
  });
