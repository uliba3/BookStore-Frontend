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
          <div>Logged in as {user.username}</div>
          <button onClick={handleDelete}>deleteUser</button>
        </>
      }
      {!user.token && <div>Description of the service</div>}
    </>
  );
}

export default HomePage;