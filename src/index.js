const express = require('express');
const userRouters = require('./routers/user');
require('../db/mongoose');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRouters);

app.listen(port, () => {
    console.log('Server is up on port' + port);
})