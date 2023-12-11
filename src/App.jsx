// src/App.jsx
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser, logoutUser, deleteExistingUser } from "./reducers/userReducer";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const message = useSelector(state => state.message);
  const user = useSelector(state => state.user);
  useEffect(() => {
    dispatch(loadUser());
  },[]);
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };
  const handleDelete = () => {
    dispatch(deleteExistingUser());
    navigate('/');
  }

  return (
    <>
      {!user && (
        <>
          <Link to={`login`}>login</Link>
          <Link to={`signup`}>signup</Link>
          {message && <p>{message}</p>}
          <Outlet />
        </>
      )}
      {user && (
        <>
          <Link to={``}>home</Link>
          <Link to={`googleBooks`}>bookSearch</Link>
          <Link to={`wishlist`}>wishlist</Link>
          <Link to={`history`}>history</Link>
          <button onClick={handleLogout}>logOut</button>
          <button onClick={handleDelete}>deleteUser</button>
          {message && <p>{message}</p>}
          <Outlet />
        </>
      )}
    </>
  );
}

export default App
