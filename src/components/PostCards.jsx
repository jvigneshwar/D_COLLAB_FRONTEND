import React from 'react'
import "../components/PostCards.css";
import { Icon } from '@iconify/react';
import defaultUser from "../asserts/defaultuser.png";
import { Link } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';



const PostCards = (props) => {
  return (
    
    <div id="postcard">
        <Link to={`/post/${props.data._id}`} id="postimage">
          <img src={`${process.env.REACT_APP_API_ADDRESS}/images/${props.data.imageName}`} alt="post" id="postimageinner" />
        </Link>
        <div id="postcontrols">
          <img src={props.data.author.userimg || defaultUser} alt="userimage" id="userimage"/>
          <div id="control">
            <Icon icon="mingcute:share-forward-line" height="28px" id="share" onClick={()=>{navigator.clipboard.writeText(`http://localhost:3000/post/${props.data._id}`).then(toast.success('copied to clipboard')).catch((err)=>{toast.error("failed to copy")})}}/>
            <Toaster
              position='bottom-right'
              reverseOrder={true}
            />
            <Icon icon="icon-park-outline:like" height="25px" id="like" onClick={(e)=>{e.target.querySelector("path").style.fill = "red" ; e.target.querySelector("path").style.stroke = "red"}}/>
          </div>
        </div>
        
    </div>
    
  )
}

export default PostCards