import React from "react";
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

function Book({ book }) {

  return (
    <div>
      {book ? (
        <>
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
