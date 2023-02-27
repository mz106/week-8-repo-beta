const { Router } = require("express");

const { addGenre, getAllBooksByGenre } = require("./controllers");

const router = Router();

router.post("/", addGenre);
router.get("/:genre", getAllBooksByGenre);

module.exports = router;
