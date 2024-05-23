const express = require("express");
const sequelize = require("./db");
const usersRoute = require("./routes/users");
const tasksRoute = require("./routes/task");

const PORT = 3000;
const app = express();
// Middleware to parse JSON
app.use(express.json());

// Sync database and start server
sequelize
  .sync()
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
usersRoute(app);
tasksRoute(app);

app.listen(PORT, () => console.log(`NTask API - Port ${PORT}`));
