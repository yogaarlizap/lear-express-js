module.exports = {
  port: process.env.PORT || 9090,
  ip: process.env.HOST || '0.0.0.0',
  mariadb: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306',
    dbname: process.env.DB_NAME || 'database_development',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
  },
  redis: {
    uri: process.env.REDIS_URL || 'redis://localhost:6379',
  },
  jwtSecret: process.env.JWT_SECRET || 'jkl!±@£!@ghj1237',
};
