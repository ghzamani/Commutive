import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import './CommunityPage.css';
import Sidebar from './communitySide'
import Tabs from './CommunityTabs'
import ShowMoreText from 'react-show-more-text';
import AddIcon from '@material-ui/icons/Add';
//import ExpandLessIcon from '@material-ui/icons/ExpandLess';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ReportList from "./reportList";
import ListPost from './listPost';
import CreatePost from './CreatePost';
import ServerUrl from './constants';
import DashboardNavbar from './DashboardNavbar.js'
import Popup from './popup';
import Vote from './adminVotingSystem';
import Showevent from './showevent';
import ShowCalendar from './showCalendar';
import Dropdown from 'react-bootstrap/Dropdown';
import CreateAdminPoll from './createAdminPoll';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

function CommunityPage() {
    const [joinNotif, setJoinNotif] = useState("");
    const [profile, setProfile] = useState({});
    const [userState, SetUserState] = useState("notjoined"); //can be "user" , "admin" , "owner" , "notjoined";
    const [showPiece, setShowPiece] = useState({ calendar: false, rules: false, online: false });
    const [triggerPost , setTriggerPost] =useState(false);
    const [triggerCommunity, setTriggerCommunity] = useState(false);
    const [communityPart, setCommPart] = useState("Feed");
    const [scrollRight, setScrollRight] =useState(false);
    const [communityExists, setExists] = useState(true);
    const inputref = useRef();
    const rightColumnRef = useRef();
    let history = useHistory();
    const setCommunityPart = (str) =>{
        switch(str){
            case "Reports":
                //setCommPart("Reports");
                window.location.replace( "/community/"+ communityID + "/reports");
                break;
            case "Edit":
                //setCommPart("Edit");
                window.location.replace( "/community/"+ communityID + "/edit");
                break;
            case "Events":
                //setCommPart("Events");
                window.location.replace( "/community/"+ communityID + "/events");
                break;
            case "Polls":
                //setCommPart("Events");
                window.location.replace( "/community/"+ communityID + "/polls");
                break;
            case "Feed":
                //setCommPart("Feed");
                window.location.replace( "/community/"+ communityID);
                break;
            
            default:
        }
    }
    let urlSplitted = window.location.href.match(/[^\/]+/g);
    let communityID = urlSplitted[3];
    

    const [showEditModal, setEditShow] = useState(false);
    const edithandleClose = () => {setEditShow(false); setCommunityPart("Feed")}
    const edithandleShow = () => {setEditShow(true); console.log(showEditModal)};

    const [showPostModal, setPostShow] = useState(false);
    const handlePostClose = () => setPostShow(false);
    const handlePostShow = () => setPostShow(true);

    const [showPollModal, setPollShow] = useState(false);
    const handlePollClose = () => setPollShow(false);
    const handlePollShow = () => setPollShow(true);
    const [canHaveNewPoll, setCanHaveNewPoll] = useState(true);

    const triggerListPost = ()=>{ setTriggerPost(!triggerPost); console.log("set Trigger to" + triggerPost)}

    useEffect(async() => {
        if(urlSplitted.length>4){
            switch(urlSplitted[4]){
                case "reports":
                    setCommPart("Reports");
                    break;
                case "edit":
                    setCommPart("Edit");
                    edithandleShow();
                    break;
                case "events":
                    setCommPart("Events");
                    break;
                case "polls":
                        setCommPart("Polls");
                        break;
                default:
                    window.location.replace("/community/"+communityID);
            }
        }
        else{
            setCommPart("Feed");
        }
        let resOut = null;
        await fetch('http://localhost:8000/communities/' + communityID,
        {
            method : 'GET'
          })
            .then(
                res => {
                    setExists(res.status === 200)

                    return res.json()
                }
            ).then(
                res => {
                    if (res.photo === null) {
                        res.photo = "http://localhost:8000/media/defaultpic.jpg"
                    }else{
                        res.photo = ServerUrl + res.photo;
                    }
                    //console.log(res)
                    setProfile(res);
                    resOut = res;
                    console.log(resOut);
                    console.log(profile)
                }
            )
        //to check if user is joined or not
        SetUserState("notjoined");
        let username = localStorage.getItem("username");
        if (resOut.owner_name === username) {
            SetUserState("owner");
        } 
        else if(resOut.admin_name === username){
            SetUserState("admin");
        }
        else if(resOut.members_name !==undefined) {
            console.log(resOut.members_name);
            if(resOut.members_name.map(function (el) { return el.username; }).includes(username))
               {
                   SetUserState("user");
               }
            if(urlSplitted[4] === "reports" || urlSplitted[4] === "edit"){
                window.location.replace("/community/"+communityID);
            }
        }
        else
            if(urlSplitted[4] === "reports" || urlSplitted[4] === "edit" || urlSplitted[4] === "events"){
                window.location.replace("/community/"+communityID);
            }
        
        console.log(userState);
    }, [triggerCommunity])

    const fetchData = async () => {

        return await fetch('http://localhost:8000/join-community/?q=' + communityID,
            {
                method: 'PUT',
                headers: {
                    'Authorization': "Token " + localStorage.getItem('loginToken')
                }
            })
            .then(response => {
                if (response.status === 200) {
                    setJoinNotif("Successfully joined the community!");
                    SetUserState("user");
                }
                return response.json();
            })
            .then(data => {
                if (typeof data === 'string' || data instanceof String) {
                    setJoinNotif(data);
                    SetUserState("user");
                }
                else {
                    for (let key in data) {
                        console.log(data[key]);
                        switch (key) {
                            case "detail": setJoinNotif(data[key]);
                            default:

                        }
                    }
                }
            })
            .catch(error =>
                console.log(error)
            );
    }

    const joinButtonClicked = () => {
        if (!localStorage.getItem('loginToken')) {
            history.replace({ pathname: '/sign-in', state: { from: window.location.href.replace('http://localhost:3000', '') } })
        }
        else {
            fetchData();
        }
    }

    const joinedButtonClicked = () => {
        return fetch('http://localhost:8000/communities/' + communityID,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': "Token " + localStorage.getItem('loginToken')
                }
            })
            .then(response => {
                if (response.status === 204) {
                    if(userState === "owner"){
                        window.location.replace("/mycommunities");
                    }
                    SetUserState("notjoined")
                }
                return response.json();
            })
            .then(data => {
                    for (let key in data) {
                        console.log(data[key]);
                        switch (key) {
                            case "detail": setJoinNotif(data[key]);
                            default:

                        }
                    
                }
            })
            .catch(error =>
                console.log(error)
            );
        
    }

    function showMoreClicked(isExpanded) {
        document.getElementById("community-header").style.height = (document.getElementById("description").getBoundingClientRect().height + 190).toString() + "px";
    }

    function positionSidebar() {
        let sideElement = document.getElementById("sidebar");
        let top = inputref.current.getBoundingClientRect().top;
        let previousPos = sideElement.style.position;
        if (communityPart === "Feed" && top > 56) {
            if (previousPos !== "absolute") {
                sideElement.scrollTop = 0;
                if(window.innerWidth >= 768)
                {
                    let stickytop = document.getElementById("rightcontent");
                    stickytop.scrollTop = 0;
                }
                if(scrollRight){
                    setScrollRight(false);
                }
            }
        }
        else{
            if(!scrollRight){
                setScrollRight(true);
            }
        }
    }

    return (
        communityExists?
        <div onWheel={positionSidebar}>
            <DashboardNavbar />
            
            <div className="community-background">
            <Sidebar userState={userState} whichActive={communityPart} setCommunityPart={setCommunityPart} triggerPosition={positionSidebar} handleEditShow={edithandleShow}/>
            <div className="besidesidebar" >
                <div className="community-header" hidden={communityPart !== "Feed"} id="community-header" >
                    <div className="community-header-img" style={{ backgroundImage: "url(" + profile.photo + ")" ,backgroundPosition:"center"}} />
                    <div className="community-header-content">
                        <div className="first-line container-fluid">
                            <h1>{profile.name}</h1>
                            {userState == "notjoined" ?
                                <button className="join-button" onClick={joinButtonClicked}>Join</button>
                                : 
                                // <button className="joined-button" onClick={joinedButtonClicked}>Leave</button>
                                    <Dropdown className="joined-dropdown">
                                        <MoreVertIcon type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color:"white",fontSize:"30px", marginTop:"-9px"}}/>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            {userState == "owner"?
                                            <><Dropdown.Item onClick={() => setCommunityPart("Edit")}>Edit</Dropdown.Item>
                                            {canHaveNewPoll && <Dropdown.Item onClick={() => handlePollShow()}>New admin poll</Dropdown.Item>}
                                            </>: null}
                                            <Dropdown.Item onClick={() => joinedButtonClicked()}>{userState === "owner"? "Delete Community & Leave" : "Leave"}</Dropdown.Item>

                                        </div>
                                    </Dropdown> 
                                }
                        </div>
                        <h3>@{profile.communityID}</h3>
                        <div id="description">
                            {!!profile.description && <ShowMoreText
                                lines={2}
                                more='Show more'
                                less='Show less'
                                className='content-css'
                                anchorClass='my-anchor-css-class'
                                onClick={showMoreClicked}
                                expanded={false}
                                style={{whiteSpace: "pre-wrap"}}
                                keepNewLines = {true}
                            >
                                {profile.description}
                            </ShowMoreText>}
                        </div>
                    </div>
                </div>
                

                <Tabs userState={userState} whichActive={communityPart} setCommunityPart={setCommunityPart} triggerPosition={positionSidebar} handleEditShow={edithandleShow} onEdit={showEditModal} setScrollRight={setScrollRight}/>
                
                    <div className=" flexbox-container container-fluid row " ref={inputref} >

                        <div id="rightcontent" className=" col-12 col-md-4 order-md-3 paddingbottom right-content sticky-top" ref={rightColumnRef} style={{overflowY: scrollRight? "scroll": "hidden"}}>
                        <div className="justify-content-center row" style={{width:"100%", margin:"0"}}>
                            <div style={{width:"90%",maxWidth:"80vh"}}>
                                    {/* <div className="piece" style={{ height: "auto", backgroundColor: "white", borderColor: "black" }}> */}
                                    {userState !== "notjoined" ? <Vote communityID={communityID} setCanHaveNewPoll={setCanHaveNewPoll} /> : null}
                                    {/* </div> */}
                                
                        {userState !== "notjoined" && <div className="piece">
                                <div className="piece-title btn" onClick={() => { setShowPiece({ ...showPiece, calendar: !showPiece.calendar }) }} style={{ width: "100%", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                                    <p style={{ margin: "2px 0 0 0", color: "#576777", fontWeight: "bold", fontSize: "20px", display: "inline-block" }}>Calendar</p>
                                   </div>
                                <div className="fade_rule" hidden={showPiece.calendar}></div>
                                <div className="piece-inside" hidden={showPiece.calendar}>

                                    <div className="piece" style={{ height: "80vh", backgroundColor: "white", border:"none"}}>
                                     <ShowCalendar communityID={communityID}/> 
                                    </div>
                                </div>

                            </div>}
                            {/* <div className="piece">
                                <div className="piece-title btn" onClick={() => { setShowPiece({ ...showPiece, rules: !showPiece.rules }) }} style={{ width: "100%", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                                    <p style={{ margin: "2px 0 0 0", color: "#576777", fontWeight: "bold", fontSize: "20px", display: "inline-block" }}>Rules & Guidelines</p>

                                    <MoreVertIcon className="btn" style={{ color: "#33ABA3", display: "inline-block", marginTop: "5px", float: "right", position: "absolute", right: "30px", zIndex: "2" }} />
                                </div>
                                <div className="fade_rule" hidden={showPiece.rules}></div>
                                <div className="piece-inside" hidden={showPiece.rules}>

                                    <div className="piece" style={{ height: "300px", backgroundColor: "white"}}>
                                    </div>
                                </div>
                            </div> */}
                            <div className="piece">
                                <div className="piece-title btn" onClick={() => { setShowPiece({ ...showPiece, online: !showPiece.online }) }} style={{ width: "100%", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                                    <p style={{ margin: "2px 0 0 0", color: "#576777", fontWeight: "bold", fontSize: "20px", display: "inline-block" }}>Members</p>

                                    <MoreVertIcon className="btn" style={{ color: "#33ABA3", display: "inline-block", marginTop: "5px", float: "right", position: "absolute", right: "30px", zIndex: "2" }} />
                                   </div>
                                <div className="fade_rule" hidden={showPiece.online}></div>
                                <div className="piece-inside" hidden={showPiece.online}>

                                    <div className="piece" style={{ height: "300px", backgroundColor: "white"}}>
                                        <ul className="memberslist">
                                            {profile?.members_name?.map((d)=>{
                                                if(d.username) 
                                                return(
                                                <div style={{width:"100%", padding:"5px 10px", color:"#576777", overflow:"hidden", borderTop:"1px solid #e3e3e3"}}>
                                                    <p style={{fontSize:"18px", display:"inline", marginBottom:"0"}}>{d.username}</p>
                                                    <p style={{marginLeft:"5px",fontSize:"15px", display:"inline-block", marginBottom:"0",float:"right", color:"#33aba3"}}>{profile.owner_name === d.username? "owner": profile.admin_name?.includes(d.username)? "admin": ""}</p>
                                                </div>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-8 order-md-1 paddingbottom">
                        {showPollModal && <CreateAdminPoll communityID={communityID} showModal={showPollModal} handleClose={handlePollClose} setTriggerCommunity={setTriggerCommunity} />}
                            {communityPart === "Feed" ?
                                <>
                                    
                                    {showPostModal && <CreatePost communityID={communityID} showModal={showPostModal} handleClose={handlePostClose} triggerListPost={triggerListPost} />}
                                    <div style={{ position: "relative" }} >
                                        <ListPost userState={userState} communityID={communityID} triggerPost={triggerPost} />

                                        {userState !== "notjoined" ? <div style={{ float: "right", width: "135px" }}><div style={{ position: "fixed", width: "135px", bottom: "10px", zIndex: "10" }}><div onClick={handlePostShow} className="btn post-button" ><AddIcon style={{ fontSize: "45px", marginBottom: "2px", marginLeft: "-4px" }} /></div>
                                            <p className="post-button-text">Post</p></div></div> : null}
                                    </div>
                                </>
                            : communityPart === "Reports" ?
                                <ReportList communityID={communityID} />
                            : communityPart === "Edit" ?
                                <Popup communityID={communityID} handleClose={edithandleClose} showModal={showEditModal} handleShow={edithandleShow} triggerCommunity={triggerCommunity} setTriggerCommunity={setTriggerCommunity} />
                            : communityPart === "Events" ?
                                <>
                                    <Showevent communityID={communityID} />
                                    {userState === "owner" || userState === "admin" ? <div style={{ float: "right", width: "210px" }}><div style={{ position: "fixed", width: "210px", bottom: "10px", zIndex: "10" }}><a href={"/createEvent/" + communityID}><div className="btn post-button" ><AddIcon style={{ fontSize: "45px", marginBottom: "2px", marginLeft:"-4px" }} /></div></a>
                                        <p className="post-button-text">Add Event</p></div></div> : null}
                                </>
                            : communityPart === "Polls" ?
                                <div><p style={{ textAlign: 'center', paddingTop: "15px",width:"100%" }}>
                                <b>Nothing here</b>
                              </p></div>
                            :
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>:
        <div className="exceptional-page">
        <h3>This community does not exist...</h3>
        </div>
    )
}

export default CommunityPage;
