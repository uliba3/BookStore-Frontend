import React from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import AddButton from "./AddButton";

function ImageDisplay({ book }) {
  if (book.imageLinks) {
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
  const book = books.find((book) => book.bookId === bookId);

  return (
    <div>
      {book ? (
        <>
          <button onClick={() => navigate(-1)}>Back</button>
          <h1>{book.title}</h1>
          <p>{book.authors || ""}</p>
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
