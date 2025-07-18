const express = require('express');
const router = express.Router();

const songCont = require('../controllers/songController');

router.get('/', songCont.getAllSongs);
router.get('/:id', songCont.getSingleSong);

router.post('/', songCont.createSong);
router.put('/:id', songCont.updateSong);
router.delete('/:id', songCont.deleteSong);


module.exports = router;