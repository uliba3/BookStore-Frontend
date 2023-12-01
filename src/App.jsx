// src/App.jsx
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser, logoutUser } from "./reducers/userReducer";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);
  useEffect(() => {
    dispatch(loadUser());
  },[]);
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <>
      {!user.token && (
        <>
          <Link to={`login`}>login</Link>
          <Link to={`signup`}>signup</Link>
          <Outlet />
        </>
      )}
      {user.token && (
        <>
          <Link to={`googleBooks`}>bookSearch</Link>
          <Link to={`userBooks`}>user books</Link>
          <button onClick={handleLogout}>logOut</button>
          <Outlet />
        </>
      )}
    </>
  );
}

export default App
