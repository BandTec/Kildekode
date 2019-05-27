module.exports = {
    port: 3333,
    secret: 'meusegredo',
    postgres: {
        poolSettings: {
            host: 'kildekode.postgres.database.azure.com',
            user: 'whoami@kildekode',
            password: 'P@55w.rd',
            database: 'kildekode',
            port: 5432,
            ssl: {rejectUnauthorized : false},
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        }
    },
  }