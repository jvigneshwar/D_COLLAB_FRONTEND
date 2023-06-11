import React, { useEffect, useState } from 'react'
import SearchCard from '../components/SearchCard';
import "../styles/Find.css";

const Find = () => {
  const [searchTxt,setSearchTxt] = useState("")
  const [searchData,setSearchData] = useState([]);

  useEffect(()=>{
      fetch(`${process.env.REACT_APP_API_ADDRESS}/searchUser/?q=${searchTxt}`,
      {
        method: "GET"
      })
      .then((res)=>res.json())
      .then((data)=>{setSearchData(data);console.log(data);})
      .catch((err)=>console.log(err))
  },[searchTxt])
  
  return (
    <div>
      <input type="text" id="search" placeholder='Search' onChange={(e)=>{setSearchTxt(e.target.value)}}/>
      {searchData && searchData.map((element,index)=>{
        return(
          <SearchCard data={element}/>
        )
      })}
    </div>
  )
}

export default Find