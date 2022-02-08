import { SocketIOConnection } from "@slate-collaborative/backend";
import { EMPTY_NOTE } from "./definitions";

const PORT = 3002;

export const startCollaborationServer = () => {
  const connection = new SocketIOConnection({
    entry: PORT,
    defaultValue: EMPTY_NOTE,
    saveFrequency: 2000,
    onAuthRequest: async (query, socket) => {
      console.log("onAuthRequest", query, socket);
      return true;
    },
    onDocumentLoad: async (pathname) => {
      console.log("onDocumentLoad", pathname);
      return EMPTY_NOTE;
    },
    onDocumentSave: async (pathname, doc) => {
      console.log("onDocumentSave", pathname);
    },
  });
  return connection;
};
