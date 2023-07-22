import React from 'react'
import Logo from "./asserts/logo.png";
import { Icon } from "@iconify/react";
import {Link , Outlet , NavLink} from "react-router-dom";
import "./Main.css";
const Main = () => {

  return (
    <>
    <div id="topNav">
          <Link to="/main/home"><img src={Logo} alt="logo" id="logo"/></Link>
          {/* <Icon icon="ion:notifications-outline" height="25px" id="notification" /> */}
        </div>
        <div id="section">
          <Outlet/>
        </div>
        <div id="bottomNav">
          <NavLink to="/main/home" className="btn"><Icon icon="iconoir:home-simple-door" height="30px" id="button" /></NavLink>
          <NavLink to="/main/find" className="btn"><Icon icon="majesticons:search-line" height="30px" id="button" /></NavLink>
          <NavLink to="/main/profile" className="btn"><Icon icon="mingcute:user-2-line" height="28px" id="button" /></NavLink>
          <NavLink to="/main/settings" className="btn"><Icon icon="mingcute:settings-3-line" height="30px" id="button" /></NavLink>
        </div>
    </>
  )
}

export default Main