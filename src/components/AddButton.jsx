import { addNewBook, deleteExistingBook } from '../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { isBookIncluded } from '../services/book';
import { FaRegBookmark, FaBookmark } from "react-icons/fa";

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
        <button onClick={()=>dispatch(deleteExistingBook(book, "history"))}><FaBookmark /> history</button> : 
        <button onClick={() => dispatch(addNewBook(book, "history"))}><FaRegBookmark /> history</button>
      }
      {
        isBookInWishlist ? 
        <button onClick={()=>dispatch(deleteExistingBook(book, "wishlist"))}><FaBookmark /> WishList</button> : 
        <button onClick={() => dispatch(addNewBook(book, "wishlist"))}><FaRegBookmark /> WishList</button>
      }
    </>
  );
}

export default AddButton;