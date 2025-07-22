const { response } = require('express');
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllBooks = async (req, res) => {
    // #swagger.tags=['Books']
    try {
        const result = await mongodb.getDatabase().db().collection('favebooks').find();
        const lists = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    }
    catch (error)
    {
        console.error('Error in getAllBooks:', error);
        res.status(500).json({ 
            message: 'Internal Server Error', 
            error: error.message || 'Uknown database error'
        });
    }
};

const getSingleBook = async (req, res) => {
    // #swagger.tags=['Books']
    try 
    {
        if (!ObjectId.isValid(req.params.id))
        {
            res.status(400).json('Must use a valid id to find a book');
            return;
        }

        const bookId = new ObjectId(req.params.id);
        const result = await mongodb
        .getDatabase()
        .db()
        .collection('favebooks')
        .find({_id: bookId});

        const lists = await result.toArray();
        if (lists.length === 0) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    }
    catch (error) {
      console.error('Error in getSingleBook: ', error);
      res.status(500).json({
          message: 'Internal Server Error',
          error: error.message || 'Unknown database error'
      });
    }
};

const createBook = async (req, res) => {
    // #swagger.tags=['Books']
    try{
        const book = {
            title: req.body.title,
            author: req.body.author,
            language: req.body.language,
            genre: req.body.genre,
            desc: req.body.desc,
            publisher: req.body.publisher,
            publicationDate: req.body.publicationDate,
            pages: req.body.pages
        };
        const response = await mongodb
        .getDatabase()
        .db()
        .collection('favebooks')
        .insertOne(book);

        if (response.acknowledged) {
        res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json(response.error || 'Some error occured while creating the book');
        }

    } catch (error) {
        console.error('Error in createBook:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message || 'Unknown database error'
        });
    }

};

const updateBook = async (req, res) => {
    // #swagger.tags=['Books']
    try {
        if (!ObjectId.isValid(req.params.id)){
            return res.status(400).json('Must use a valid book id to update a book.');
        }
        const bookId = new ObjectId(req.params.id);
        const book = {
            title: req.body.title,
            author: req.body.author,
            language: req.body.language,
            genre: req.body.genre,
            desc: req.body.desc,
            publisher: req.body.publisher,
            publicationDate: req.body.publicationDate,
            pages: req.body.pages
        };
        const response = await mongodb
        .getDatabase()
        .db()
        .collection('favebooks')
        .replaceOne({_id: bookId}, book);

        if (response.matchedCount === 0) {
            return res.status(404).json({ message: 'Book not found for update.' });
        }
        else if (response.modifiedCount > 0) {
            res.status(200).json({ message: 'Book updated successfully.' });
        } 
        else {
            res.status(200).json({ message: 'Book found, but no changes were applied.' });
        }

    } catch (error) {
        console.error('Error in updateBook:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message || 'Unknown database error'
        });
    }
};

const deleteBook = async (req, res) => {
    //#swagger.tags=['Books']
    try {
        if (!ObjectId.isValid(req.params.id)){
            return res.status(400).json('Must use a valid book id to delete a book.');
        }
        const bookId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection('favebooks').deleteOne({ _id: bookId});

        if (response.deletedCount > 0) {
            res.status(204).send();
        }
        else if (response.deletedCount === 0) {
            res.status(404).json({ message: 'Book not found for deletion.' }); 
        }
        else {
            res.status(500).json(response.error || 'Some error occured while deleting the book');
        }
    
    } catch (error) {
        console.error('Error in deleteBook:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message || 'Unknown database error'
        });
    }
};


module.exports = {
    getAllBooks,
    getSingleBook,
    createBook, 
    updateBook,
    deleteBook
}