const Book = require("./model");
const Author = require("../authors/model");
const Genre = require("../genre/model");

const addBook = async (req, res) => {
  try {
    const author = await Author.findOne({
      where: { authorName: req.body.author },
    });

    const genre = await Genre.findOne({ where: { genre: req.body.genre } });

    const newBook = await Book.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      AuthorId: author.id,
      GenreId: genre.id,
    });

    res.status(201).json({ message: "success", newBook: newBook });
  } catch (error) {
    res.status(501).json({ message: "failure", error });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    console.log(books);
    res.status(200).json({ message: "success", books });
  } catch (error) {
    res.status(501).json({ message: "failure", error });
  }
};

const getOneBook = async (req, res) => {
  try {
    const book = await Book.findOne({ where: { title: req.params.title } });
    // const book = await Book.find({ title: req.params.title });

    res.status(200).json({ message: "success", book: book });
  } catch (error) {
    res.status(501).json({ message: "failure", error });
  }
};

const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.update(
      { [req.body.updateKey]: req.body.updateValue },
      { where: { title: req.body.title } }
    );

    res.status(204).json({ message: "success", updatedBook });
  } catch (error) {
    res.status(501).json({ message: "failure", error });
  }
};

const deleteBook = async (req, res) => {
  try {
    const result = await Book.destroy({
      where: {
        title: req.body.title,
      },
    });

    res.status(202).json({ message: "success", result });
  } catch (error) {
    res.status(501).json({ message: "failure", error });
  }
};

const deleteAllBooks = async (req, res) => {
  try {
    const result = await Book.destroy({ truncate: true });
    res.send({ message: "success", result });
  } catch (error) {
    res.status(501).json({ message: "failure", error });
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
