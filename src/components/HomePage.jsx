import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';

function HomePage() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const handleDelete = () => {
      dispatch(deleteExistingUser());
      navigate('/');
    }

  return (
    <>
      {user.token && 
        <>
          <div>Logged in as {user.username}</div>
          <Button variant="outline-danger" size="sm" onClick={handleDelete}>deleteUser</Button>
        </>
      }
      {!user.token && <div>Description of the service</div>}
    </>
  );
}

export default HomePage;