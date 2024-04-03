import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import CommunityList from './CommunityList';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const SearchPage = (props) => {
  const [input, setInput] = useState('');
  const [communityListDefault, setCommunityListDefault] = useState([ { name : "works"}, { name : "wow"}, { name : "it works!"}]);
  const [communityList, setCommunityList] = useState([]);
  const BarStyling = {width:"50%"/*,background:"#ffffff"/*, border:"outset"*/, padding:"5% 0 5% 0" , zIndex: "10"};
  const fetchData = async () => {
    return await fetch('http://localhost:8000/community/?q=' + input)
      .then(response => response.status===200? response.json() : {})
      .then(data => {
         setCommunityList(data) 
         setCommunityListDefault(data)
       })
       .catch(error =>
          console.log(error)
  );}

  const updateInput = async (input) => {
    //  const filtered = communityListDefault.filter(community => {
    //   return community.name.toLowerCase().includes(input.toLowerCase())
    //  })
     setInput(input);
     //setCommunityList(filtered);
  }

  useEffect( () => {fetchData()},[input]);
	
  return (
    <>
      {/* <h1>Community List</h1> */}
      <ul className="list-group" style= {BarStyling}>
        {/* <li className="list-group-item"> */}
      <SearchBar 
       keyword={input} 
       setKeyword={updateInput}
      />
      {/* </li> */}
      <CommunityList communityList={Array.from(communityList)}/>
      </ul>
    </>
    
   );
}

export default SearchPage
