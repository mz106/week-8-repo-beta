require("dotenv").config();
const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 5001;

const Book = require("./books/model");
const Author = require("./authors/model");

const bookRouter = require("./books/routes");
const authorRouter = require("./authors/routes");

const app = express();

app.use(cors());
app.use(express.json());

const syncTables = () => {
  Author.hasMany(Book);
  Book.belongsTo(Author);

  Book.sync({ alter: true });
  Author.sync({ alter: true });
};

// Use mounted routes

app.use("/books", bookRouter);
app.use("/authors", authorRouter);

// explain utility of health route

app.get("/health", (req, res) =>
  res.status(200).json({ message: "API is working" })
);

app.listen(port, () => {
  syncTables();
  console.log(`Server is listening on port ${port}`);
});
