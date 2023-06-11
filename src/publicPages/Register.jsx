import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Resizer from "react-image-file-resizer";
import userDefault from "../asserts/defaultuser.png";
import "../styles/Register.css";
import bgImage from "../asserts/loginbg.png";



const Register = () => {

    const [username,setusername] = useState("");
    const [name,setname] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [userImg,setUserImg] = useState("");

  function fileChangedHandler(event) {
    var fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      try {
        Resizer.imageFileResizer(
          event.target.files[0],
          100,
          100,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log(uri);
            setUserImg(uri);
          },
          "base64",
          150,
          0
        );
      } catch (err) {
        console.log(err);
      }
    }
  }

    const handleRegister = async (event) => {
        event.preventDefault()
        const responce = await fetch(`${process.env.REACT_APP_API_ADDRESS}/api/register`,
        {
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                username,
                userImg,
                name,
                email,
                password
            })
        });
        const data = await responce.json();
        if(data.status === "ok"){
            window.alert("Registration Success")
            window.location.href = "/";
        }
        else{
            alert("email or username already exists");
        }
    }

  return (
    <div className='outerBorder routerBorder'>
      <div className="lleft rleft">
        <img src={bgImage} id='loginBg' className='rloginBg' alt='login cover' />
      </div>
      <div className='lright rright'>
        <form onSubmit={handleRegister} className="loginForm rloginForm">
          <div className="pro">
            <div className='loginText'> SignUp</div>
            <label htmlFor="input">
                <input type="file" onChange={fileChangedHandler} id="input"/>
                <div id="userb">
                    <img src={userImg || userDefault} alt="" id="useri"/>
                </div>
            </label>
          </div>
            <input placeholder='User Name' type="text" onChange={(event)=>{setusername(event.target.value)}}/>
            <input placeholder='Full Name' type="text" onChange={(event)=>{setname(event.target.value)}}/>
            <input placeholder='Email' type="email" onChange={(event)=>{setemail(event.target.value)}}/>
            <input placeholder='Password' type="password" onChange={(event)=>{setpassword(event.target.value)}}/>
            <input className='loginButton' type="submit" />
        </form>
            <div className='signupLink'>
              <span className='signupLinkText'>already a user&nbsp;</span>
              <Link to="/">login</Link>
            </div>
        </div>
    </div>
  )
}

export default Register

