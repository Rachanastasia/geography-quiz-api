require('dotenv').config();
const express = require('express');
const cors = require('cors');
//const helmet = require('helmet');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
app.use(cors());
//app.use(helmet());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


module.exports = app;