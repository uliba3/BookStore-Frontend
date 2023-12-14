import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeIndex } from '../reducers/googleBooksReducer';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

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
    <div>
      <button
        onClick={() => handleIndexChange(googleBooksIndex - 1)}
        className={googleBooksIndex !== 0 ? 'visible' : 'invisible'}
      >
        <IoIosArrowBack />
      </button>
      <button onClick={() => handleIndexChange(googleBooksIndex + 1)}>
        <IoIosArrowForward />
      </button>
    </div>
  );
}

export default IndexButtons;
