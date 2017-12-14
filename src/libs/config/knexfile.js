

module.exports = {
  test: {
    client: 'pg',
    version: '7.4.0',
    connection: {
      host: 'localhost',
      user: 'user',
      password: 'password',
      database: 'test'
    }
  },
  production: {
    client: 'pg',
    version: '7.4.0',
    connection: {
      host: 'localhost',
      user: 'user',
      password: 'password',
      database: 'GreanWorld'
    }
  }
}