import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import GoogleBookCard from './components/googleBookCard';
import { changeIndex, searchGoogleBooks } from './reducers/googleBooksReducer';

function App() {
  const dispatch = useDispatch();
  const googleBooks = useSelector(state => state.googleBooks);
  const [searchTerm, setSearchTerm] = useState(''); // state for search term
  const [startIndex, setStartIndex] = useState(0); // state for start index

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(searchGoogleBooks(searchTerm));
    setStartIndex(0);
  }

  const handleClick = async (index) => {
    setStartIndex(index);
    dispatch(changeIndex(searchTerm, index));
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
        {startIndex-1!=-1&&<button onClick={() => handleClick(startIndex-1)}>{startIndex-1}</button>}
        <button onClick={() => handleClick(startIndex)}>{startIndex}</button>
        <button onClick={() => handleClick(startIndex+1)}>{startIndex+1}</button>
      </div>}
    </>
  )
}

export default App
