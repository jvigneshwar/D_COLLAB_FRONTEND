import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import defaultUser from "../asserts/defaultuser.png"
import "../styles/ViewProfile.css";
import { toast } from 'react-hot-toast';

const ViewProfile = () => {
    const [username, setUsername] = useState(null);
    const [userImg, setUserImg] = useState("");
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(false);


    const { userid } = useParams()
    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_API_ADDRESS}/profileView/${userid}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setUsername(data.user.username)
                setUserImg(data.user.userimg)
                setPosts(data.user.posts.reverse())
                setLoading(false)
            })
    }, [userid])
    return (
        <div id='profile'>
            <div className="user2">
                <div className='innerUser'>
                    <div className="userImage">
                        <img src={userImg || defaultUser} alt="userimg" className='innerUserImage' />
                    </div>
                    <div className='userName'>{loading ? <div className='username-loading gradient'></div> : username}</div>
                </div>
                <button className='postDesign' onClick={() => {
                    navigator.clipboard.writeText(`https://d-collab.onrender.com/profileView/${userid}`)
                        .then(toast.success('copied to clipboard'))
                        .catch((err) => { toast.error("failed to copy") })
                }}>Share Profile</button>
            </div>

            <div className="posts2">
                {loading ?
                <>
                  <div className='post-loading gradient'></div>
                </>
                :
                posts && posts.map((element) => {
                    return (
                        <div className='post2'>
                            <Link to={`/post/${element._id}`}>
                                <div id="postimage21">
                                    <img src={element.imageUrl} alt="posts" />
                                </div>
                            </Link>
                        </div>
                    );
                })
                }
            </div>
        </div>
    )
}

export default ViewProfile