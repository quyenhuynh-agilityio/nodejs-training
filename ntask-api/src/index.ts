import express from "express";
import { getNTask } from "./routes/index";
import { getTaskList } from "./routes/task";

const PORT = 3000;
const app = express();

// Return as formatted and tabbed JSON output
app.set("json spaces", 4);

app.get("/", getNTask);

app.get("/task", getTaskList);

app.listen(PORT, () => console.log(`NTask API - Port ${PORT}`));
