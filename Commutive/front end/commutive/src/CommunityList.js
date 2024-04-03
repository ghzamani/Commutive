import React from 'react';
import "./searchBar.css";

const CommunityList = ({communityList=[]}) => {
  return (
    <div style={{position:"relative"}}>
    <div style={{position:"absolute", zIndex:"10000" , width:"100%"}}>
    { communityList.map((data,index) => {
        if (data) {
          return (
            <li className="list-group-item community-list-item" style={{ position:"relative"}}>
              <a href={"/community/" + data.communityID} class="stretched-link" />
            <div key={data.communityID}>
             
              <p style={{display: "inline"}}>{data.name}</p>
              <p style={{color : "grey", fontSize : "15px", display: "inline"}}>{'  @' + data.communityID}</p>
              
	    </div>	</li>
    	   )	
    	 }
    	 return null
    }) }
    </div></div>
  );
}

export default CommunityList