import React from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import Book from "./Book";

function UserBook({ bookDestination}) {
  const { bookId } = useLoaderData();
  const userBooks = bookDestination=="history"?useSelector((state) => state.user.books):useSelector((state) => state.user.wishlist);
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
