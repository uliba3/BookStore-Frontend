import React from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import Book from "./Book";

function GoogleBook() {
  const { bookId } = useLoaderData();
  const googleBooks = useSelector((state) => state.googleBooks.books);
  const book = googleBooks.find((book) => book.bookId === bookId);

  return (
    <div>
      {book ? (
        <>
          <Book book={book}/>
        </>
      ) : (
        <p>Book not found</p>
      )}
    </div>
  );
}

export default GoogleBook;
