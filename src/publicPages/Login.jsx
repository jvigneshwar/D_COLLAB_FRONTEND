import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "../styles/Login.css";
import bgImage from "../asserts/loginbg.png";
import { Toaster,toast } from 'react-hot-toast';

const Login = () => {
    const [username , setUserName] = useState("");
    const [password , setPassword] = useState("");

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            fetch(`${process.env.REACT_APP_API_ADDRESS}/api/loogedin`,
            {
                method: "GET",
                headers:{
                    "x-access-token" : localStorage.getItem('token'),
                }
            })
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data);
                if(data.status === "ok"){
                    window.location.href = "/main/home";
                }
            })    
        }
    },[])

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log(process.env.REACT_APP_HOST_ADDRESS);
        const response = await fetch(`${process.env.REACT_APP_API_ADDRESS}/api/login`,
        {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                username,
                password
            })
        });
        const data = await response.json();

        if(data.user){
            localStorage.setItem('token',data.user);
            toast.success('Login Succeessful');
            window.location.href = "/main/home";
        }
        else{
            toast.error('Please Check emial or password');
        }
        console.log(data);
    }
  return (
    <div className='outerBorder'>
        <div className="lleft">
            <img src={bgImage} id='loginBg' alt='login cover' />
        </div>
        <div className='lright'>
            <form onSubmit={handleLogin} className="loginForm">
                <div className='loginText'>LogIn</div>
                <input className='username' type="text" placeholder='username' onChange={(event)=>{setUserName(event.target.value)}}/>
                <input className="password" type="password" placeholder='password' onChange={(event)=>{setPassword(event.target.value)}}/>
                <input className='loginButton' type="submit" value="Login" />
            </form>
                <div className='signupLink'>
                <span className='signupLinkText'>new user&nbsp;</span> 
                <Link to="/register">signup</Link>
                </div>
        </div>
        <Toaster/>
    </div>
  )
}

export default Login