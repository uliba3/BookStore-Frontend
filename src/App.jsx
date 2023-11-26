// src/App.jsx
import { Link, Outlet } from "react-router-dom"; 

function App() {
  return (
    <>
      <Link to={`googleBooks`}>bookSearch</Link>
      <Outlet />
    </>
  )
}

export default App
