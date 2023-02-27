const Author = require("./model");

const addAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);
    console.log("author: ", author);

    res.status(201).json({ message: "success", author: author });
  } catch (error) {
    res
      .status(501)
      .json({ message: "failure", errormessage: error.message, error: error });
  }
};

const getAuthorAndBooks = async (req, res) => {
  try {
    const author = await Author.findOne({
      where: { authorName: req.params.authorname },
    });

    const books = await author.getBooks({ where: { authorId: author.id } });
    res.status(200).json({ message: "success", author: author, books: books });
  } catch (error) {
    res.status(501).json({
      message: "failure",
      errormessage: error.message,
      error: error,
    });
  }
};

module.exports = {
  addAuthor,
  getAuthorAndBooks,
};
