import cors from "cors";
import express from "express";
import expressWs from "express-ws";
import apiRoutes from "./routes";
import { startCollaborationServer } from "./routes/collaboration";

const app = express();
const PORT = 3001;

expressWs(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

startCollaborationServer();
