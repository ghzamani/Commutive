import React, { useEffect, useState} from "react";
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
//import AddIcon from '@material-ui/icons/Add';
import FeedbackIcon from '@material-ui/icons/Feedback';
//import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
import EventNoteIcon from '@material-ui/icons/EventNote';
import BarChartIcon from '@material-ui/icons/BarChart';
import './communitySide.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import ProfileUser from './ProfileUser'
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import TodayIcon from '@material-ui/icons/Today';
import { useHistory } from "react-router-dom";
import { PhotoSizeSelectLargeSharp } from "@material-ui/icons";
//in dashboard:
//<Sidebar dashboardState={dashboardState} setDashboardState={setDashboardState} isDashboard={true}/>

function Sidebar(props){
    // const [isAdmin, SetIsAdmin] = useState(props.userState == "user")
    const isLoggedIn = !!localStorage.getItem("username");
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);
  useEffect(async () => {
    
    if(!isLoggedIn)
    {
      let sidebarel= document.getElementById("sidebar");
      sidebarel.classList.toggle("active");
      return;
    }
    if(props.location)
    {
      if(props.location=="PostPage"){
        sidebarToggle();
      }
      else{
        let sidebarel= document.getElementById(props.location);
        sidebarel.classList.toggle("selected");
      }
    }
  }, []);
    function sidebarToggle(){
        let sidebarel= document.getElementById("sidebar");
        sidebarel.classList.toggle("active");
        let sideButton = document.getElementById("sidebarCollapse2");
        sideButton.hidden = !sideButton.hidden;
            // document.getElementById("adminOnly").hidden= isAdmin;
            // console.log(isAdmin);
      }

      const LogoutClicked = ()=>{
        localStorage.removeItem("loginToken");
    localStorage.removeItem("username");
    window.location.replace("/"); //the url home is in
      }


      useEffect(()=>{
        
        
        // if(!!props.whichActive)
        // {
        //     let list = document.getElementsByClassName("selected");
        //     for(let item of list){
        //         item.classList.remove("selected");
        //     }
        //     console.log(document.getElementsByClassName("selected"));
        //     console.log(props.whichActive)
        //     if(document.getElementById(props.whichActive) !== null)
        //         document.getElementById(props.whichActive).className="selected";
        // }
        // props.triggerPosition();
            
      } , [props.whichActive])

      const ChangeActive = (s)=>{
        
      }

    //   useEffect(()=> {
    //       SetIsAdmin(props.userState == "admin")
        
    //   } , props.userState )
    return (
        <>
         <div id="sidebar" hidden={!isLoggedIn}>
        <div class="sidebar-header">
            <h3 style={{margin: "0px"}}>
            
            <div style={{float: "right"}}> <button type="button" id="sidebarCollapse" className="navbar-toggler" onClick={sidebarToggle} /*data-toggle="collapse" data-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation"*/ >
                {/* <MenuIcon style={{color: "#576766"}} fontSize="large"/> */}
                <ChevronLeftIcon style={{ color: "white", marginTop: "-5px" }} fontSize="large" />
            </button></div>
            <div className="profilePlace">
                <img className="profilePic" src="https://thumbs.dreamstime.com/b/user-icon-glyph-gray-background-106603565.jpg" alt="profile" />
                <p style={{verticalAlign: "middle", margin:"10px 0 0 0px"}}>{localStorage.getItem("username")}</p>
            </div></h3>
        </div>

        <ul class="list-unstyled components">
            
            {/*li onClick={()=>props.setDashboardState("communities")} style={{ cursor: "pointer" }}>
              <a>
                <p style={{ fontSize: "20px", margin: "0" }}>
                  <GroupIcon style={{ color: "white", marginBottom: "5px" }} />  My Communities</p>
              </a>
            </li> */}
          {/* //   <li>
         
          //   <a onClick={()=>props.setDashboardState("posts")} style={{ cursor: "pointer" }}>
          //     <p style={{ fontSize: "20px", margin: "0" }}>
          //       <HomeIcon style={{ color: "white", marginBottom: "5px" }} />  Home</p>
          //   </a>
          // </li> */}
          <li id="Home">
          <a href={"/dashboard"}><p style={{fontSize: "18px", margin:"0"}}><HomeIcon style={{color: "inherit", marginBottom:"5px"}}/>  Home</p></a>
      </li>
      {/* <li onClick={() => setShow(true)}>
            <a >
              <p style={{ fontSize: "18px", margin: "0" }}>
                <PersonIcon style={{ color: "white", marginBottom: "5px" }} />
                  Profile
                  {show && <ProfileUser 
                  show={show} 
                  handleClose={handleClose}
                  />}
              </p>
            </a>
          </li> */}
       
       <li id="My Communities">
          <a href={"/mycommunities"}><p style={{fontSize: "18px", margin:"0"}}><GroupIcon style={{ color: "white", marginBottom: "5px" }} />  My Communities</p></a>
      </li>
            {/* <li onClick={LogoutClicked} style={{cursor: "pointer"}}>
            <a><p style={{fontSize: "18px", margin:"0"}}><ExitToAppIcon style={{color: "inherit", marginBottom:"5px"}}/>   Logout</p></a>
            </li> */}

        

      <li id="My Calendar">
          <a href={"/mycalendar"}><p style={{fontSize: "18px", margin:"0"}}><TodayIcon style={{color: "inherit", marginBottom:"5px"}}/>  My Calendar</p></a>
      </li>

      <li onClick={LogoutClicked} style={{ cursor: "pointer" }}>
              <a>
                <p style={{ fontSize: "20px", margin: "0" }}>
                  <ExitToAppIcon style={{ color: "white", marginBottom: "5px" }} />   Logout</p>
              </a>
            </li>
        </ul>
    </div> 
    <button type="button" hidden={true} id="sidebarCollapse2" class="navbar-toggler" onClick={sidebarToggle} /*data-toggle="collapse" data-target="#sidebar" aria-controls="sidebar" aria-expanded="true" aria-label="Toggle navigation" */style={{ position:"fixed", top: "60px", left:"-10px", backgroundColor:"white",border:"2px solid #e3e3e3", zIndex: 100}} >
                {/* <MenuIcon style={{color: "#33ABA3" ,fontSize: "40"}}/> */}
                <ChevronRightIcon style={{ color: "#2a1b3d", fontSize: "40" }} />
            </button>
    </>
    )
}

export default Sidebar;