
import {toast} from 'react-toastify';
import { useEffect ,useState} from "react";
import { Row, Col ,Button} from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast'
import { render } from '@testing-library/react';
import React from "react";
import { MDBNotification,MDBContainer } from "mdbreact";
import { Text,style,View} from 'react'
import NotificationsIcon from '@material-ui/icons/Notifications';
//import { MDBBadge, MDBContainer, MDBBtn } from "mdbreact";
import AddAlarmIcon from '@material-ui/icons/AddAlarm';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import DashboardNavbar from './DashboardNavbar.js'
import Sidebar from './communitySide'

function Notification(){
    const [oldData, setOldData] = useState([{}]);
    const [newData, setNewData] = useState([{}]);
    const [count, setCount] = useState();
  
    const makeNotif = (d) =>{
      let str = d.text.split("\n");
      let message;
      let goto = null;
      let person, communityID, postID;
      switch(str[0].replace('type: ',''))
      {
        case "like post":
          person = str[3].replace('likedby: ', '');
          communityID = str[2].replace('communityID: ', '');
          postID = str[1].replace('post id: ','');
          message = person + " liked your post in " + communityID + ".";
          goto = "/community/"+communityID+"/post/"+postID;
          break;
        case "comment":
          person = str[3].replace('commentedby: ', '');
          communityID = str[2].replace('communityID: ', '');
          postID = str[1].replace('post id: ','');
          message = person + " commented on your post in " + communityID + ".";
          goto = "/community/"+communityID+"/post/"+postID;
          break;
        case "like reply":
          person = str[5].replace('likedby: ', '');
          communityID = str[4].replace('communityID: ', '');
          postID = str[3].replace('post id: ','');
          message = person + " liked your reply on a post in " + communityID + ".";
          goto = "/community/"+communityID+"/post/"+postID;
          break;
        case "like comment":
          person = str[4].replace('likedby: ', '');
          communityID = str[3].replace('communityID: ', '');
          postID = str[2].replace('post id: ','');
          message = person + " liked your comment on a post in " + communityID + ".";
          goto = "/community/"+communityID+"/post/"+postID;
          break;
        case "reply":
            person = str[2].replace('replyby: ', '');
            communityID = str[4].replace('communityID: ', '');
            postID = str[3].replace('post id: ','');
            message = person + " replied your comment on a post in " + communityID + ".";
            goto = "/community/"+communityID+"/post/"+postID;
            break;
        case "delete post because of multiple reports":
          communityID = str[2].replace('communityID: ', '');
          message = "Your post in "  + communityID + " was reported and has been deleted by curators.";
          break;
        default:
          message = d.text;
      }
      return {text: message, id: d.id, goto:goto};
    }

useEffect(async () => {
    console.log('im heree');
    let users = localStorage.getItem("username");

    fetch("http://localhost:8000/users/new-notifications" , {
      method: 'GET',
      headers: {
        "Authorization": "Token " + localStorage.getItem('loginToken')
      }
    })
    
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        }
        if (res.status === 401) {
          window.location.replace("/sign-in")
        }
        return {};
      }
      )
      .then((data) => {
        setNewData(data.map(d=> makeNotif(d)).reverse());
        });

    fetch("http://localhost:8000/users/notifications" , {
      method: 'GET',
      headers: {
        "Authorization": "Token " + localStorage.getItem('loginToken')
      }
    })
    
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        }
        if (res.status === 401) {
          window.location.replace("/sign-in")
        }
        return {};
      }
      )
      .then((data) => {
        setOldData(data.filter((d)=> !newData.includes(d.id) ).map(d=> makeNotif(d)).reverse());
         console.log(data);
        });
  }, []);

//   useEffect(async () => {
//   console.log('im heree');
//   let users = localStorage.getItem("username");

//   fetch("http://localhost:8000/users/notifications/counts" , {
//     method: 'GET',
//     headers: {
//       "Authorization": "Token " + localStorage.getItem('loginToken')
//     }
//   })
//     .then((res) => {
//       if (res.status === 200) {
//         return res.json()
//       }
//       if (res.status === 401) {
//         window.location.replace("/sign-in")
//       }
//       return {};
//     }
//     )
//     .then((oldData) => {setCount(oldData); console.log(oldData)});
// }, []);
 
//   return(
//     <div className="justify-content-center" style={{ width: "100%", display: "flex" }}>       


    // const BadgePage = () => {
    //     return (
    //       <MDBContainer>
    //         <MDBBtn color="primary">
    //           Notifications <MDBBadge color="danger" className="ml-2">4</MDBBadge>
    //         </MDBBtn>
    //       </MDBContainer>
    //     );
    //   };
   return(
     <div>
       <DashboardNavbar isNotification={true}/>
       <Sidebar isDashboard={false} isNotification={true}/>
       <div className="notifications" style={{display:"flex", justifyContent:"center", marginTop:"30px"}}>
       {/* <MDBContainer
        style={{
          width: "auto",
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: 9999
        }}
      > */}
      <ul style={{width:"80%"}}>
        <h4>New Notifs</h4>
        <hr/>
        {newData.length === 0?
        <p style={{color:"#576777", fontSize:"17px"}}> No new notifs</p>
        :
       newData.map((d) => {
      if (d) return (
        <div style={{border:"1px solid #e3e3e3", padding:"10px 10px",borderRadius:"5px", marginBottom:"10px", overflow:"hidden"}}>
        <div style={{}}>
          <p style={{display:"inline"}}>{d.text}</p>
          {!!d.goto?
          <div style={{display:"inline-block", float:"right"}}>
          <a href={d.goto} >See post</a>
          </div>
          :
          null
          }
          </div>
        </div>
      // <MDBNotification
      //   show
      //   fade
      //   icon="envelope"
      //   iconClassName="green-text"
      //   title="New Message"
      //   message={d.text}
      //   text=""
        
      // />
      )})}
       {/* </MDBContainer> */}

       {/* <MDBContainer
        style={{
          width: "auto",
          height: "auto"
        }}
      > */}
      <div style={{paddingTop:"20px"}}>
      <h4>Older notifs</h4>
        <hr/>
        {oldData.length === 0?
        <p style={{color:"#576777", fontSize:"17px"}}> No notifs</p>
        :
        oldData.map((d) => {
      if (d) return (
  
       <>
       {/* <div className={!!d.goto?"a":""} href={d.goto}>
      <MDBNotification
        show
        fade
        icon="envelope"
        iconClassName="green-text"
        title="New Message"
        message={d.text}
        text=""
        
      />
      </div> */}
      <div style={{border:"1px solid #e3e3e3", padding:"10px 10px",borderRadius:"5px", marginBottom:"10px", overflow:"hidden"}}>
        <div style={{}}>
          <p style={{display:"inline"}}>{d.text}</p>
          {!!d.goto?
          <div style={{display:"inline-block", float:"right"}}>
          <a href={d.goto} >See post</a>
          </div>
          :
          null
          }
          </div>
        </div>
        </>
      )})}
      </div>
      </ul>
      {/* </MDBContainer> */}
      </div>
{/*       
          <Badge badgeContent={count} color="primary">
        <NotificationsIcon />
      </Badge> */}
      </div>
    
    );}

export default Notification;