import React, { useEffect } from "react";
import Home from "./privatePages/Home";
import Find from "./privatePages/Find";
import Settings from "./privatePages/Settings";
import Profile from "./privatePages/Profile";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Main from "./Main";
import Register from "./publicPages/Register";
import Login from "./publicPages/Login";
import Summa from "./publicPages/Summa";
import Post from "./privatePages/Post";
import ViewProfile from "./privatePages/ViewProfile";
import { Toaster } from "react-hot-toast";

const App = () => {
  useEffect(()=>{
    const vh = window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  },[])
  return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/s" element={<Summa/>}/>
            <Route path="/main" element = {<Main/>}>
              <Route path="home" element = {<Home/>}/>
              <Route path="find" element = {<Find/>}/>
              <Route path="profile" element = {<Profile/>}/>
              <Route path="settings" element = {<Settings/>}/>
            </Route>
            <Route path="/post/:id" element={<Post/>}/>
            <Route path="/profileView/:userid" element={<ViewProfile/>}/>
        </Routes>
        <Toaster />
      </BrowserRouter>
  );
}

export default App;