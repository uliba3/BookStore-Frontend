import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import CloseButton from 'react-bootstrap/CloseButton';

import AddButton from "./AddButton";
import { getGoogleBook } from "../services/googleBooks";
import { loadUser } from "../reducers/userReducer";

function ImageDisplay({ book }) {
  console.log(book.imageLinks, Boolean(book.imageLinks));
  if (book.imageLinks&&(book.imageLinks.thumbnail)) {
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookId } = useLoaderData();
  const [book, setBook] = useState(null);
  const user = useSelector(state => state.user);
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
    if(!user.token) navigate("/");
  },[]);
  console.log(books, bookId, bookDestination);

  return (
    <>
      <div className="p-3">
        <CloseButton onClick={() => navigate(-1)}/>
      </div>
      {book ? (
        <div className="d-flex flex-row">
          <div className="p-5 m-5">
            <ImageDisplay book={book} />
            <div className="d-flex">
              <AddButton book={book} />
            </div>
          </div>
          <div className="p-5 m-5">
            <div className="h1">{book.title}</div>
            <div>{book.authors || ""}</div>
            <div>{book.publisher || ""}</div>
            <div>{book.publishedDate || ""}</div>
            {book.pagecount && <div>{book.pagecount}pages</div>}
            <div>{book.categories || ""}</div>
            <div>{book.description}</div>
          </div>
          
        </div>
      ) : (
        <div>Book not found</div> && console.log(book, books)
      )}
      {console.log("book.imageLinks.thumbnail",book)}
    </>
  );
}

export default Book;
