import { useDispatch, useSelector } from "react-redux";

function HomePage() {
    const user = useSelector(state => state.user);
    const handleDelete = () => {
      dispatch(deleteExistingUser());
      navigate('/');
    }

  return (
    <>
      {user.token && 
        <>
          <p>Logged in as {user.username}</p>
          <button onClick={handleDelete}>deleteUser</button>
        </>
      }
      {!user.token && <p>Description of the service</p>}
    </>
  );
}

export default HomePage;