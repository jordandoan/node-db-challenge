
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').insert([
          {name: "make app", description:"front end and back end", completed: true},
          {name: "create coding class"},
          {name: "Clean up car"}
      ]);
};
