import { useDispatch } from 'react-redux';
import { useState } from 'react'
import { searchGoogleBooks } from '../reducers/googleBooksReducer';

function SearchBox () {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState(''); // state for search term
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(searchGoogleBooks(searchTerm));
      }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
            <button type="submit">Search</button>
      </form>
    )
}

export default SearchBox;