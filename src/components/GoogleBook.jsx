import React from "react";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";

export function getBookById({ params }) {
  return { id: params.id };
}

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

function GoogleBook() {
  const { id } = useLoaderData();
  const googleBooks = useSelector((state) => state.googleBooks);
  const book = googleBooks.find((book) => book.id === id);

  return (
    <div>
      {book ? (
        <>
          <h1>{book.title}</h1>
          <p>{book.authors || ""}</p>
          <ImageDisplay book={book} />
          <div>{book.description}</div>
        </>
      ) : (
        <p>Book not found</p>
      )}
    </div>
  );
}

export default GoogleBook;
