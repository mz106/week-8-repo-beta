const { Router } = require("express");

const router = Router();

const { addAuthor, getAuthorAndBooks } = require("./controllers");

router.post("/", addAuthor);
router.get("/:authorname", getAuthorAndBooks);

module.exports = router;
