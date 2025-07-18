const { validator } = require('../helpers/validate');

const saveBook = (req, res, next) => {
    const validationRule = {
        title: 'required|string',
        author: 'required|string_or_array',
        language: 'required|string',
        genre: 'required|string_or_array',
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
        artist: 'required|string_or_array',
        released: 'required|string',
        songwriters: 'required|string_or_array',
        producers: 'required|string_or_array',
        genre: 'required|string_or_array', 
        label: 'required|string_or_array',
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