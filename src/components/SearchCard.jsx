import React from 'react'
import "../components/SearchCard.css";
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import defautUser from '../asserts/defaultuser.png';
const SearchCard = (props) => {
  return (
    <div id="SearchCard">
        <div id="sphotonname">
            <img src={props.data.userimg || defautUser} alt="SuggestUserImg" id="SuggestUserImg"/>
            <p id="SuggestUserName">{props.data.username}</p>
        </div>
        <Link to={`/profileView/${props.data._id}`} id="addFriendOut">
          <Icon icon="ic:round-play-arrow" width="25px" id="addFriend"/>
        </Link>
    </div>
  )
}

export default SearchCard