const Author = require("./model");
const Book = require("../books/model");

const addAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);

    res.status(201).json({ message: "success", author: author });
  } catch (error) {
    res.status(501).json({ errormessage: error.message, error: error });
  }
};

// gets and author by name and all books associated with said author

const getAuthorAndBooks = async (req, res) => {
  try {
    // this will get a given author AND bring back all books

    const author = await Author.findOne({
      where: { authorName: req.params.authorname },
      include: Book,
    });

    //the below will get the authors books ONLY if a condition is met - allows for flexibility

    // const author = await Author.findOne({
    //   where: { authorName: req.params.authorname },
    // });

    // if (ifSomeCondition) {
    //   const books = await author.getBooks({ where: { AuthorId: author.id } });
    //   author["books"] = books;
    // }

    res.status(200).json({ message: "success", author: author });
  } catch (error) {
    res.status(501).json({
      errormessage: error.message,
      error: error,
    });
  }
};

module.exports = {
  addAuthor,
  getAuthorAndBooks,
};
