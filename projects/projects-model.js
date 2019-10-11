const db = require("../data/db-config");

module.exports = {
  getProjects,
  getResources,
  getTasks,
  addProject,
  addResource,
  addTask
}


function getProjects() {
  return db('projects')
}

function getResources() {
  return db('resources')
}

function getTasks(project_id) {
  return db('tasks as t')
    .where({project_id: project_id})
    .join('projects as p', 'p.id', 't.project_id')
    .select('t.id', 'p.name as project_name', 'p.description as project_description', 't.description as task_description', 't.notes', 't.completed')
}

function addProject(project) {
  return db('projects').insert(project)
}

function addResource(resource) {
  return db('resources').insert(resource)
}

function addTask(task) {
  return db('tasks').insert(task)
}

