import React from "react";
import BooksSearch from "../books-search/books-search";
import BooksFound from "../books-found/books-found";
import BookInfo from "../book-info/book-info";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="wrapper">
      <BooksSearch></BooksSearch>
      <Routes>
        <Route path="/" element={<BooksFound />}></Route>
        <Route path="/:bookId" element={<BookInfo />}></Route>
      </Routes>
    </div>
  );
};

export default App;
