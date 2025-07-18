const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Favorite Books and Songs API',
        description: 'API of favorite songs and books'
    },
    host: 'localhost:3000',
    schemes: ['http' ,'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);