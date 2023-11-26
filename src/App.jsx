import { useState } from 'react'
import { search } from './services/googleBooks'

import GoogleBookCard from './components/googleBookCard';

function App() {
  const [googleBooks, setGoogleBooks] = useState([]); // state for google books
  const [searchTerm, setSearchTerm] = useState(''); // state for search term
  const [startIndex, setStartIndex] = useState(0); // state for start index

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responseData = await search(searchTerm, 0);
    setStartIndex(0);
    setGoogleBooks(responseData);
    console.log(responseData);
  }

  const handleClick = async (index) => {
    const responseData = await search(searchTerm, index);
    setStartIndex(index);
    setGoogleBooks(responseData);
    console.log(responseData);
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
