import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import AddButton from './AddButton';


function BookCard({ book, bookDestination }) {

  return (
    <>
      
        <Card>
          <Link to={`${book.bookId}`} className="text-decoration-none">
            <Card.Img variant="top" src={(book.imageLinks&&book.imageLinks.thumbnail)||'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'} />
            <Card.Body className='p-2 text-dark'>
              <Card.Text>{book.title}</Card.Text> 
            </Card.Body>
          </Link>
          <Card.Body className='d-flex justify-content-around p-0'>{bookDestination!="googleBooks"&&<AddButton book={book} />}</Card.Body>
        </Card>
    </>
  );
}

export default BookCard;
