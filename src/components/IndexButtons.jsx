import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeIndex } from '../reducers/googleBooksReducer';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Pagination from 'react-bootstrap/Pagination';

function IndexButtons() {
  const dispatch = useDispatch();
  const googleBooksIndex = useSelector((state) => state.googleBooks.index);

  const handleIndexChange = (index) => {
      dispatch(changeIndex(index));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'ArrowLeft' && googleBooksIndex !== 0) {
      handleIndexChange(googleBooksIndex - 1);
    } else if (event.key === 'ArrowRight') {
      handleIndexChange(googleBooksIndex + 1);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <Pagination className='justify-content-center'>
      <Pagination.Prev
        onClick={() => handleIndexChange(googleBooksIndex - 1)}
        className={googleBooksIndex !== 0 ? 'visible' : 'invisible'}
      />
      <Pagination.Next onClick={() => handleIndexChange(googleBooksIndex + 1)}/>
    </Pagination>
  );
}

export default IndexButtons;
