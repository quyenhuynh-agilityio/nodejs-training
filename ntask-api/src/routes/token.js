import jwt from "jwt-simple";
import { config } from "../libs/config.js";
import { db } from "../db.js";

export function jwtRoute() {
  const Users = db().models.Users;

  app.post("/token", (req, res) => {
    if (req.body.email && req.body.password) {
      const email = req.body.email;
      const password = req.body.password;

      Users.findOne({ where: { email: email } })
        .then((user) => {
          if (Users.isPassword(user.password, password)) {
            const payload = { id: user.id };
            res.json({
              token: jwt.encode(payload, config.jwtSecret),
            });
          } else {
            res.sendStatus(401);
          }
        })
        .catch((error) => res.sendStatus(401));
    } else {
      res.sendStatus(401);
    }
  });
}
