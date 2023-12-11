import React from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import AddButton from "./AddButton";
import { getGoogleBook } from "../services/googleBooks";

function ImageDisplay({ book }) {
  if (book.imageLinks.thumbnail) {
    return <img src={book.imageLinks.thumbnail} alt={book.title} />;
  } else {
    return (
      <img
        src={"https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"}
        alt={book.title}
      />
    );
  }
}

function Book({ bookDestination }) {
  const navigate = useNavigate();
  const { bookId } = useLoaderData();
  let books;
  switch (bookDestination) {
      case "history":
          books = useSelector(state => state.user.history);
          break;
      case "wishlist":
          books = useSelector(state => state.user.wishlist);
          break;
      case "googleBooks":
          books = useSelector(state => state.googleBooks.books);
          break;
  }
  console.log(books, bookId, bookDestination);
  let book;
  switch(bookDestination) {
      case "history":
      case "wishlist":
          book = books.find((book) => book.id === bookId);
          break;
      case "googleBooks":
          book = getGoogleBook(bookId);
          break;
  }

  return (
    <div>
      {book ? (
        <>
          <button onClick={() => navigate(-1)}>Back</button>
          <h1>{book.title}</h1>
          <p>authors:{book.authors || ""}</p>
          <p>publisher:{book.publisher || ""}</p>
          <ImageDisplay book={book} />
          <div>{book.description}</div>
          <AddButton book={book} />
        </>
      ) : (
        <p>Book not found</p>
      )}
    </div>
  );
}

export default Book;
