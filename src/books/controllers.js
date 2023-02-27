// ======================================

// link for docs queries

// https://sequelize.org/docs/v6/core-concepts/model-querying-basics/

// Must scroll down - no individual links to queries

const Book = require("./model");
const Author = require("../authors/model");

const addBook = async (req, res) => {
  try {
    const author = await Author.findOne({
      where: { authorName: req.body.author },
    });

    const newBook = await Book.create({
      title: req.body.title,
      author: author.authorName,
      genre: req.body.genre,
      AuthorId: author.id,
    });

    res.status(201).json({ message: "success", newBook: newBook });
  } catch (error) {
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();

    res.status(200).json({ message: "success", books: books });
  } catch (error) {
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

const getOneBook = async (req, res) => {
  try {
    const book = await Book.findOne({ where: { title: req.params.title } });

    res.status(200).json({ message: "success", book: book });
  } catch (error) {
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

const updateBook = async (req, res) => {
  try {
    const updateResult = await Book.update(
      { [req.body.updateKey]: req.body.updateValue },
      { where: { title: req.body.title } }
    );

    res.status(201).json({ message: "success", updateResult: updateResult });
    // res.send("hellooooooo");
  } catch (error) {
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

const deleteBook = async (req, res) => {
  try {
    const result = await Book.destroy({
      where: {
        title: req.body.title,
      },
    });

    console.log("result: ", result);

    res.status(202).json({ message: "success", result });
  } catch (error) {
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

const deleteAllBooks = async (req, res) => {
  try {
    const result = await Book.destroy({ truncate: true });
    res.status(202).json({ message: "success", result: result });
  } catch (error) {
    res.status(501).json({ errorMessage: error.message, error: error });
  }
};

module.exports = {
  addBook,
  getAllBooks,
  updateBook,
  deleteBook,
  getOneBook,
  deleteAllBooks,
};
