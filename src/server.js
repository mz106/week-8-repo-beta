require("dotenv").config();
const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 5001;

const Book = require("./books/model");

const bookRouter = require("./books/routes");

const app = express();

app.use(cors());
app.use(express.json());

const syncTables = () => {
  Book.sync({ alter: true });
};

// Use mounted routes

app.use("/books", bookRouter);

app.get("/health", (req, res) =>
  res.status(200).json({ message: "API is working" })
);

app.listen(port, () => {
  syncTables();
  console.log(`Server is listening on port ${port}`);
});
