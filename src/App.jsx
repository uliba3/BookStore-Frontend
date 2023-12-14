// src/App.jsx
import { Link, Outlet, useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { loadUser, logoutUser } from "./reducers/userReducer";
import { FaHome, FaSearch, FaStar, FaHistory } from "react-icons/fa";

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

  return (
    <>
        <Navbar>
          <Container className="justify-content-center">
            <Nav>
              <Nav.Item className="px-3">
                <NavLink to={``} className={state => "text-decoration-none text-dark" + (state.isActive ? ""  : " opacity-50")}><FaHome /></NavLink>
              </Nav.Item>
              {!user.token && (
                <>
                  <Nav.Item className="px-3">
                    <NavLink to={`login`} className={state => "text-decoration-none text-dark" + (state.isActive ? ""  : " opacity-50")}>login</NavLink>
                  </Nav.Item>
                  <Nav.Item className="px-3">
                    <NavLink to={`signup`} className={state => "text-decoration-none text-dark" + (state.isActive ? ""  : " opacity-50")}>signup</NavLink>
                  </Nav.Item>
                </>
              )}
              {user.token && (
                <>
                  <Nav.Item className="px-3">
                    <NavLink to={`googleBooks`} className={state => "text-decoration-none text-dark" + (state.isActive ? ""  : " opacity-50")}><FaSearch/>Search</NavLink>
                  </Nav.Item>
                  <Nav.Item className="px-3">
                    <NavLink to={`wishlist`} className={state => "text-decoration-none text-dark" + (state.isActive ? ""  : " opacity-50")}><FaStar/>Wishlist</NavLink>
                  </Nav.Item>
                  <Nav.Item className="px-3">
                    <NavLink to={`history`} className={state => "text-decoration-none text-dark" + (state.isActive ? ""  : " opacity-50")}><FaHistory />History</NavLink>
                  </Nav.Item>
                  <Nav.Item className="px-3">
                    <button onClick={handleLogout}>logOut</button>
                  </Nav.Item>
                </>
              )}
            </Nav>
          </Container>
        </Navbar>
      {message && <div>{message}</div>}
      <Outlet />
    </>
  );
}

export default App
