import { db } from "../db.js";

export function TaskRoute(app) {
  const Tasks = db().models.Tasks;
  app
    .route("/tasks")
    .all((req, res) => {
      delete req.body.id;
      next();
    })
    .get((req, res) => {
      // GET /tasks callback...
      Tasks.findAll({})
        .then((result) => res.json(result))
        .catch((error) => {
          res.status(412).json({ msg: error.message }); // the 412 - Precondition Failed status code.
        });
    })
    .post((req, res) => {
      // POST /tasks callback...
      Tasks.create({})
        .then((result) => res.json(result))
        .catch((error) => {
          res.status(412).json({ msg: error.message }); // the 412 - Precondition Failed status code.
        });
    });
  app
    .route("/tasks/:id")
    .all((req, res) => {
      delete req.body.id;
      next();
    })
    .get((req, res) => {
      // GET /tasks/id callback...
      Tasks.findOne({ where: req.params })
        .then((result) => {
          if (result) {
            res.json(result);
          } else {
            res.sendStatus(404);
          }
        })
        .catch((error) => {
          res.status(412).json({ msg: error.message }); // the 412 - Precondition Failed status code.
        });
    })
    .put((req, res) => {
      // PUT /tasks/id callback...
      Tasks.update(req.body, { where: req.params })
        .then((result) => {
          res.sendStatus(204);
        })
        .catch((error) => {
          res.status(412).json({ msg: error.message }); // the 412 - Precondition Failed status code.
        });
    })
    .delete((req, res) => {
      Tasks.destroy({ where: req.params })
        // DELETE /tasks/id callback...
        .then((result) => {
          res.sendStatus(204);
        })
        .catch((error) => {
          res.status(412).json({ msg: error.message }); // the 412 - Precondition Failed status code.
        });
    });
}
