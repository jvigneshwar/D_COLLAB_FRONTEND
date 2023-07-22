import React, { useEffect, useRef, useState } from "react";
import PostCards from "../components/PostCards";
import SuggestionCard from "../components/SuggestionCard";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [post, setPost] = useState(null);
    const [suggestUser, setSuggestUser] = useState(null);
    const [showSuggest, setShowSuggest] = useState(true);
    const [loading, setLoading] = useState(false);
    const [postCount, setPostCount] = useState(0);
    const [navNum, setNavNum] = useState(0);

    const initialRender = useRef(true);
    const postsDom = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (window.innerWidth < 480) {
            setShowSuggest(false);
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_API_ADDRESS}/api/home`, {
            method: "GET",
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data.status);
                if (data.status === "failed") {
                    navigate("/");
                }
                setPost(data.posts);
                setSuggestUser(data.user);
                setPostCount(data.count);
                setLoading(false);
            });
    }, [navigate]);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            setLoading(true);
            fetch(`${process.env.REACT_APP_API_ADDRESS}/api/nextfeed/${navNum}`)
                .then((res) => res.json())
                .then((data) => {
                    setPost(data.posts);
                    setLoading(false);
                    postsDom.current.scrollTop = 0;
                })
                .catch(() => setLoading(false));
            console.log(postsDom.current.scrollTop);
        }
    }, [navNum]);

    return (
        <div id="home">
            <div className="posts" ref={postsDom}>
                {loading ? (
                    <>
                        <div className="home-box-loading gradient"></div>
                        <div className="home-box-loading gradient"></div>
                    </>
                ) : (
                    post &&
                    post.map((data, key) => {
                        return <PostCards data={data} key={key} />;
                    })
                )}
                <div className="number-nav">
                    <button
                        className="pre-num"
                        onClick={() => {
                            setNavNum((pre) => pre - 1);
                        }}
                        disabled={navNum === 0 || loading}
                    >
                        Prev
                    </button>
                    <div className="num-count">{navNum + 1}</div>
                    <button
                        className="next-num"
                        onClick={() => {
                            setNavNum((pre) => pre + 1);
                        }}
                        disabled={navNum >= Math.floor(postCount / 10) || loading}
                    >
                        Next
                    </button>
                </div>
            </div>

            {showSuggest ? (
                <div className="suggestion">
                    <h3 id="suggesthead">Suggestions</h3>
                    {loading && initialRender.current ? (
                        <>
                            <div className="suggest-box-loading gradient"></div>
                            <div className="suggest-box-loading gradient"></div>
                        </>
                    ) : (
                        suggestUser &&
                        suggestUser.map((data, key) => {
                            return <SuggestionCard key={key} data={data} />;
                        })
                    )}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Home;
