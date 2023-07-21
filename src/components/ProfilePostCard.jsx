import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react';
import "./ProfilePostCard.css"
import { toast } from 'react-hot-toast';

const ProfilePostCard = ({ element, username, setDeleteLoading }) => {
    const handleDelete = (id) => {
        let toastId = toast.loading("Deleting Post...");
        fetch(`${process.env.REACT_APP_API_ADDRESS}/api/deletepost/${id}/${username}`,
            {
                method: "DELETE"
            }
        )
            .then(res => res.json())
            .then((d) => {
                console.log(d);
                if(d.status === "okd"){
                    toast.dismiss(toastId);
                    toast.success("Post deleted successfully");
                    setDeleteLoading(pre => !pre);
                }
                else{
                    toast.dismiss(toastId);
                    toast.success("deletion failed");
                }
            })
            .catch((err) => {
                toast.error("failed to delete")
                console.log(err);
            })
    }
    return (
        <div className='post1'>
            <Link to={`/post/${element._id}`}>
                <div id="postimage1">
                    <img src={`${element.imageUrl}`} alt="posts" />
                </div>
            </Link>
            <div id="delete" onClick={() => { handleDelete(element._id) }}><Icon icon="mingcute:delete-2-line" color="white" /></div>
        </div>
    )
}

export default ProfilePostCard