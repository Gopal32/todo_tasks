require('dotenv').config({ path: process.env.PWD + '/.env' })

module.exports = {
    port: process.env.PORT,
    mysql: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    },
    jwtSecretKey: process.env.JWT_SECRET_KEY
}