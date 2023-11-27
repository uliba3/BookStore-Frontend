// src/GoogleBooks.jsx
import BookCard from './BookCard';

function Books({ books }) {
  return (
    <>
      {books &&
      <>
        <div>
          {books.map((book, i) => {
            return (
              <BookCard book={book} key={i} />
            )
          })}
        </div>
      </>}
    </>
  )
}

export default Books
