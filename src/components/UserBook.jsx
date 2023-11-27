import React from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import Book from "./Book";

function UserBook() {
  const { bookId } = useLoaderData();
  const userBooks = useSelector((state) => state.userBooks);
  const book = userBooks.find((book) => book.bookId === bookId);

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

export default UserBook;
