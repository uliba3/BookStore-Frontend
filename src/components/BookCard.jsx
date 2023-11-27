import { Link } from "react-router-dom";

function BookCard({ book }) {
    return (
        <Link to={`${book.bookId}`}>
          <h1>{book.title}</h1>
          <p>{book.authors || ""}</p>
          {/* Check if imageLinks is available before accessing its properties */}
          {book.imageLinks && (
            <img
              src={book.imageLinks.thumbnail}
              alt={book.title}
            />
          )}
          {!book.imageLinks && (
            <img
              src={"https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"}
              alt={book.title}
            />
          )}
        </Link>
      );
}

export default BookCard;