import { React, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import CloseButton from 'react-bootstrap/CloseButton';
import Badge from 'react-bootstrap/Badge';

import AddButton from "./AddButton";
import { getGoogleBook } from "../services/googleBooks";
import { loadUser } from "../reducers/userReducer";

function ImageDisplay({ book }) {
  //console.log(book.imageLinks, Boolean(book.imageLinks));
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
    //console.log("bookDestination", bookDestination);
    async function getBook(bookDestination){
      switch (bookDestination) {
        case "history":
        case "wishlist":
          let userBook = await books.find((book) => book.bookId === bookId);
          setBook(userBook);
          //console.log("userBook", book);
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
  //console.log(books, bookId, bookDestination);

  return (
    <>
      {book&&
            <div>
              <div className="p-3">
                <CloseButton onClick={() => navigate(-1)}/>
              </div>
              <div className="d-flex flex-row">
                <div className="p-5 m-5">
                  <ImageDisplay book={book} />
                  <div className="d-flex">
                    <AddButton book={book} />
                  </div>
                </div>
                <div className="p-5 m-5">
                  <div className="h1">{book.title}</div>
                  {book.authors&&<Badge bg="secondary" className="m-1">{book.authors}</Badge>}
                  {book.publisher&&<Badge bg="secondary" className="m-1">{book.publisher}</Badge>}
                  {book.publishedDate&&<Badge bg="secondary" className="m-1">{book.publishedDate}</Badge>}
                  {book.pagecount && <Badge bg="secondary" className="m-1">{book.pagecount}pages</Badge>}
                  {book.categories && <Badge bg="secondary" className="m-1">{book.categories}</Badge>}
                  <div>{book.description}</div>
                </div>
              </div>
            </div>}
    </>
  );
}

export default Book;
