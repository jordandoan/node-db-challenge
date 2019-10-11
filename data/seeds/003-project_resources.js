
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('project_resources').insert([
          {project_id: 1, resource_id: 1},
          {project_id: 1, resource_id: 2},
          {project_id: 2, resource_id: 1},
          {project_id: 2, resource_id: 2},
          {project_id: 3, resource_id: 3}
      ]);
};