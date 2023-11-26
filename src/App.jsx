import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import GoogleBookCard from './components/googleBookCard';
import { changeIndex, searchGoogleBooks } from './reducers/googleBooksReducer';
import IndexButtons from './components/IndexButtons';

function App() {
  const dispatch = useDispatch();
  const googleBooks = useSelector(state => state.googleBooks);
  const [searchTerm, setSearchTerm] = useState(''); // state for search term

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(searchGoogleBooks(searchTerm));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
        <button type="submit">Search</button>
      </form>
      {googleBooks &&
      <div>
        {googleBooks.map((book, i) => {
          return (
            <GoogleBookCard book={book} key={i} />
          )
        })}
        <IndexButtons />
      </div>}
    </>
  )
}

export default App
