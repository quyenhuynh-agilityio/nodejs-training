import express from "express";
import { nTaskRoute } from "./routes/index.js";
import { TaskRoute } from "./routes/task.js";

const PORT = 3000;
const app = express();

// Return as formatted and tabbed JSON output
app.set("json spaces", 4);

app.get("/", nTaskRoute);

app.get("/tasks", TaskRoute);

app.listen(PORT, () => console.log(`NTask API - Port ${PORT}`));
