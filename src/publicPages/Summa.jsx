// import React, { useState } from "react";
// import Resizer from "react-image-file-resizer";
// import userimage from "../asserts/defaultuser.png";
// import "../styles/Summa.css";

// function Summa(){
//   const [newImage,setNewImage] = useState(userimage);

//   function fileChangedHandler(event) {
//     var fileInput = false;
//     if (event.target.files[0]) {
//       fileInput = true;
//     }
//     if (fileInput) {
//       try {
//         Resizer.imageFileResizer(
//           event.target.files[0],
//           100,
//           100,
//           "JPEG",
//           100,
//           0,
//           (uri) => {
//             console.log(uri);
//             setNewImage(uri);
//           },
//           "base64",
//           200,
//           0
//         );
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }

//     return (
//       <div className="Summa">
//         <label htmlFor="input">
//             <input type="file" onChange={fileChangedHandler} id="input"/>
//             <div id="userb">
//                 <img src={newImage} alt="" id="useri"/>
//             </div>
//         </label>
//       </div>
//     );
//   }

// export default Summa;

// import React, { useRef, useState } from 'react';
// import "../styles/Summa.css"
// import image from "../asserts/samp.jpg";

// function RectangleDrawingTool() {
//   const canvasRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [isDrawable, setIsDrawable] = useState(true);
//   const [startX, setStartX] = useState(0);
//   const [startY, setStartY] = useState(0);
//   const [width, setWidth] = useState(0);
//   const [height, setHeight] = useState(0);
//   const [strokeColor, setStrokeColor] = useState('#ffff');

//   function handleMouseDown(e) {
//     setIsDrawing(true);
//     setStartX(e.nativeEvent.offsetX);
//     setStartY(e.nativeEvent.offsetY);
//   }

//   function handleMouseMove(e) {
//     if(isDrawable){
//       if (isDrawing) {
//         const newWidth = e.nativeEvent.offsetX - startX;
//         const newHeight = e.nativeEvent.offsetY - startY;
//         const ctx = canvasRef.current.getContext('2d');
//         ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//         ctx.beginPath();
//         ctx.rect(startX, startY, newWidth, newHeight);
//         ctx.strokeStyle = strokeColor;
//         ctx.stroke();
//         setWidth(newWidth);
//         setHeight(newHeight);
//       }
//     }
//   }

//   function handleMouseUp() {
//     setIsDrawing(false);
//   }

//   function handleMouseLeave() {
//     setIsDrawing(false);
//     console.log(startX,startY,width,height);
//   }

//   const [size,setSize] = useState({});
//   return (
//     <div id='all'>
//       <img src={image} alt="hi" id='image' onLoad={(e)=>{setSize({height : e.target.clientHeight , width : e.target.clientWidth})}}/>
//       <canvas
//         ref={canvasRef}
//         width = {size.width}
//         height={size.height}
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseLeave}
//       />
//     </div>
//   );
// }

// export default RectangleDrawingTool;


import React from 'react'

const Summa = () => {
  return (
    <div>Summa</div>
  )
}

export default Summa