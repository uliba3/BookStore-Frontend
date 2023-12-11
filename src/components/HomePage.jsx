import { useDispatch, useSelector } from "react-redux";

function HomePage() {
    const user = useSelector(state => state.user);
  return (
    <>
      {user && <p>Logged in as {user.username}</p>}
      {!user && <p>Description of the service</p>}
    </>
  );
}

export default HomePage;