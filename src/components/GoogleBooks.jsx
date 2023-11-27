// src/GoogleBooks.jsx
import { useSelector } from 'react-redux';
import IndexButtons from './IndexButtons';
import SearchBox from './SearchBox';
import Books from './Books';

function GoogleBooks() {
  const googleBooks = useSelector(state => state.googleBooks);
  return (
    <>
      <SearchBox />
      {googleBooks &&
      <>
        <Books books={googleBooks} />
        <IndexButtons />
      </>}
    </>
  )
}

export default GoogleBooks
