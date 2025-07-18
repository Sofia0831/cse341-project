const express = require('express');
const router = express.Router();

const bookCont = require('../controllers/bookController');

router.get('/', bookCont.getAllBooks);
router.get('/:id', bookCont.getSingleBook);

router.post('/', bookCont.createBook);
router.put('/:id', bookCont.updateBook);
router.delete('/:id', bookCont.deleteBook);



module.exports = router;