import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json";

export const db = admin
  .initializeApp({
    credential: admin.credential.cert({
      projectId: serviceAccount.project_id,
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
    }),
    databaseURL: "https://notes-7618b.firebaseio.com",
  })
  .firestore();
