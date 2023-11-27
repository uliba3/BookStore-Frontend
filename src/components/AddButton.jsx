import { addNewBook, deleteExistingBook } from '../reducers/userBooksReducer';
import { useDispatch, useSelector } from 'react-redux';
import { isBookIncluded } from '../services/book';

function AddButton({ book }) {
  const dispatch = useDispatch();
  const userBooks = useSelector(state => state.userBooks);
  const isAdded = isBookIncluded(book, userBooks);

  return (
    <>
      {isAdded ? <button onClick={()=>dispatch(deleteExistingBook(book))}>Delete from Library</button> : <button onClick={() => dispatch(addNewBook(book))}>Add to Library</button>}
    </>
  );
}

export default AddButton;