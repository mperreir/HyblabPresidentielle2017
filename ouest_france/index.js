
const
    dotenv = require('dotenv');
    app    = require('express')();

const router = require('./server');

dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(router);

const server = app.listen(PORT, () => {
    console.log(`Parrains2017 server listening on port ${PORT}`);
});

