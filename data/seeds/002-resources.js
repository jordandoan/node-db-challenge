
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('resources').insert([
          {name:"JavaScript"},
          {name:"SQL"},
          {name:"Soap"}
        ]);
};
