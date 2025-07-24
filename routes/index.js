const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/songs', require('./songs'))
router.use('/books', require('./books'))

// router.use('/', (req, res) => {
//     // #swagger.tags=['Intro']
//     res.send('Pantas CSE341 Project 2');
// });

router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

module.exports = router;