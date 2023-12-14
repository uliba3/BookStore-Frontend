import { addNewBook, deleteExistingBook } from '../reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { isBookIncluded } from '../services/book';
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import Button from 'react-bootstrap/Button';

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
        <Button variant="light" onClick={()=>dispatch(deleteExistingBook(book, "history"))}><FaBookmark /> history</Button> : 
        <Button variant="light" onClick={() => dispatch(addNewBook(book, "history"))}><FaRegBookmark /> history</Button>
      }
      {
        isBookInWishlist ? 
        <Button variant="light" onClick={()=>dispatch(deleteExistingBook(book, "wishlist"))}><FaBookmark /> WishList</Button> : 
        <Button variant="light" onClick={() => dispatch(addNewBook(book, "wishlist"))}><FaRegBookmark /> WishList</Button>
      }
    </>
  );
}

export default AddButton;