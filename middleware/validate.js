const validator = require('../helpers/validate');

const saveBook = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        author: 'required|string',
        language: 'required|string',
        genre: 'required|string',
        desc: 'required|string',
        publisher: 'required|string',
        publicationDate: 'required|string',
        pages: 'string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err
        });
        } else {
            next();
        }
    });
};

const saveSong = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        artist: 'required|string',
        released: 'required|string',
        songwriters: 'required|string',
        producers: 'required|string',
        genre: 'required|string', 
        label: 'required|string',
        length: 'string',
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
            success: false,
            message: 'Validation failed',
            data: err
        });
        } else {
            next();
        }
    });
}


module.exports = {
    saveBook,
    saveSong
}