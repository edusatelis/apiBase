export const environment = {
    server: { port: process.env.SERVER_PORT || 3000},
    db: { url: process.env.DB_URL || 'mongodb://localhost:27017/apiBase'},
    security: { saltRounds: process.env.SALT_ROUNDS || 10, apiSecret: process.env.API_SECRET || 'apiBase-secret-api'}
}