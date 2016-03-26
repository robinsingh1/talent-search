
exports.up = function(knex, Promise) {
  return knex.schema.createTable('subscription_plans', function(t){
    t.increments().primary();
    t.string('name');
    t.string('request_limit');
  })
  .then(function(){
    console.log('Subscription Plans table created');
    return knex.insert([
      {name: 'Trial'     , request_limit: 100},
      {name: 'Starter'   , request_limit: 300},
      {name: 'Growth'    , request_limit: 500},
      {name: 'Enterprise', request_limit: 800},
    ])
    .into('subscription_plans');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('subscription_plans');
}
