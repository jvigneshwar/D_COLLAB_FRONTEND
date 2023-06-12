import React, { useEffect, useState } from "react";
import PostCards from "../components/PostCards";
import SuggestionCard from "../components/SuggestionCard";
import "../styles/Home.css";

const Home = () => {
    
    const [post,setPost] = useState(null);
    const [suggestUser,setSuggestUser] = useState(null);
    const [showSuggest,setShowSuggest] = useState(true);
    useEffect(()=>{
        if(window.innerWidth < 480){
            setShowSuggest(false);
        }
    },[])
    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_ADDRESS}/api/home`,
        {
            method: "GET",
            headers:{
                "x-access-token" : localStorage.getItem('token'),
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data);
            setPost(data.posts.reverse())
            setSuggestUser(data.user.reverse())
            if(data.status === "failed"){
                window.location.href = "/";
            }
        })    
    },[])

    
    return(
        <div id="home">
            <div className="posts">
                {
                    post && post.map((data,key)=>{
                    return(
                        <PostCards data={data} key={key}/>
                    )})
                }
            </div>
            {showSuggest ? 
            <div className="suggestion">
                <h3 id="suggesthead">Suggestions</h3>
                {
                    suggestUser && suggestUser.map((data,key) => {
                        return(
                            <SuggestionCard key={key} data={data}/>
                        );
                    })
                }
            </div>
            :
            <></>
            }
        </div>
    );
}

export default Home;