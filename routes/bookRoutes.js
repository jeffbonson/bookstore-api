// routes/bookRoutes.js

const express = require('express');
const router = express.Router();
const { getAllBooks, createBook, updateBook, deleteBook } = require('../controllers/bookController');

// Get all books
router.get('/', getAllBooks);

// Create a new book
router.post('/', createBook);

// Update a book
router.put('/:id', updateBook);

// Delete a book
router.delete('/:id', deleteBook);

module.exports = router;
