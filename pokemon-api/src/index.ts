import express from "express";
import bodyParser from "body-parser";

// Database configs
import { sequelize } from "./configs/database";

// Routes
import { PokemonRoute } from "./routes/pokemon";
import { TypeRoute } from "./routes/type";

export const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// CRUD operations for Pokemon
PokemonRoute(app);

// CRUD operations for Pokemon Type
TypeRoute(app);

// Sync database and start server
sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.error("Unable to sync the database:", err);
  });
