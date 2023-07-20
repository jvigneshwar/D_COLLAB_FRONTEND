import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import userDefault from "../asserts/defaultuser.png";
import "../styles/Post.css"
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { toast } from 'react-hot-toast';

const Post = () => {

    const {id} = useParams();
    const [postData,setPostData] = useState(null);
    const [update,setUpdate] = useState(false);
    const [sending,setSending] = useState(false)
    
    useEffect(()=>{
      fetch(`${process.env.REACT_APP_API_ADDRESS}/post/${id}`)
      .then((res)=>res.json())
      .then((data)=>{
        setPostData(data)
        setResultRating(data.rating / data.ratingCount)
        console.log(data);
      })
    },[update,id])

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDrawable, setIsDrawable] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [strokeColor, setStrokeColor] = useState('#000');
  const [size,setSize] = useState({});
  const [resultRating,setResultRating] = useState(null);

  function handleMouseDown(e) {
    setIsDrawing(true);
    setStartX(e.nativeEvent.offsetX);
    setStartY(e.nativeEvent.offsetY);
  }

  function handleMouseMove(e) {
    if(isDrawable){
      if (isDrawing) {
        const newWidth = e.nativeEvent.offsetX - startX;
        const newHeight = e.nativeEvent.offsetY - startY;
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();
        ctx.rect(startX, startY, newWidth, newHeight);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 3;
        ctx.stroke();
        setWidth(newWidth);
        setHeight(newHeight);
      }
    }
  }

  function cleanrext(){
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  function drawRct(e){
    let re = postData.Suggestions[e.target.parentNode.id].rectangle;
    console.log(re);
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.rect(re[0], re[1], re[2], re[3]);
    ctx.strokeStyle = re[4];
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  function handleMouseUp() {
    setIsDrawing(false);
    console.log(startX,startY,width,height,strokeColor);
  }

  const [suggestBody,setSuggestBody] = useState("");

  function sendSuggest() {
    cleanrext()
    setSending(true);
    setIsDrawable(false)
    fetch(`${process.env.REACT_APP_API_ADDRESS}/postSuggest`,
      {
        method:"POST",
        headers:{
          "Content-Type" : "application/json",
          "x-access-token" : localStorage.getItem('token'),
        },
        body:JSON.stringify({
          suggestBody,
          rectangle:[startX,startY,width,height,strokeColor],
          postId:id
        })
      }
    )
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data);
      setSuggestBody("");
      setSending(false);
      setUpdate(!update)
    })
    .catch((err)=>{
      setSending(false);
    })
  } 

  const [rating,setRating] = useState(null);
  function sendRating(){
    setSending(true)
    if(rating < 0 || rating > 5){
      toast.error("rating should be given between 0 - 5")
      setRating("");
      setSending(false)
      return;
    }
    fetch(`${process.env.REACT_APP_API_ADDRESS}/postRating`,
    {
      method:"POST",
      headers:{
        "Content-Type" : "application/json",
      },
      body:JSON.stringify({
        id,
        rating
      })
    })
    .then((res)=>res.json())
    .then((data)=>{
      setResultRating(data.savedPost.rating / data.savedPost.ratingCount)
      console.log(data);
      setRating("");
      setSending(false);
    })
    .catch((err)=>{toast.error("error while sending rating")})
  }

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
  <div id='all'>
    <div className="left">
      <div id='postImage'>
        <img src={postData && postData.imageUrl} alt={postData && postData.imageName} id='image' onLoad={(e)=>{setSize({height : e.target.clientHeight , width : e.target.clientWidth})}}/>
        <canvas
          id="draw"
          ref={canvasRef}
          width = {size.width}
          height={size.height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
      </div>
    </div>

      <div className="right">
      <div className="authorcard">
          <div id='userName'>{postData && postData.author.username}</div>
          <div className="authorouter">
            <img src={(postData && postData.author.userimg) || (userDefault)} alt="author" id='author'/>
          </div>
      </div>
      <Box sx={{ width: '85%',height: '83%', typography: 'body1'}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" variant="fullWidth">
            <Tab label="Suggestion" value="1" />
            <Tab label="Rating" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {postData && postData.Suggestions.map((element,index)=>{
            return(
              <label key={index} className='post-suggestCardo'>
                <input type="radio" name="radioname" value={index} />
                <div key={index} id={index} className="post-suggestCard" onClick={drawRct}>
                  <div className='sugesterName'>{element.author}</div>
                  <p className='suggestbody'>{element.suggestBody}</p>
                </div>
              </label>
            )
          })}
          <div className="sendr">
            <input type="color" id="colorPicker" onChange={(e)=>{
              setStrokeColor(e.target.value)
              const ctx = canvasRef.current.getContext('2d');
              ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
              ctx.beginPath();
              ctx.rect(startX, startY, width, height);
              ctx.strokeStyle = strokeColor;
              ctx.lineWidth = 3;
              ctx.stroke();
            }}/>
            <input type="text" placeholder='Suggest'  id="suggest" disabled={sending} onChange={(e)=>{setSuggestBody(e.target.value)}} value={suggestBody} onFocus={()=>{setIsDrawable(true);cleanrext()}} />
            <input type="submit" value={sending ? "Sending.." : "Send"} disabled={sending} onClick={sendSuggest} id="send"/>
          </div>
        </TabPanel>
        <TabPanel value="2">
          <div id='rate'>Rating : {resultRating || "0"}</div>
          <div className="sendr">
            <input type="number" placeholder='between 0 - 5' min={0} max={5} id="rating" disabled={sending} value={rating} onChange={(e)=>{setRating(e.target.value)}}/>
            <input type="submit" id="send" value={sending ?  "Sending.." : "Send Rating"} disabled={sending} onClick={sendRating}/>
          </div>
          </TabPanel>
      </TabContext>
    </Box>
    </div>
    </div>
  )
}

export default Post