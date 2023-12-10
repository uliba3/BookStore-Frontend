import { addNewBook, deleteExistingBook } from '../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { isBookIncluded } from '../services/book';

function AddButton({ book }) {
  const dispatch = useDispatch();
  const history = useSelector(state => state.user.history);
  const wishlist = useSelector(state => state.user.wishlist);
  console.log("history", history, "wishlist", wishlist);
  const isBookInHistory = isBookIncluded(book, history);
  const isBookInWishlist = isBookIncluded(book, wishlist);

  return (
    <>
      {
        isBookInHistory ? 
        <button onClick={()=>dispatch(deleteExistingBook(book, "history"))}>Delete from Library</button> : 
        <button onClick={() => dispatch(addNewBook(book, "history"))}>Add to Library</button>
      }
      {
        isBookInWishlist ? 
        <button onClick={()=>dispatch(deleteExistingBook(book, "wishlist"))}>Delete from WishList</button> : 
        <button onClick={() => dispatch(addNewBook(book, "wishlist"))}>Add to WishList</button>
      }
    </>
  );
}

export default AddButton;