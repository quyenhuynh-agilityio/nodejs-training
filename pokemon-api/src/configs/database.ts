import express from "express";

const { Sequelize } = require("sequelize");

// Initialize Sequelize to use SQLite
export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: `${__dirname}/../database.sqlite`,
});

// Sync database and start server
export const syncDatabase = (app: express.Application, PORT: number) =>
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
