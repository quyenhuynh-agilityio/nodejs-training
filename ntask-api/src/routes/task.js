module.exports = (app) => {
  const Task = require("../models/tasks");
  app.post("/tasks", async (req, res) => {
    console.log("req.body", req.body);
    try {
      const user = await Task.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Get all tasks
  app.get("/tasks", async (req, res) => {
    try {
      const tasks = await Task.findAll();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get a user by ID
  app.get("/tasks/:id", async (req, res) => {
    try {
      const user = await Task.findByPk(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Update a user by ID
  app.put("/tasks/:id", async (req, res) => {
    try {
      const [updated] = await Task.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedUser = await Task.findByPk(req.params.id);
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Delete a user by ID
  app.delete("/tasks/:id", async (req, res) => {
    try {
      const deleted = await Task.destroy({
        where: { id: req.params.id },
      });
      if (deleted) {
        res.status(204).json();
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};
