const express = require('express');
const router = express.Router();

const songCont = require('../controllers/songController');
const validation = require('../middleware/validate');

router.get('/', songCont.getAllSongs);
router.get('/:id', songCont.getSingleSong);

router.post('/', validation.saveSong, songCont.createSong);
router.put('/:id', validation.saveSong, songCont.updateSong);
router.delete('/:id', songCont.deleteSong);


module.exports = router;