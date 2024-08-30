import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import DataContext from '../DataContext';
import "./Navbar.css";

const Navbar = () => {
  const [clicked ] = useState(false);
  const { activeItem, setActiveItem } = useContext(DataContext);
  const { pathname } = window.location;

  const setActive = (index) => {
    setActiveItem(index);
  };

  return (
    <div className="navbar" 
      style={{ display: "flex", alignItems: "center",justifyContent: "space-between", background: "#1116", padding: "5px 25px", boxShadow: "0 3px 9px rgba(0,0,0,0.6)" }}>

      <Link to={"/"}>  
        <img
          className="imglogo"
          src={require("../Photos/logo.png")}
          onClick={() => setActiveItem(1)}
          alt="Logo"
          fill="none"
        />
      </Link>  

      <div className="container">
        <ul className={clicked ? "nav-menu active" : "nav-menu"}>
          <li>
            <Link 
              className={activeItem === 1 || pathname === "/" ? 'active' : ''} 
              onClick={() => setActive(1)} 
              to={"/"}>
              Home
            </Link>  
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;