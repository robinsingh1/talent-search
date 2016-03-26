import knex from 'knex';
import bookshelf from 'bookshelf';
import config from '../../src/config';

const dbConfig = {
  client: 'postgresql',
  connection: config.pgconn,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};


export default bookshelf(knex(dbConfig));
