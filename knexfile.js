// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://caL_@localhost/talentdb',
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
