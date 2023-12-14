import { useDispatch } from 'react-redux';
import { useState } from 'react'
import { searchGoogleBooks } from '../reducers/googleBooksReducer';

function SearchBox () {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState(''); // state for search term
    const keyPress = (e) => {
      if (e.key === 'Enter') handleSubmit(e);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(searchGoogleBooks(searchTerm));
      }
    return (
            <>
              <input type="text" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={(e) => keyPress(e)}/>
              <button onClick={handleSubmit}>Search</button>
            </>
    )
}

export default SearchBox;