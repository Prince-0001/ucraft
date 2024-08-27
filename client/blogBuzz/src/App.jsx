import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
// import { AuthContextProvider } from "./context/authContext.jsx";
import './style.scss';
function App() {

  return (
      <div className="app">
        <div className="container">
          <Navbar></Navbar>
          <Outlet></Outlet>
          <Footer></Footer>
        </div>
      </div>
    
  )
}


export default App
