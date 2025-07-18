const express = require('express');
const router = express.Router();

const bookCont = require('../controllers/bookController');
const validation = require('../middleware/validate');

router.get('/', bookCont.getAllBooks);
router.get('/:id', bookCont.getSingleBook);

router.post('/', validation.saveBook, bookCont.createBook);
router.put('/:id', validation.saveBook, bookCont.updateBook);
router.delete('/:id', bookCont.deleteBook);



module.exports = router;