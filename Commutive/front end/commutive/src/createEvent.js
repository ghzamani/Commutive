import React, { Component } from "react";
import { useState } from "react";
import { Toast, Button, Form, FormGroup, Label, Input, FormText } from 'react-bootstrap';
import { Link, Redirect, withRouter, useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row'
import './photoEvent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from "react-bootstrap";
import UploadImg from './uploadImg';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import {FormControl} from 'react-bootstrap'

import EventCalendar from './eventCalendar'
 import PhotoEvent from './photoEvent'
 import "./photoEvent.css"



function CreateEvent(props) {

    const [errors, setErrors] = useState({});
    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState("");
     const[startDate,setstartDate]=useState("");
     const[endDate,setendDate]=useState("");
    const [titleErr, setTitleErr] = useState("")
    const [timeErr, setTimeErr] = useState("")
    const [openToast, SetToastState] = useState(false)


    const [showModal, setShow] = useState(false);
    let urlSplitted = window.location.href.match(/[^\/]+/g);
    let communityID = urlSplitted[urlSplitted.length - 1];
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    
   

    function validatetitle(newValue) {
        setTitle(newValue);
        let userError = ""
        if (newValue.length === 0) {
            userError = "Please Enter a title.";
        }
        setTitleErr(userError)
    }


    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }


    const ErrorsOnSubmit = async () => {
        console.log("i'm in submit")
        setTimeErr("")
        validatetitle(title)
        // validateIDcommunity(communityID)
        if (Boolean(titleErr) )
            return;


        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token " + localStorage.getItem('loginToken'));

        
        let fd = new FormData();
        fd.append("photo", photo)
       
        fd.append('title', title);
        fd.append('description', description);
        fd.append('startDate', startDate);
        fd.append('endDate', endDate);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: fd,
        };


        fetch('http://localhost:8000/communities/'+communityID+'/events', requestOptions)
            .then(async (response) => {
                console.log('status', response.status)

                if (response.status === 201) {
                   
                    SetToastState(true)
                    await timeout(4000)
                    SetToastState(false)
                    window.location.replace("/community/"+communityID)
                   

                }
                {console.log({startDate})}

                return response.json()
            }).then(rep => {
                for (let key in rep) {
                    switch (key) {
                        case "title":
                            setTitleErr(rep[key]);
                            break;
                        case "startDate":
                            setTimeErr("Choose the time of the event.")
                            break;
                        default:
                            console.log(rep[key])

                    }

                } 
            })
            
            .catch(error => {
                console.log('error', error)
            });
         
    }




    return (
        <div className="background photoEvent">
            
        <div className="createcommunity container" style={{display:"flex"}}>
        <PhotoEvent profileImg={photo} setProfileImg={setPhoto} />


            <Form onSubmit={(e) => { e.preventDefault(); ErrorsOnSubmit(); }}>
                <Form.Group controlId="title">
                    <label>Title</label>
                    <Form.Control type="text" placeholder="Enter title" onKeyPress={(e) => { e.key === 'Enter' && validatetitle(e.target.value) }} onBlur={(e) => validatetitle(e.target.value)} isInvalid={Boolean(titleErr)} />
                    <Form.Control.Feedback type="invalid">{titleErr}</Form.Control.Feedback>
                </Form.Group>

                {/* <Form.Group controlId="communityID">
                    <label>CommunityID</label>
                    <Form.Control type="text" placeholder="Enter communityID" onKeyPress={(e) => { e.key === 'Enter' && validateIDcommunity(e.target.value) }} onBlur={(e) => validateIDcommunity(e.target.value)} isInvalid={Boolean(IDcommunityErr)} />
                    <Form.Control.Feedback type="invalid">{IDcommunityErr}</Form.Control.Feedback>
                </Form.Group> */}
                 <FormGroup >
                <label>Date</label>
                <EventCalendar  start={startDate} setStart={setstartDate}  end={endDate} setEnd={setendDate}  />
                <div style={{color:"#dc3545",fontSize: "80%", marginTop: ".25rem" }}>{timeErr}</div>
                </FormGroup>

                <Form.Group controlId="description">
                    <label>Description</label>
                    <Form.Control type="text" as="textarea" rows={3} placeholder="description" onChange={(e) => setDescription(e.target.value)} isInvalid={Boolean(errors.description)} />
                    {/* <Form.Control.Feedback type="invalid">{}</Form.Control.Feedback> */}
                </Form.Group>
                {/* < Link  to ={{pathname:"/community/" + idcommunity}}> Create</Link> */}

               
                <Form.Group>
                    <Button style={{backgroundColor:"#33aba3"}} type="submit" variant="success">CreateEvent</Button>{''}
                    {/* <button type="submit" className="button" >CreateCommunity</button> */}
                </Form.Group>
            </Form>
            
        </div>
        <div className="aroundToast">
            <Toast show={openToast} transition={null} style={{ textAlign:"center" , fontWeight: "bold" , fontSize:"20px" , backgroundColor:"white"}}>
                <Toast.Body style={{ color: "#576777"}} >event is successfully created!</Toast.Body>
            </Toast>
            </div>
        </div>
    );

}


export default withRouter(CreateEvent);



    
  



