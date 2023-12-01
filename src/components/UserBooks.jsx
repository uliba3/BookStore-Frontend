// src/UserBooks.jsx
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { initializeUserBooks } from '../reducers/userReducer';

import { useDispatch } from 'react-redux';
import Books from './Books';

function UserBooks() {
    const dispatch = useDispatch();
    const userBooks = useSelector(state => state.user.books);
    useEffect (() => {
        console.log('userBooks useEffect');
        dispatch(initializeUserBooks());
        console.log('userBooks useEffect end', userBooks);
    }, []);

    return (
        <>
        <h1>userBooks</h1>
        {userBooks &&
        <>
            <Books books={userBooks}/>
        </>}
        </>
    )
}

export default UserBooks;