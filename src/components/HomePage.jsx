import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import { loadUser, deleteExistingUser } from "../reducers/userReducer";

function HomePage() {
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
          <div>Welcome {user.username}!!</div>
          <div>You have read <Link to={"/history"} className="text-decoration-none text-dark fs-1">{history.length}</Link> books</div>
          <div>You have <Link to={"/wishlist"} className="text-decoration-none text-dark fs-1">{wishlist.length}</Link> books to read</div>
          <Button variant="outline-danger" size="sm" onClick={handleDelete}>deleteUser</Button>
        </div>
      }
      {!user.token && <div>Description of the service</div>}
    </>
  );
}

export default HomePage;