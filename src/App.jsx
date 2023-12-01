// src/App.jsx
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUser, logoutUser } from "./reducers/userReducer";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  useEffect(() => {
    dispatch(loadUser());
  },[]);

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
          <button onClick={() => dispatch(logoutUser())}>logOut</button>
          <Outlet />
        </>
      )}
    </>
  );
}

export default App
