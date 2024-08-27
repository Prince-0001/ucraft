import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'

const Navbar = () => {

    const{currentUser,logout}=useContext(AuthContext)
  return (
    <div className='navbar'>
        <div className="container">
            <div className="logo">
                <div className='img-before'></div>
                <Link to='/' >
                <img src="https://static.ucraft.ai/fs/user_files/15696/media/images/ucraft-logo.webp"
                alt='logo' 
                ></img>
                </Link>
                
            </div>
            <div className="links">
                <Link className='link' to="/?cat=ART">
                    <h6>ART</h6>
                </Link>
                <Link className='link' to="/?cat=SCIENCE">
                    <h6>SCIENCE</h6>
                </Link>
                <Link className='link' to="/?cat=TECHNOLOGY">
                    <h6>TECHNOLOGY</h6>
                </Link>
                <Link className='link' to="/?cat=CINEMA">
                    <h6>CINEMA</h6>
                </Link>
                <Link className='link' to="/?cat=DESIGN">
                    <h6>DESIGN</h6>
                </Link>
                <span>{currentUser?.username}</span>
                
                {currentUser ? <span onClick={logout}>Logout</span>:<Link className='link' to='/login'>Login</Link>}
                <span className='write'>
                    <Link  className='link' to='/write'>Write</Link>
                </span>
                
            </div>
        </div>
    </div>
  )
}

export default Navbar
