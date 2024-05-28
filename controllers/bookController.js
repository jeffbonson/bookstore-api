const bookModel = require('../models/bookModel');
const { Worker } = require('worker_threads');
const path = require('path');

const getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.getAllBooks();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, description } = req.body;
    // Check if required fields are provided
    if (!title || !author) {
      return res.status(400).json({ error: 'Title and Author are required' });
    }
    // Call the model function to create a new book
    const newBook = await bookModel.createBook({ title, author, description });
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, description } = req.body;
    // Check if required fields are provided
    if (!title || !author) {
      return res.status(400).json({ error: 'Title and Author are required' });
    }
    // Call the model function to update the book
    const updatedBook = await bookModel.updateBook(id, { title, author, description });
    // Check if book with given id exists
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    // Call the model function to delete the book
    const deleted = await bookModel.deleteBook(id);
    // Check if book with given id exists
    if (!deleted) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const blockingPage = (req, res) => {
  try {
      // Get the absolute path to the worker file
      const workerFilePath = path.resolve(__dirname, 'worker.js');

      // Create a new worker thread
      const worker = new Worker(workerFilePath);

      // Listen for messages from the worker thread
      worker.on('message', (result) => {
          res.status(200).send(`result is ${result}`);
      });

      // Listen for errors from the worker thread
      worker.on('error', (error) => {
          console.error('Worker thread error:', error);
          res.status(500).json({ error: 'Internal Server Error' });
      });
  } catch (error) {
      console.error('Error creating worker thread:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  blockingPage,
};
