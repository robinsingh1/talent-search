
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(t){
    t.increments().primary();
    t.string('email');
    t.string('username');
    t.string('password');
    t.string('full_name');
    t.timestamps();
  })
  .then(function(){
    console.log('Users table created');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
