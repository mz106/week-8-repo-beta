const Genre = require("./model");
const Book = require("../books/model");

const addGenre = async (req, res) => {
  try {
    const genre = await Genre.create(req.body);
    res.status(201).json({ message: "success", genre: genre });
  } catch (error) {
    res.status(501).json({ message: "failure", error });
  }
};

const getAllBooksByGenre = async (req, res) => {
  try {
    const genre = await Genre.findOne({ where: { genre: req.params.genre } });

    const booksByGenre = await Book.findAll({ where: { GenreId: genre.id } });

    res.status(200).json({ message: "success", booksByGenre: booksByGenre });
  } catch (error) {
    res.status(501).json({ message: "failure", error });
  }
};

module.exports = {
  addGenre,
  getAllBooksByGenre,
};
