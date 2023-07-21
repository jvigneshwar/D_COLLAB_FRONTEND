import React from 'react'
import "../components/SuggestionCard.css";
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import defaultUser from "../asserts/defaultuser.png";


const SuggestionCard = (props) => {

  return (
    
    <div id="SuggestionCard">
        <div id="sphotonname">
            <div id="SuggestUserImg">
              <img src={props.data.userimg || defaultUser} alt="SuggestUserImg" id="InnerSuggestUserImg"/>
            </div>
            <p id="SuggestUserName">{props.data.username}</p>
        </div>
        <Link to={`/profileView/${props.data._id}`}>
          <Icon icon="ic:round-play-arrow" width="25px" id="addFriend"/>
        </Link>
    </div>
  )
}

export default SuggestionCard