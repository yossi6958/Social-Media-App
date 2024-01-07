import express from "express";
import path from "path";
import http from "http";
import cors from "cors";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import initRoutes from "./routes/configRoutes.js";
import "./db/mongoConnect.js";

const app = express();

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({ limits: { fileSize: 1024 * 1024 * 10 }, useTempFiles: true })
);
app.use(express.static(path.join(__dirname, "tmp")));

initRoutes(app);

const server = http.createServer(app);
const port = process.env.PORT || 3001;
server.listen(port);
