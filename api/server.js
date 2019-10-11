const express = require("express");

const server = express();
const db = require("../projects/projects-model");
server.use(express.json());

server.get("/", (req,res) => {
  res.send("home page!!");
});

server.get("/api/projects", (req,res) => {
  db.getProjects()
    .then(projects => res.status(200).json(projects))
});

server.get("/api/resources", (req,res) => {
  db.getResources()
    .then(resources => res.status(200).json(resources));
});

server.get("/api/projects/:id/tasks", (req,res) => {
  db.getTasks(req.params.id)
    .then(tasks => {
      tasks.forEach(task => {
        if (task.completed) {
          task.completed = true
        } else {
          task.completed = false
        }
      })
      res.status(200).json(tasks);
    });
});

module.exports = server;