const { response } = require('express');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllSongs = async (req, res) => {
    // #swagger.tags=['Songs']
    try {
        const result = await mongodb.getDatabase().db().collection('favesongs').find();
        const lists = await result.toArray();
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (error) {
        console.error('Error in getAllSongs:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message || 'Unknown database error' });
    }
};

const getSingleSong = async (req, res) => {
    // #swagger.tags=['Songs']
    try 
    {
        if (!ObjectId.isValid(req.params.id))
        {
            return res.status(400).json('Must use a valid id to find a song');
        }

        const songId = new ObjectId(req.params.id);
        const result = await mongodb
        .getDatabase()
        .db()
        .collection('favesongs')
        .find({_id: songId});

        const lists = await result.toArray();
        if (lists.length === 0) {
            return res.status(404).json({
                message: 'Song not found'
            });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    }
    catch (error) {
      console.error('Error in getSingleSong: ', error);
      res.status(500).json({
          message: 'Internal Server Error',
          error: error.message || 'Unknown database error'
      });
    }
};

const createSong = async (req, res) => {
    // #swagger.tags=['Songs']
    try {
        const song = {
            title: req.body.title,
            artist: req.body.artist,
            released: req.body.released,
            songwriters: req.body.songwriters,
            producers: req.body.producers,
            genre: req.body.genre, 
            label: req.body.label,
            length: req.body.length,
        };
        const response = await mongodb
        .getDatabase()
        .db()
        .collection('favesongs')
        .insertOne(song);

        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json(response.error || 'Some error occured while creating the song');
        }
    
    } catch (error) {
        console.error('Error in createSong:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message || 'Unknown database error'
        });
    }
};

const updateSong = async (req, res) => {
    // #swagger.tags=['Songs']
    try {
        if (!ObjectId.isValid(req.params.id)){
            return res.status(400).json('Must use a valid song id to update a song.');
        }
        const songId = new ObjectId(req.params.id);
        const song = {
            title: req.body.title,
            artist: req.body.artist,
            released: req.body.released,
            songwriters: req.body.songwriters,
            producers: req.body.producers,
            genre: req.body.genre, 
            label: req.body.label,
            length: req.body.length,
        };
        const response = await mongodb
        .getDatabase()
        .db()
        .collection('favesongs')
        .replaceOne({_id: songId}, song);

        if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Song updated successfully.' });
        } 
        else if (response.matchedCount === 0) {
            return res.status(404).json({ message: 'Song not found for update.' });
        }
    
        else {
            res.status(200).json({ message: 'Song found, but no changes were applied.' });
        }
    } catch (error) {
        console.error('Error in updateSong:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message || 'Unknown database error'
        });
    }
};

const deleteSong = async (req, res) => {
    // #swagger.tags=['Songs']
    try {
        if (!ObjectId.isValid(req.params.id)){
            return res.status(400).json('Must use a valid song id to delete a song.');
        }
        const songId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('favesongs').deleteOne({ _id: songId});
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Song not found for deletion.' });
        }
    
    } catch (error) {
        console.error('Error in deleteSong:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message || 'Unknown database error'
        });
    }
};

module.exports = {
    getAllSongs,
    getSingleSong,
    createSong, 
    updateSong,
    deleteSong
}