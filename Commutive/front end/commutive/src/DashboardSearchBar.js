import React from 'react';
import { Row , Col } from 'react-bootstrap';
import "./DashboardSearchBar.css"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
const DashboardSearchBar = ({keyword,setKeyword}) => {
  // const BarStyling = { width:'50%',/*background:"#ffffff", border:"outset",*/ padding:"5% 0 5% 0", marginLeft:'10%',marginRight:'10%'};
  return (
    
    // <input 
    //  style={BarStyling}
    //  key="random1"
    //  value={keyword}
    //  placeholder={"search coummunity"}
    //  onChange={(e) => setKeyword(e.target.value)}
    // />

    ////ALL CHANGES HERE MUST BE ACCEPTED////
    <div class="input-group has-search">
  <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet"/>
  
  <span class="input-group-prepend">
    <div class="input-group-text bg-transparent border-0">
      <i class="fa fa-search"></i>
    </div>
  </span>
  <input class="form-control border-0" style={{margin: "0px 0px 0px 0px"}} type="search" value={keyword} key="random1" placeholder={"Search community"} onChange={(e) => setKeyword(e.target.value)}/>
  
  
</div>

  );
}




export default DashboardSearchBar
