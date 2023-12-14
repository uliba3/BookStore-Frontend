import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import AddButton from './AddButton';


function BookCard({ book, bookDestination }) {

  return (
    <>
      <Link to={`${book.bookId}`} className="text-decoration-none">
        <Card>
          <Card.Img variant="top" src={(book.imageLinks&&book.imageLinks.thumbnail)||'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'} />
          <Card.Body>
            <Card.Text>{book.title}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
      {bookDestination!="googleBooks"&&<AddButton book={book} />}
    </>
  );
}

export default BookCard;
