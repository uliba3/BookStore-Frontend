import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import CloseButton from 'react-bootstrap/CloseButton';

import AddButton from "./AddButton";
import { getGoogleBook } from "../services/googleBooks";
import { loadUser } from "../reducers/userReducer";

function ImageDisplay({ book }) {
  console.log(book.imageLinks, Boolean(book.imageLinks));
  if (book.imageLinks&&(book.imageLinks.small||book.imageLinks.thumbnail)) {
    return <img src={book.imageLinks.small||book.imageLinks.thumbnail} alt={book.title} />;
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookId } = useLoaderData();
  const [book, setBook] = useState(null);
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

  useEffect(() => {
    dispatch(loadUser());
    console.log("bookDestination", bookDestination);
    async function getBook(bookDestination){
      switch (bookDestination) {
        case "history":
        case "wishlist":
          let userBook = await books.find((book) => book.bookId === bookId);
          setBook(userBook);
          console.log("userBook", book);
          break;
        case "googleBooks":
          let googleBook = await getGoogleBook(bookId);
          setBook(googleBook);
          break;
      }
    }
    getBook(bookDestination);
  },[]);
  console.log(books, bookId, bookDestination);

  return (
    <div>
      {book ? (
        <>
          <CloseButton onClick={() => navigate(-1)}/>
          <div>{book.title}</div>
          <div>{book.authors || ""}</div>
          <div>{book.publisher || ""}</div>
          <div>{book.publishedDate || ""}</div>
          {book.pagecount && <div>{book.pagecount}pages</div>}
          <div>{book.categories || ""}</div>
          <ImageDisplay book={book} />
          <div>{book.description}</div>
          <AddButton book={book} />
        </>
      ) : (
        <div>Book not found</div> && console.log(book, books)
      )}
    </div>
  );
}

export default Book;
