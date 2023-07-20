import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import defaultUser from "../asserts/defaultuser.png"
import { Icon } from '@iconify/react';
import "../styles/Profile.css";
import { toast } from 'react-hot-toast';

const Profile = () => {
  const [username, setUsername] = useState(null);
  const [userImg, setUserImg] = useState("");
  const [posts, setPosts] = useState(null);
  const [updte, setUpdate] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [image, setImage] = useState("https://www.meu.edu.in/wp-content/uploads/2021/09/placeholder-240.png");

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ADDRESS}/api/profile`,
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
          setUsername(data.username)
          setUserImg(data.userImg)
          setPosts(data.posts)
        }
        else {
          navigate('/')
        }
      })
  }, [updte])


  const handleFileSelect = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0])
    reader.onloadend = () => {
      setImage(reader.result);
    }
  };

  const handleUpload = (event) => {
    event.preventDefault();
    const toastId = toast.loading("Upoading...");
    fetch(`${process.env.REACT_APP_API_ADDRESS}/api/upload`,
      {
        method: "POST",
        headers: {
          "x-access-token": localStorage.getItem('token'),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          image,
          username
        })
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "ok") {
          toast.dismiss(toastId);
          toast.success("Post Uploaded")
          setUpdate(!updte)
        }
        else{
          toast.dismiss(toastId);
          toast.error("Upload Failed")
        }
      })
      .catch((err)=>{
        console.log(err);
      })
    setShowUpload(false)
  };



  return (
    <div id='profile'>
      <div className="user">
        <div className='innerUser'>
          <div className="userImage">
            <img src={userImg || defaultUser} alt="userimg" className='innerUserImage' />
          </div>
          <div className='userName'>{username}</div>
        </div>
        <button className='postDesign' onClick={() => { setShowUpload(true) }}>Post Design</button>
      </div>

      {!showUpload ? <></> :
        <form onSubmit={handleUpload} id="form">
          <label htmlFor="upload" id='label'>
            <img src={image} alt="postimg1" id='uploadImage' />
            <input type="file" onChange={handleFileSelect} id="upload" />
          </label>
          <div className="buttons">
            <Icon icon="material-symbols:arrow-back-rounded" id='back' width='25px' onClick={() => { setShowUpload(false) }} />
            <button type="submit" id='uploadBtn'>Post Design</button>
          </div>
        </form>}

      <div className="posts1">
        {posts && posts.map((element,ind) => {
          return (
            <div key={ind} className='post1'>
              <Link to={`/post/${element._id}`}>
                <div id="postimage1">
                  <img src={`${element.imageUrl}`} alt="posts" />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Profile