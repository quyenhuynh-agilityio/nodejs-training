import { db } from "../db.js";

module.exports = (app) => {
  db()
    .sync()
    .done(() => {
      app.listen(app.get("port"), () => {
        console.log(`NTask API - Port ${app.get("port")}`);
      });
    });
};
