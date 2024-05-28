const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost', // for working in local db
  // host: 'bookstore-api-db', // for working with docker db
  database: 'bookstore',
  password: '123456',
  port: 5432,
});

const getAllBooks = async () => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM books');
    console.log(result)
    return result.rows;
  } finally {
    client.release();
  }
};

const createBook = async (book) => {
  const client = await pool.connect();
  try {
    const { title, author } = book;
    const result = await client.query('INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *', [title, author]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const updateBook = async (id, book) => {
  const client = await pool.connect();
  try {
    const { title, author } = book;
    const result = await client.query('UPDATE books SET title = $1, author = $2 WHERE id = $3 RETURNING *', [title, author, id]);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const deleteBook = async (id) => {
  const client = await pool.connect();
  try {
    const result = await client.query('DELETE FROM books WHERE id = $1', [id]);
    return result.rowCount > 0;
  } finally {
    client.release();
  }
};

module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
};
