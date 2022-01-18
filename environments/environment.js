module.exports = {
    port: process.env.PORT || 3001,
    database: {
        host: process.env.DATABASE_HOST || 'localhost',
        username: process.env.DATABASE_USERNAME || 'root',
        password: process.env.DATABASE_PASSWORD || '',
        name: process.env.DATABASE_NAME || 'articul'
    }
};