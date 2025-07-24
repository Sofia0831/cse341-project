const express = require('express');
const router = express.Router();

const bookCont = require('../controllers/bookController');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', bookCont.getAllBooks);
router.get('/:id', bookCont.getSingleBook);

router.post('/', isAuthenticated, validation.saveBook, bookCont.createBook);
router.put('/:id', isAuthenticated, validation.saveBook, bookCont.updateBook);
router.delete('/:id', isAuthenticated, bookCont.deleteBook);



module.exports = router;