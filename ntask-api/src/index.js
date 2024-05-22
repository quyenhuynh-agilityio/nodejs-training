import express from "express";
import { nTaskRoute } from "./routes/index.js";
import { TaskRoute } from "./routes/task.js";
import { db } from "./db.js";

const PORT = 3000;
const app = express();

// Sync database and start server
db()
  .sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synced");
    app.listen(8000, () => {
      console.log(`Server is running on port ${8000}`);
    });
  })
  .catch((err) => {
    console.error("Unable to sync the database:", err);
  });

// Return as formatted and tabbed JSON output
app.set("json spaces", 4);

app.get("/", nTaskRoute);

app.get("/tasks", TaskRoute);

app.listen(PORT, () => console.log(`NTask API - Port ${PORT}`));
