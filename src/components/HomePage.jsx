import { useDispatch, useSelector } from "react-redux";

function HomePage() {
    const user = useSelector(state => state.user);
  return (
    <>
      {user.token && <p>Logged in as {user.username}</p>}
      {!user.token && <p>Description of the service</p>}
    </>
  );
}

export default HomePage;