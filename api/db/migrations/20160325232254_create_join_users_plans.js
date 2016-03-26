
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_plans', function(t){
    t.increments();
    t.integer('user_id').references('users.id');
    t.integer('plan_id').references('subscription_plans.id');
    t.boolean('active').defaultTo(false);
    t.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_plans');
};
