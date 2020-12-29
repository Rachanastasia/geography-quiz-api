const app = require('./app')

const { PORT } = require('./config')

app.listen(PORT, () => {
    console.log(`GraphQL server is running at http://localhost:${PORT}`)
})