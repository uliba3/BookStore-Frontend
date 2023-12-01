// src/Books.jsx
import BookCard from './BookCard';

function Books({ books }) {
  return (
    <>
      {books &&
          books.map((book, i) => (
            <BookCard book={book} key={i} />
          ))}
    </>
  )
}

export default Books
