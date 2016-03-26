// Update with your config settings.
var config = require('./src/config');

module.exports = {

  development: {
    client: 'postgresql',
    connection: config.pgconn,
    pool: {
      min: 0,
      max: 10,
      ping: function (conn, cb) { conn.query('SELECT 1', cb); }
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './api/db/migrations'
    },
    seeds: {
      directory: './api/db/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './api/db/migrations'
    },
    seeds: {
      directory: './api/db/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './api/db/migrations'
    },
    seeds: {
      directory: './api/db/seeds'
    }
  }

};
