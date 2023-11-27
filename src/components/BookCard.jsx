import React from 'react';
import { Link } from 'react-router-dom';
import { addNewBook } from '../reducers/userBooksReducer';
import { useDispatch, useSelector } from 'react-redux';
import { isBookIncluded } from '../services/book';


function BookCard({ book }) {
  const dispatch = useDispatch();
  const userBooks = useSelector(state => state.userBooks);
  const isAdded = isBookIncluded(book, userBooks);

  return (
    <>
      <Link to={`${book.bookId}`}>
        <h1>{book.title}</h1>
        <p>{book.authors || ''}</p>
        {book.imageLinks && (
          <img src={book.imageLinks.thumbnail} alt={book.title} />
        )}
        {!book.imageLinks && (
          <img
            src={
              'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
            }
            alt={book.title}
          />
        )}
        {/* Use the result of isBookAdded for conditional rendering */}
      </Link>
      {isAdded ? <p>Book is added</p> : <button onClick={() => dispatch(addNewBook(book))}>Add to Library</button>}
    </>
  );
}

export default BookCard;
