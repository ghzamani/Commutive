import React, { useEffect, useState, useRef } from "react";
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
//import AddIcon from '@material-ui/icons/Add';
import FeedbackIcon from '@material-ui/icons/Feedback';
//import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
import EventNoteIcon from '@material-ui/icons/EventNote';
import BarChartIcon from '@material-ui/icons/BarChart';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './communityTabs.css';


function Tabs(props) {
    // const [isAdmin, SetIsAdmin] = useState(props.userState == "user")
    const tabMenuRef = useRef()
    const [tabItems, SetTabItems] = useState([])
    const [triggerScroll, SetTriggerScroll] = useState(false)
    function sidebarToggle() {
        let sidebarel = document.getElementById("sidebar");
        sidebarel.classList.toggle("active");
        let sideButton = document.getElementById("sidebarCollapse2");
        sideButton.hidden = !sideButton.hidden;
        // document.getElementById("adminOnly").hidden= isAdmin;
        // console.log(isAdmin);
    }

    const LogoutClicked = () => {
        localStorage.removeItem("loginToken");
        localStorage.removeItem("username");
        window.location.replace("/"); //the url home is in
    }

    const Arrow = ({ text, className }) => {
        return (
            <div
                className={className}
            ></div>
        );
    };

    const ArrowLeft = Arrow({ className: 'arrow-prev' });
    const ArrowRight = Arrow({ className: 'arrow-next' });

    useEffect(() => {
        const TabList = [
            (<div id="Feed" key="Feed" className="tab-item" onClick={() => {props.setCommunityPart("Feed"); props.setScrollRight(false); }} style={{ cursor: "pointer" }}>
                <a><p style={{ fontSize: "18px", margin: "0" }}><EventNoteIcon style={{ color: "inherit", marginBottom: "5px" }} />  Feed</p></a>
            </div>)
        ]
        // if (props.userState === "owner") {
        //     TabList.push((<div id="Edit" key="Edit" className="tab-item" onClick={() => { props.handleEditShow(); props.setCommunityPart("Edit");}} style={{ cursor: "pointer" }}>
        //         <a><p style={{ fontSize: "18px", margin: "0" }}><EditIcon style={{ color: "inherit", marginBottom: "5px" }} />   Edit Community</p></a>
        //     </div>))
        //     TabList.push((<div id="Reports" key="Reports" className="tab-item" onClick={() => props.setCommunityPart("Reports")} style={{ cursor: "pointer" }}>
        //         <a ><p style={{ fontSize: "18px", margin: "0" }}><FeedbackIcon style={{ color: "inherit", marginBottom: "5px" }} />    Reports</p></a>
        //     </div>))
        // }
        // else if (props.userState === "admin") {
        //     TabList.push((<div id="Reports" key="Reports" className="tab-item" onClick={() => props.setCommunityPart("Reports")} style={{ cursor: "pointer" }}>
        //         <a ><p style={{ fontSize: "18px", margin: "0" }}><FeedbackIcon style={{ color: "inherit", marginBottom: "5px" }} />    Reports</p></a>
        //     </div>))
        // }
        if(props.userState !== "notjoined"){
            TabList.push((<div id="Events" key="Events" className="tab-item" onClick={()=>props.setCommunityPart("Events")} style={{ cursor: "pointer" }}>
            <a /*href="/createEvent"*/><p style={{ fontSize: "18px", margin: "0" }}><EventNoteIcon style={{ color: "inherit", marginBottom: "5px" }} />  Events</p></a>
        </div>))
        }
        TabList.push((<div id="Polls" key="Polls" className="tab-item" onClick={() => props.setCommunityPart("Polls")} style={{ cursor: "pointer" }}>
        <a><p style={{ fontSize: "18px", margin: "0" }}><BarChartIcon style={{ color: "inherit", marginBottom: "5px" }} />  Polls</p></a>
    </div>))
        if (props.userState === "admin" || props.userState === "owner") {
            TabList.push((<div id="Reports" key="Reports" className="tab-item" onClick={() => props.setCommunityPart("Reports")} style={{ cursor: "pointer" }}>
                <a ><p style={{ fontSize: "18px", margin: "0" }}><FeedbackIcon style={{ color: "inherit", marginBottom: "5px" }} />    Reports</p></a>
            </div>))
        }
        
        SetTabItems(TabList)
        console.log(TabList.length)
        SetTriggerScroll(true);
        // if (!!props.whichActive) {
        //     let list = document.getElementsByClassName("selected");
        //     for (let item of list) {
        //         item.classList.remove("selected");
        //     }
        //     console.log(document.getElementsByClassName("selected"));
        //     console.log(props.whichActive)
        //     if (document.getElementById(props.whichActive) !== null)
        //         document.getElementById(props.whichActive).className = "selected";
        // }
        // props.triggerPosition();

    }, [props.userState])

    useEffect(()=>{
        if(props.onEdit === false){
            tabMenuRef.current.scrollTo("Feed");
        }
    }, [props.onEdit])

    //   useEffect(()=> {
    //       SetIsAdmin(props.userState == "admin")

    //   } , props.userState )
    return (
        <div id="tabs">
            <ScrollMenu
                ref={tabMenuRef}
                data={triggerScroll ? tabItems : []}
                arrowLeft={ArrowLeft}
                arrowRight={ArrowRight}
                selected={props.whichActive}
                hideArrows = {true}
                hideSingleArrow={true}
                alignCenter ={true}
                alignOnResize = {true}
                translate = {3}
            />
        </div>
        //     <>
        //     
        //      
        //     <div class="sidebar-header">
        //         <h3 style={{margin: "0px"}}>

        //         <div style={{float: "right"}}> <button type="button" id="sidebarCollapse" className="navbar-toggler" onClick={sidebarToggle} >
        //             <MenuIcon style={{color: "#576766"}} fontSize="large"/>
        //         </button></div>
        //         <div className="profilePlace">
        //             <img className="profilePic" src="https://thumbs.dreamstime.com/b/user-icon-glyph-gray-background-106603565.jpg" alt="profile" />
        //             <p style={{verticalAlign: "middle", margin:"10px 0 0 0px"}}>this is my name</p>
        //         </div></h3>
        //     </div>

        //     <ul class="list-unstyled components">



        //         <div id="adminOnly" style={{  }} >


        //         </div> 
        //         {!!localStorage.getItem("loginToken")?
        //             <li>
        //             <a href={"/dashboard"}><p style={{fontSize: "18px", margin:"0"}}><HomeIcon style={{color: "inherit", marginBottom:"5px"}}/>  Home</p></a>
        //         </li>
        //         :
        //         <li>
        //             <a href={"/"}><p style={{fontSize: "18px", margin:"0"}}><HomeIcon style={{color: "inherit", marginBottom:"5px"}}/>  Main page</p></a>
        //         </li>
        //         }

        //         {/* <li onClick={LogoutClicked} style={{cursor: "pointer"}}>
        //         <a><p style={{fontSize: "18px", margin:"0"}}><ExitToAppIcon style={{color: "inherit", marginBottom:"5px"}}/>   Logout</p></a>
        //         </li> */}
        //     </ul>
        // </div> 
        // <button type="button" hidden={true} id="sidebarCollapse2" class="navbar-toggler" onClick={sidebarToggle} /*data-toggle="collapse" data-target="#sidebar" aria-controls="sidebar" aria-expanded="true" aria-label="Toggle navigation" */style={{ position:"fixed", top: "60px", left:"-10px", backgroundColor:"white",border:"2px solid #e3e3e3", zIndex: 100}} >
        //             <MenuIcon style={{color: "#33ABA3" ,fontSize: "40"}}/>
        //         </button>
        // </>
    )
}

export default Tabs;