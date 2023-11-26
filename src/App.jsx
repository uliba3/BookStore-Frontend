// src/App.jsx
import { useSelector } from 'react-redux';

import GoogleBookCard from './components/googleBookCard';
import IndexButtons from './components/IndexButtons';
import SearchBox from './components/SearchBox';

function App() {
  const googleBooks = useSelector(state => state.googleBooks);
  return (
    <>
      <SearchBox />
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
