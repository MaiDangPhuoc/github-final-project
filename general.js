const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.get('/', async function (req, res) {
  try {
    const getBooks = new Promise((resolve) => {
      resolve(books);
    });

    const bookList = await getBooks;

    return res.status(200).json(bookList);
  } catch (error) {
    return res.status(500).json({message: "Error retrieving books"});
  }
});
// Register a new user
public_users.post("/register", (req,res) => {
  let username = req.body.username;
  let password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({message: "Username and password are required"});
  }

  if (isValid(username)) {
    return res.status(400).json({message: "User already exists"});
  }

  users.push({username: username, password: password});
  return res.status(200).json({message: "User successfully registered"});
});


// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json(books);
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;

    const getBook = new Promise((resolve, reject) => {
      if (books[isbn]) {
        resolve(books[isbn]);
      } else {
        reject("Book not found");
      }
    });

    const book = await getBook;

    return res.status(200).json(book);
  } catch (error) {
    return res.status(404).json({message: "Book not found"});
  }
});


// Get book details based on author
public_users.get('/author/:author', async function (req, res) {
  try {
    const author = req.params.author;

    const getBooksByAuthor = new Promise((resolve) => {
      const result = {};

      const keys = Object.keys(books);

      for (let i = 0; i < keys.length; i++) {
        const isbn = keys[i];

        if (books[isbn].author === author) {
          result[isbn] = books[isbn];
        }
      }

      resolve(result);
    });

    const result = await getBooksByAuthor;

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({message: "Error retrieving books"});
  }
});
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let title = req.params.title;
  let result = {};
  let keys = Object.keys(books);

  for (let i = 0; i < keys.length; i++) {
    let isbn = keys[i];

    if (books[isbn].title === title) {
      result[isbn] = books[isbn];
    }
  }

  return res.status(200).json(result);
});


// Get book review
public_users.get('/review/:isbn',function (req, res) {
  let isbn = req.params.isbn;

  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  }

  return res.status(404).json({message: "Book not found"});
});
module.exports.general = public_users;
