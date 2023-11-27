// src/App.jsx
import { Link, Outlet } from "react-router-dom"; 

function App() {
  return (
    <>
      <Link to={`googleBooks`}>bookSearch</Link>
      <Link to={`userBooks`}>user books</Link>
      <Outlet />
    </>
  )
}

export default App
