import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import defaultUser from "../asserts/defaultuser.png"
import toast,{Toaster} from 'react-hot-toast';
import "../styles/Profile.css";

const ViewProfile = () => {
    const [username,setUsername] = useState(null);
    const [userImg,setUserImg] = useState(""); 
    const [posts,setPosts] = useState(null);

    const {userid} = useParams()
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_ADDRESS}/profileView/${userid}`)
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            setUsername(data.user.username)
            setUserImg(data.user.userimg)  
            setPosts(data.user.posts)
        })
    },[userid])
  return (
    <div id='profile'>
        <div className="user">
            <div className='innerUser'>
                <div className="userImage">
                    <img src={userImg || defaultUser} alt="userimg" className='innerUserImage'/>
                </div>
                <div className='userName'>{username}</div>
            </div>      
            <button className='postDesign' onClick={()=>{
                navigator.clipboard.writeText(`${process.env.REACT_APP_API_ADDRESS}/profileView/${userid}`)
                .then(toast.success('copied to clipboard'))
                .catch((err)=>{toast.error("failed to copy")})
            }}>Share Profile</button>
            <Toaster
              position='bottom-right'
              reverseOrder={true}
            />
        </div>

        <div className="posts2">
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

export default ViewProfile