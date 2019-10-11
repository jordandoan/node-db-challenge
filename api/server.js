const express = require("express");

const server = express();
const db = require("../projects/projects-model");
server.use(express.json());

server.get("/", (req,res) => {
  res.send("home page!!");
});

server.get("/api/projects", (req,res) => {
  db.getProjects()
    .then(projects => {
      projects.forEach(project => {
        if (project.completed) {
          project.completed = true;
        } else {
          project.completed = false;
        }
      })
      res.status(200).json(projects)
    })
});

server.get("/api/projects/:id", (req,res) => {
  db.getProjectById(req.params.id)
    .then(projects => {
      processCompleted(projects)
      return projects[0]
    })
    .then(project => db.getTasksInfo(req.params.id)
                        .then(tasks => {
                          processCompleted(tasks)
                          project = {...project, tasks: tasks};
                          return project
                        }))
    .then(project => db.getResourcesById(req.params.id)
                        .then(resources => {
                          project = {...project, resources: resources}
                          res.status(200).json(project);
                        }))
   })

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

server.post("/api/projects", (req,res) => {
  const project = req.body;
  if (!project.completed) {
    project.completed = false
  }
  db.addProject(project)
    .then(id => res.status(201).json({id: id[0]}))
    .catch(err => res.json(err));

})

server.post("/api/resources", (req,res) => {
  db.addResource(req.body)
    .then(id => res.status(201).json({id: id[0]}))
})

server.post("/api/projects/:id/tasks", (req,res) => {
  const task = req.body;
  task.completed = task.completed || false
  db.addTask(task)
    .then(id => res.status(201).json({id: id[0]}))
})

function processCompleted(arr) {
  arr.forEach(idx => {
    if (idx.completed) {
      idx.completed = true
    } else {
      idx.completed = false
    }
  })
}
module.exports = server;