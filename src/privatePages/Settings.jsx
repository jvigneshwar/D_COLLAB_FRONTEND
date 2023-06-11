import React from 'react'
import "../styles/Settings.css";

const Settings = () => {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href ="/";
  }
  return (
    <div id="logoutsection">
      <div id="logoutText">Logout</div>
      <button id="logout" onClick={logout}>Logout</button>
    </div>
  )
}

export default Settings;