const express = require('express');
const router = express.Router();

const songCont = require('../controllers/songController');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', songCont.getAllSongs);
router.get('/:id', songCont.getSingleSong);

router.post('/', isAuthenticated, validation.saveSong, songCont.createSong);
router.put('/:id', isAuthenticated, validation.saveSong, songCont.updateSong);
router.delete('/:id', isAuthenticated, songCont.deleteSong);


module.exports = router;