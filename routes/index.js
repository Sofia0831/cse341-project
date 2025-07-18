const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/songs', require('./songs'))
router.use('/books', require('./books'))

router.use('/', (req, res) => {
    // #swagger.tags=['Intro']
    res.send('Pantas CSE341 Project 2');
});


module.exports = router;