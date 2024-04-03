// import { TimerOutlined } from "@material-ui/icons";
// import { useState, useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
 import "./ProfileUser.css";
// import EditIcon from '@material-ui/icons/Edit';
// import Sidebar from './communitySide'
//import DashboardNavbar from './DashboardNavbar.js'
//---------------------------------------------------------------
import React from "react";
import {Modal} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import { Toast, Button, Form, FormGroup, Label, Input, FormText } from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/ModalHeader'
import "./ProfileUser.css";
import EditIcon from '@material-ui/icons/Edit';
import Sidebar from './communitySide'
import DashboardNavbar from './DashboardNavbar.js'


function ProfileUser(props) {

    const [profile, SetPrpfile] = useState([]);
    console.log("pppp",profile[0]);
    const[username,SetUsername]=useState("");
    //const[pass,SetPass]=useState("");
    const[email,SetEmail]=useState("");
    const[idProfile,SetId]=useState("");

    useEffect(() => {
        var myheaders = new Headers();
        myheaders.append("Authorization", "Token " + localStorage.getItem('loginToken'));

        fetch("http://localhost:8000/users/profile",{
            method : 'GET',
            headers: myheaders
          })
          .then((res)=>{
              if(res.status===200){
              return res.json()
              }
              else console.log("response status:" , res.status)
          })
          .then((data) => {
              console.log("data", data)
              for(var key in data){
                  switch (key){
                      case "files":
                        console.log("files",data[key])
                        break;

                    case "urls":
                        console.log("url",data[key])
                        SetPrpfile(data[key])
                        break;

                      case "user_name":
                          SetUsername(data[key])
                          break;

                        // case "pass_word":
                        //     SetPass(data[key])
                        //     break;

                        case "email":
                            SetEmail(data[key])
                            break;

                            case "id":
                                SetId(data[key])
                                break;

                        default:
                             break;
                  }
              }
            })
        },[]);

    //     return(
    //         <>
    //          <DashboardNavbar />
    //         <Sidebar isDashboard={false}/>
    //     <div className="backgroundPro" style={{ backgroundImage: "url(https://image.kpopmap.com/2020/01/Baekhyun-exo-42906691-1280-1920.jpg)", backgroundPosition: "center", backgroundSize: "cover" }}>
    //         <div className="profile" style={{ backgroundImage: "url(https://image.kpopmap.com/2020/01/Baekhyun-exo-42906691-1280-1920.jpg)", backgroundPosition: "center", backgroundSize: "cover", border: "ridge" }}></div>
    //         <div className="content" >
    //             <div class="row">
    //                 <div className="User">username:</div>
    //                 <div className="text">{username}</div>
    //             </div>
    //             {/* <div class="row">
    //                 <div className="Pass" >Password:</div>
    //                 <div className="text" >googooly</div>
    //             </div> */}
    //             <div class="row">
    //                 <div className="Email" >Email:</div>
    //                 <div className="text" >{email}</div>
    //             </div>
    //         </div>
    //     </div> 
    //     </>
    //     )

    //------------------------------------------------------
    return (
        <Modal
            // {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.show}
            onHide={props.handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title  className="header" id="contained-modal-title-vcenter" >
                    Profile
                    </Modal.Title>
            </Modal.Header>

            <Modal.Body className="show-grid">
                <div className="profile" style={{ backgroundImage: "url("+profile[0]+")", backgroundPosition: "center", backgroundSize: "cover", border: "ridge" ,height:"300px"}}></div>
                <div className="content" >
                 <div class="row">
                     <div className="User">username:</div>
                     <div className="text">{username}</div>
                 </div>
                 {/* <div class="row">
                     <div className="Pass" >Password:</div>
                     <div className="text" >{pass}</div>
                 </div> */}
                 <div class="row">
                     <div className="Email" >Email:</div>
                     <div className="text" >{email}</div>
                 </div>
             </div>
                {/* <div class="container" style={{backgroundColor:"chocolate" }} > */}
                        {/* <div class="col-lg-6" style={{backgroundColor:"black" }}> */}
                            {/* <div className="profile" style={{ backgroundImage: "url(https://image.kpopmap.com/2020/01/Baekhyun-exo-42906691-1280-1920.jpg)", backgroundPosition: "center", backgroundSize: "cover", border: "ridge" }}></div> */}
                        {/* </div> */}
                        {/* <div class="col-xl-2" style={{backgroundColor:"pink" ,height:"200px"}}>
                            .col-xs-6 .col-md-4
                        </div> */}
                        {/* <div class="col-lg-5" style={{backgroundColor:"red"}}>
                            .col-xs-6 .col-md-4
                        </div> */}
                {/* </div> */}
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.handleClose}> Edit...</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default ProfileUser;