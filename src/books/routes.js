const { Router } = require("express");

const router = Router();

const {
  addBook,
  getAllBooks,
  updateBook,
  deleteBook,
  getOneBook,
  deleteAllBooks,
} = require("./controllers");

router.post("/", addBook);

router.get("/:title", getOneBook);

router.get("/", getAllBooks);

router.put("/", updateBook);

router.delete("/", deleteBook);

router.delete("/all", deleteAllBooks);

module.exports = router;
