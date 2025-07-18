const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 3000;

const Validator = require('./helpers/validate');
Validator.register(
    'string_or_array',
    function(value, requirement, attribute) {
        return typeof value === 'string' || Array.isArray(value);
    },
    'The :attribute must be a string or an array.'
);


app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
    if(err) {
        console.log(err)
    } else {
        app.listen(port, () => (console.log(`Database is listening and node running on port ${port}`)));
    }
})
