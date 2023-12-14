// src/Books.jsx
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { initializeUserBooks } from '../reducers/userReducer';
import SearchBox from './SearchBox';
import IndexButtons from './IndexButtons';
import BookCard from './BookCard';

function Books({bookDestination}) {
    const dispatch = useDispatch();
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
    useEffect (() => {
        dispatch(initializeUserBooks());
        console.log('userBooks useEffect end', books);
    }, []);

    return (
        <>
            {bookDestination=="googleBooks" && 
            <>
                <div className='text-center'>
                    <SearchBox/>
                    <IndexButtons />
                </div>
            </>
            }
            <Container>
                <Row>
                    {books &&
                        books.map((book, i) => (
                            <Col key={i} md={2}>
                                <BookCard book={book} bookDestination={bookDestination} />
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </>
    )
}

export default Books;