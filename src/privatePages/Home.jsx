import React, { useEffect, useState } from "react";
import PostCards from "../components/PostCards";
import SuggestionCard from "../components/SuggestionCard";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const [post, setPost] = useState(null);
    const [suggestUser, setSuggestUser] = useState(null);
    const [showSuggest, setShowSuggest] = useState(true);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (window.innerWidth < 480) {
            setShowSuggest(false);
        }
    }, [])
    useEffect(() => {
        setLoading(true)
        fetch(`${process.env.REACT_APP_API_ADDRESS}/api/home`,
            {
                method: "GET",
                headers: {
                    "x-access-token": localStorage.getItem('token'),
                }
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.status);
                if (data.status === "failed") {
                    navigate("/");
                }
                setPost(data.posts.reverse())
                setSuggestUser(data.user.reverse())
                setLoading(false)
            })
    }, [navigate])


    return (
        <div id="home">
            <div className="posts">

                {loading ?
                    <>
                        <div className="home-box-loading gradient"></div>
                        <div className="home-box-loading gradient"></div>
                    </>
                    :
                    post && post.map((data, key) => {
                        return (
                            <PostCards data={data} key={key} />
                        )
                    })
                }
            </div>
            {showSuggest ?
                <div className="suggestion">
                    <h3 id="suggesthead">Suggestions</h3>
                    {loading ?
                        <>
                            <div className="suggest-box-loading gradient"></div>
                            <div className="suggest-box-loading gradient"></div>
                        </>
                        :
                        suggestUser && suggestUser.map((data, key) => {
                            return (
                                <SuggestionCard key={key} data={data} />
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