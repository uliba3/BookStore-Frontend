import { addNewBook, deleteExistingBook } from '../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { isBookIncluded } from '../services/book';

function AddButton({ book }) {
  const dispatch = useDispatch();
  const userBooks = useSelector(state => state.user.books);
  const isAdded = isBookIncluded(book, userBooks);

  return (
    <>
      {isAdded ? <button onClick={()=>dispatch(deleteExistingBook(book))}>Delete from Library</button> : <button onClick={() => dispatch(addNewBook(book))}>Add to Library</button>}
    </>
  );
}

export default AddButton;