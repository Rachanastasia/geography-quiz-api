module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'developemnt',
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://rachel@localhost/geography',
    JWT_SECRET: process.env.JWT_SECRET || 'so-secret',
    JWT_EXPIRY: process.env.JWT_EXPIRY || '3h'
}