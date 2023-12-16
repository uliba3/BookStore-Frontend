import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import { loadUser, deleteExistingUser } from "../reducers/userReducer";
import fewBooksRightTransparent from '../assets/fewBooksRightTransparent.png';
import fewBooksLeftTransparent from '../assets/fewBooksLeftTransparent.png';
import bookStoreSearchTransparent from '../assets/bookStoreSearchTransparent.gif';
import bookStoreSearchResultTransparent from '../assets/bookStoreSearchResultTransparent.gif';
import bookStoreListTransparent from '../assets/bookStoreListTransparent.gif';

function HomePage() {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const history = useSelector(state => state.user.history);
    const wishlist = useSelector(state => state.user.wishlist);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(loadUser());
    },[]);
    const handleDelete = () => {
      dispatch(deleteExistingUser());
      navigate('/');
    }

  return (
    <>
      {user.token &&
        <div className="text-center">
          <div className="h1 p-5 m-5" >Welcome {user.username}!!</div>
          <div className='d-flex justify-content-around align-items-center'>
            <div>You have read <Link to={"/history"} className="text-decoration-none text-dark fs-1">{history.length}</Link> books</div>
            <img src={fewBooksRightTransparent} className="w-25 h-25"/>
          </div>
          <div className='d-flex justify-content-around align-items-center'>
            <img src={fewBooksLeftTransparent} className="w-25 h-25"/>
            <div>You have <Link to={"/wishlist"} className="text-decoration-none text-dark fs-1">{wishlist.length}</Link> books to read</div>
          </div>
          <Button variant="outline-danger" size="sm" onClick={handleDelete}>deleteUser</Button>
        </div>
      }
      {!user.token && 
        <div>
          <div className='d-flex justify-content-around align-items-center p-5 m-5'>
            <div className="h1">Easily search for books</div>
            <img src={bookStoreSearchTransparent} className="w-50 h-50"/>
          </div>
          <div className='d-flex justify-content-around align-items-center p-5 m-5'>
            <img src={bookStoreSearchResultTransparent} className="w-50 h-50"/>
            <div className="h1">Look at the information of each book</div>
          </div>
          <div className='d-flex justify-content-around align-items-center p-5 m-5'>
            <div className="h1">Add or remove the book from you wishlist or history</div>
            <img src={bookStoreListTransparent} className="w-50 h-50"/>
          </div>
        </div>}
    </>
  );
}

export default HomePage;