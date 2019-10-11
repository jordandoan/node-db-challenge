const db = require("../data/db-config");

module.exports = {
  getProjects,
  getResources,
  getTasks,
  addProject,
  addResource,
  addTask,
  getProjectById,
  getResourcesById
}


function getProjects() {
  return db('projects')
}

function getProjectById(id) {
  return db('projects')
          .where({id: id})
  // return db('project_resources as pr')
  //         .where({project_id: id})
  //         .join('resources as r', 'pr.resource_id', 'r.id')
  //         .select('r.name')
}

function getResourcesById(id) {
  return db('project_resources as pr')
          .where({project_id: id})
          .join('resources as r', 'pr.resource_id', 'r.id')
          .select('r.name', 'r.description')
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

