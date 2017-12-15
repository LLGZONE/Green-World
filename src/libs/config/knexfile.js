const secrets = require('../secrets')

module.exports = {
  development: {
    client: 'pg',
    version: '7.4.0',
    connection: {
      host: '127.0.0.1',
      user: 'ubuntu',
      password: secrets.dp,
      database: 'test'
    }
  },
  production: {
    client: 'pg',
    version: '7.4.0',
    connection: {
      host: '127.0.0.1',
      user: 'user',
      password: secrets.dp,
      database: 'GreanWorld'
    }
  }
}