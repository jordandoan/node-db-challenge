
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tasks').insert([
          {project_id: 1, description: "create front end", notes: "use react!!!", completed: true},
          {project_id: 1, description: "create back end"},
          {project_id: 1, description: "deploy app"},
          {project_id: 2, description: "choose topic"},
          {project_id: 2, description: "buy book"},
          {project_id: 3, description: "buy soap", completed: true},
          {project_id: 3, description: "wait for day off"},
          {project_id: 3, description: "wash car"}
      ]);
};
