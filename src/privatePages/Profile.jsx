import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import defaultUser from "../asserts/defaultuser.png"
import { Icon } from '@iconify/react';
import "../styles/Profile.css";
import { toast } from 'react-hot-toast';
import ProfilePostCard from '../components/ProfilePostCard';

const Profile = () => {
  const [username, setUsername] = useState(null);
  const [userImg, setUserImg] = useState("");
  const [posts, setPosts] = useState(null);
  const [updte, setUpdate] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [image, setImage] = useState("https://www.meu.edu.in/wp-content/uploads/2021/09/placeholder-240.png");
  const [loading, setLoading] = useState(false);
  const [deleteLoading,setDeleteLoading] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_ADDRESS}/api/profile`,
      {
        method: "GET",
        headers: {
          "x-access-token": localStorage.getItem('token'),
        }
      })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.status === "ok") {
          setUsername(data.username)
          setUserImg(data.userImg)
          setPosts(data.posts.reverse())
        }
        else {
          navigate('/')
        }
        setLoading(false)
      })
  }, [updte, navigate,deleteLoading])

  const handleFileSelect = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0])
    reader.onloadend = () => {
      setImage(reader.result);
    }
  };

  const handleUpload = (event) => {
    event.preventDefault();
    if(image === "https://www.meu.edu.in/wp-content/uploads/2021/09/placeholder-240.png"){
      toast.error("file not selected");
      return;
    }
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
        else {
          toast.dismiss(toastId);
          toast.error("Upload Failed")
        }
      })
      .catch((err) => {
        console.log(err);
      })
    setShowUpload(false)
    setImage("https://www.meu.edu.in/wp-content/uploads/2021/09/placeholder-240.png")
  };



  return (
    <div id='profile'>
      <div className="user">
        <div className='innerUser'>
          <div className="userImage">
            <img src={userImg || defaultUser} alt="userimg" className='innerUserImage' />
          </div>
          <div className='userName'>{loading ? <div className='username-loading gradient'></div> : username}</div>
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
        {loading ?
        <>
          <div className='post-loading gradient'></div>
        </>
        :
        posts && posts.map((element, ind) => {
          return (
            <ProfilePostCard key={ind} element={element} username={username} setDeleteLoading={setDeleteLoading}/>
          );
        })
        }
      </div>
    </div>
  )
}

export default Profile