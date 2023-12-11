// src/Books.jsx
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { initializeUserBooks } from '../reducers/userReducer';

import { useDispatch } from 'react-redux';
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
            <h1>{bookDestination}</h1>
            {bookDestination=="googleBooks" && 
            <>
                <SearchBox />
                <IndexButtons />
            </>
            }
            {books &&
                books.map((book, i) => (
                    <BookCard book={book} key={i} />
                ))
            }
        </>
    )
}

export default Books;