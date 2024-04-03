import React, { Component, useEffect, useState } from "react";
import SearchPage from './SearchPage.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
// import { Sidebar, InputItem, DropdownItem, Icon, Item, Logo, LogoText } from 'react-sidebar-ui'
// import 'react-sidebar-ui/dist/index.css';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
 import AddIcon from '@material-ui/icons/Add';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import GroupIcon from '@material-ui/icons/Group';
import DashboardNavbar from './DashboardNavbar.js'
import ShowMoreText from 'react-show-more-text';
import InfiniteScroll from 'react-infinite-scroll-component';
import Sidebar from './communitySide'
import Notification from './notification'
import './dashboard.css';


import { Row, Col } from 'react-bootstrap';
//  import React, { useEffect, useState } from "react";
import { Card, CardColumns } from "react-bootstrap";


function Dashboard() {

  //  const [data, setData] = useState([{ name: "Salam!", communityID: "salamm" , photo : "https://www.w3schools.com/w3css/img_forest.jpg", "field": "others",
  //  description: "salamsalam"} , {name:"myCommunity" , communityID:"whoseCommunity", photo : "https://alittlecampy.com/wp-content/uploads/2018/01/community.jpg" , description:"Whose community do you think it is?" }
  //  , {name:"myCommunity" , communityID:"whoseCommunity", photo : null , description:"Whose community do you think it is?"}]);
  const [data, setData] = useState([]);
  //onst [dashboardState, setDashboardState] = useState("posts"); //"posts" or "communities"
  const [hasMore, setHasMore] =useState(true);
  const[ nextPage, SetNextPage] = useState("http://localhost:8000/mycommunities/?page=1");
  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  ////for later////
  useEffect(async () => {
    console.log('im heree');
    await timeout(20);
    fetchData()
  }, []);

  const fetchData = ()=>{
    
    fetch(nextPage, {
      method: 'GET',
      headers: {
        "Authorization": "Token " + localStorage.getItem('loginToken')
      }
    })
      .then((res) => {
        console.log(res)
        if (res.status === 200) {
          return res.json()
        }
        
        if (res.status === 401) {
          window.location.replace("/sign-in")
        }
        return {};
      }
      )
      .then((d) => {
        setData(data.concat(Array.from(d.results)));
        console.log("results:" + d.results)
        console.log("data" + data)
        SetNextPage(d.next);
        if(d.next === null){
          setHasMore(false)
        }
      });
  }

  function sidebarToggle() {
    let sidebarel = document.getElementById("sidebar");
    sidebarel.classList.toggle("active");
  }

  const LogoutClicked = ()=>{
    localStorage.removeItem("loginToken");
    localStorage.removeItem("username");
    window.location.replace("/"); //the url home is in
  }

  return (

    // <div className="dashboard">
    <div >
      <div className="row">
                    <div className="col-md-12" style={{padding:"0"}}>
      <DashboardNavbar />
      {/* <div className="row">
                    <div className="col-md-12" style={{paddingRight: "0px"}}> */}

      {/* <Router> */}


      {/* <div className="row" style={{margin:"0px 0px 0px 0px"}}>
            <div className="col-md-1 sidebarwrapping " style={{ paddingRight: "0px" }} >
             */}
      <div className="wrapper">
        <Sidebar location={"My Communities"} /*isDashboard={true} dashboardState={dashboardState} setDashboardState={setDashboardState}*/ />


        {/* <Sidebar id="sidebar" bgColor='black' isCollapsed={false}>
                    
                <DropdownItem
                  values={['First', 'Second', 'Third']}
                  bgColor={'black'}>
                  Menu
        </DropdownItem>

                <Item bgColor='black'>
                  <Icon><i className="fa fa-home" /></Icon>
          Home
        </Item>


                <Item bgColor='black'>
                  <Icon><i className="fa fa-cog" /></Icon>
          Setting
        </Item>
        

              </Sidebar> */}
        {/* </div> 
              </div> */}
        {/* <div class="container-fluid" style={{marginLeft: "200px"}}>

            <button type="button" id="sidebarCollapse" class="navbar-toggler" onClick={sidebarToggle} data-toggle="collapse" data-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation" >
                <i class="fas fa-align-left"></i>
                <span>Toggle Sidebar</span>
            </button>

            </div>*/}


        <div className=" dashboard">
          {/* <button type="button" id="sidebarCollapse" class="navbar-toggler" onClick={sidebarToggle} style={{ position: "fixed", top: "100px", left: "0px", zIndex: 100 }} >
            <ChevronRightIcon style={{ color: "#2a1b3d", fontSize: "40" }} />
          </button> */}
          {/*search box*/}
          {/* {dashboardState == "posts"?  */}
          <a href="/create-community" className="post-button" ><AddIcon className="create-community-icon" /> New Community</a>
          {/* : */}
          <div className="dashboardCommunities">
          <div style={{/*position: "absolute", top:"200px", zIndex: "1" , white-space: nowrap;*/ }}>
            
            

              {/*           
                    <CardColumns> */}

                <InfiniteScroll
                dataLength={data.length}
                next={fetchData}
                hasMore={hasMore}
                loader={
                // <h4>Loading...</h4>
                <div style={{width: "100%", justifyContent:"center", display:"flex"}}>
                <div className="loading" />
                </div>
            }
                endMessage={ null
                }>
                  <Row className="justify-content-center" style={{ width: "100%"/*, position: "absolute", top: "200px", left: "0px"*/, zIndex: "1", margin: "0" }}  >
                { data.length === 0? <div style= {{width:"50vw"}}></div> :
              data.map((data) => {
                if (data) return (
                  <Card className="m-4" key={data.communityID} style={{ width: "16rem" }}>
                    <Card.Img variant="top" src={data.photo != null ? data.photo : "https://om.rosheta.com/upload/61e6aa724ce98c29726e423dd146e4bc9435f9ea5eca681a349a2e2ab0a23494.png"} />
                    <Card.Body>
                      <Card.Title>{data.name}</Card.Title>
                      <Card.Subtitle style={{ color: "grey" }}>{"@" + data.communityID}</Card.Subtitle>
                      <Card.Text style={{ paddingTop: "5px" }}>
                        <ShowMoreText
                                lines={3}
                                more=''
                                less=''
                                className='content-css'
                                anchorClass='my-anchor-css-class'
                                expanded={false}
                                keepNewLines = {true}
                            >
                                {data.description}
                            </ShowMoreText></Card.Text>
                      {/* <Button variant="primary" href={character.url} target="_blank">
              More Info
            </Button> */}
                      {/* <a href="#" class="btn btn-primary">See Profile</a> */}
                      <a href={"/community/" + data.communityID} class="stretched-link" />
                    </Card.Body>
                  </Card>)
              })}</Row></InfiniteScroll>

            {/* </CardColumns> */}
          </div></div>
          
        </div>
      </div>

      <br />

      {/* <Switch>
          <Route exact path="/">

          </Route>
        </Switch> */}
      {/* </Router> */}



        </div>
        </div>
    </div>


  );
}
export default Dashboard;
