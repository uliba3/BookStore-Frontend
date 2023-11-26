// src/GGoogleBooks.jsx
import { useSelector } from 'react-redux';

import GoogleBookCard from './googleBookCard';
import IndexButtons from './IndexButtons';
import SearchBox from './SearchBox';

function GoogleBooks() {
  const googleBooks = useSelector(state => state.googleBooks);
  return (
    <>
      <SearchBox />
      {googleBooks &&
      <>
        <div>
          {googleBooks.map((book, i) => {
            return (
              <GoogleBookCard book={book} key={i} />
            )
          })}
        </div>
        <IndexButtons />
      </>}
    </>
  )
}

export default GoogleBooks
