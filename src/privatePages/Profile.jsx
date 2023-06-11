import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import defaultUser from "../asserts/defaultuser.png"
import { Icon } from '@iconify/react';
import "../styles/Profile.css";

const Profile = () => {
  const [username,setUsername] = useState(null);
  const [userImg,setUserImg] = useState(""); 
  const [posts,setPosts] = useState(null);
  const [change,setChange] = useState(0);
  const [showUpload,setShowUpload] = useState(false);
  
  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_ADDRESS}/api/profile`,
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
        setUsername(data.username)
        setUserImg(data.userImg)  
        setPosts(data.posts)
      }
      else{
        window.location.href = "/";
      }
    })
  },[change])

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('username',username);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ADDRESS}/api/upload`, formData);
      if(response.data.status === "ok"){
        window.alert("image uploaded to server")
        setChange(change+1)
      }
    } catch (error) {
      console.error(error);
    }
    setShowUpload(false)
  };

  var url = "https://www.meu.edu.in/wp-content/uploads/2021/09/placeholder-240.png";
  if(selectedFile != null){
    url = URL.createObjectURL(selectedFile)
  }

  return (
    <div id='profile'>
      <div className="user">
        <div className='innerUser'>
          <div className="userImage">
            <img src={userImg || defaultUser} alt="userimg" className='innerUserImage'/>
          </div>
          <div className='userName'>{username}</div>
        </div>      
        <button className='postDesign' onClick={()=>{setShowUpload(true)}}>Post Design</button>
      </div>

      {!showUpload ? <></>:
      <form onSubmit={handleSubmit} id="form">
        <label htmlFor="upload" id='label'>
          <img src={url} alt="postimg1" id='uploadImage'/>
          <input type="file" onChange={handleFileSelect} id="upload"/>
        </label>
        <div className="buttons">
          <Icon icon="material-symbols:arrow-back-rounded" id='back' width='25px' onClick={()=>{setShowUpload(false)}}/>
          <button type="submit" id='uploadBtn'>Post Design</button>
        </div>
      </form>}

      <div className="posts1">
      {posts && posts.map((element)=>{
        return(
          <div className='post1'>
            <Link to={`/post/${element._id}`}>
              <div id="postimage1">
                <img src={`${process.env.REACT_APP_API_ADDRESS}/images/${element.imageName}`} alt="posts" />
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