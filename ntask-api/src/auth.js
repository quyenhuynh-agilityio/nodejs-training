import passport, { authenticate, initialize } from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import { db } from "./db.js";
import { config } from "../libs/config.js";

export function auth() {
  const Users = db().models.Users;

  const params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
  };

  const strategy = new Strategy(params, (payload, done) => {
    Users.findById(payload.id)
      .then((user) => {
        if (user) {
          return done(null, {
            id: user.id,
            email: user.email,
          });
        }
        return done(null, false);
      })
      .catch((error) => done(error, null));
  });
  passport.use(strategy);
  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate("jwt", config.jwtSession);
    },
  };
}
