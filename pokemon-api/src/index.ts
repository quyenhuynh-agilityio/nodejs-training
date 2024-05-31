import express from "express";
import { syncDatabase } from "./configs/database";

const PORT = 3000;
const app = express();
// Middleware to parse JSON
app.use(express.json());
// Sync database and start server
syncDatabase(app, PORT);
