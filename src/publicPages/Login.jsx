import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import bgImage from "../asserts/loginbg.png";
import { toast } from 'react-hot-toast';

const Login = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch(`${process.env.REACT_APP_API_ADDRESS}/api/loogedin`,
                {
                    method: "GET",
                    headers: {
                        "x-access-token": localStorage.getItem('token'),
                    }
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.status === "ok") {
                        navigate('/main/home');
                    }
                })
        }
    }, [navigate])



    const handleLogin = (event) => {
        event.preventDefault();
        setLoading(true);
        const toastId = toast.loading('Loading...');
        if (username === "" || password === "") {
            toast.dismiss(toastId);
            toast.error("username or password not filled")
            setLoading(false);
            return;
        }
        fetch(`${process.env.REACT_APP_API_ADDRESS}/api/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })
            .then((res) => res.json())
            .then((data) => {
                if (data.user) {
                    localStorage.setItem('token', data.user);
                    toast.dismiss(toastId);
                    toast.success('Login Succeessful');
                    navigate('/main/home');
                }
                else {
                    setUserName('')
                    setPassword('')
                    toast.dismiss(toastId);
                    toast.error('Please Check emial or password');
                }
                setLoading(false);
                console.log(data);
            })
    }
    return (
        <div className='outerBorder'>
            <div className="lleft">
                <img src={bgImage} id='loginBg' alt='login cover' />
            </div>
            <div className='lright'>
                <form onSubmit={handleLogin} className="loginForm">
                    <div className='loginText'>LogIn</div>
                    <input className='username' type="text" placeholder='username' onChange={(event) => { setUserName(event.target.value) }} value={username} />
                    <input className="password" type="password" placeholder='password' onChange={(event) => { setPassword(event.target.value) }} value={password} />
                    <input className='loginButton' type="submit" value={loading ? "Loading..." : "Login"} disabled={loading} />
                </form>
                <div className='signupLink'>
                    <Link to="/register">signup</Link>
                </div>
            </div>
        </div>
    )
}

export default Login