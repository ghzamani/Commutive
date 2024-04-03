import React, { Component } from "react";
import { useState } from "react";
import { Toast, Button, Form, FormGroup, Label, Input, FormText } from 'react-bootstrap';
import { Link, Redirect, withRouter, useHistory } from 'react-router-dom';
import {Row ,Col} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import AddPost from "./addPost";
// import { Grid } from "@material-ui/core";
import './Post.css';

import { Modal } from "react-bootstrap";
// import ModalBody from 'react-bootstrap/ModalBody';

// const { default: CreatePost } = require("./CreatePost");

  

function CreatePost(props) {

    const [errors, setErrors] = useState({});
    const [caption, setCaption] = useState("");
    const [myFile, setMyFile] = useState([]);
    const [communityErr, setCommunityErr] = useState("")
    const [openToast, SetToastState] = useState(false)

    // function validatename(newValue) {
    //     setName(newValue);
    //     let userError = ""
    //     if (newValue.length === 0) {
    //         userError = "Please Enter a communityName.";
    //     }
    //     setNameErr(userError)
    // }
    // function validateIDcommunity(newValue) {
    //     setIdcommunity(newValue);
    //     let userError = ""
    //     if (newValue.length === 0) {
    //         userError = "Please Enter a unique communityID.";
    //     }
    //     setIDcommunityErr(userError)
    // }




    // function timeout(delay) {
    //     return new Promise(res => setTimeout(res, delay));
    // }



    // const ErrorsOnSubmit = async () => {

    //     validatename(name)
    //     validateIDcommunity(communityID)
    //     if (Boolean(nameErr) || Boolean(IDcommunityErr))
    //         return;

      var submitPost= async() => {
        let fileIDs = []
       var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token " + localStorage.getItem('loginToken'));

        for(let i = 0; i< myFile.length; i++){
          console.log("file is" + myFile[i])
          let fd = new FormData();
          fd.append('uploaded_file', myFile[i]);
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: fd,
            redirect: 'follow'
          };
          await fetch("http://localhost:8000/upload-file", requestOptions)
          .then(response => 
            {
              console.log("file " + i + "'s status: " + response.status);
              if(response.status === 201){
                  return response.json()
              }
              //it wasn't successfull!
              i--;
              return {}
            })
          .then(result => 
            {
              console.log(result.id)
              if(result.id)
                fileIDs.push(result.id);
            })
          .catch(error => console.log('error', error));
        }
        console.log("fileIDs are"+ fileIDs.toString())
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("caption", caption);
        for (let i = 0; i< fileIDs.length; i++){
          urlencoded.append("files", fileIDs[i].toString());
        }

        requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        
         fetch("http://localhost:8000/communities/" + props.communityID + "/posts/", requestOptions)
             .then( (response) => {
               console.log('status', response.status)

               if (response.status === 201) {
                   
    //                 SetToastState(true)
    //                 await timeout(4000)
                    //   handleClose();
                    //  window.location.replace("/community/sega")
    //                 SetToastState(false)
                  props.triggerListPost();
                  props.handleClose();
                }

                 return response.json()
           }).then(rep => {

              //  for (let key in rep) {

                //   switch (key) {
                //      case "Community Not found":
                //             setCommunityErr(rep[key]);
                //          break;

                //         // case "communityID":
                //         //     setIDcommunityErr(rep[key]);
                //         //     break;

                //         default:
                //             console.log(rep[key])

                //     }

                //  }

           })
          .catch(error => {
                console.log('error', error)
            });
          }
     



    return (
        <>
      {/* <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "150vh"  }}
      >
        <Button variant="primary" onClick={handleShow}>
          Post
        </Button>
      </div> */}
      <Modal show={props.showModal} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create post</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        <div className="main-post">
            {/* <div className="uipost"> */}
            <Form onSubmit={(e) => { e.preventDefault();  }}>
            
            <AddPost files={myFile} setFiles={setMyFile} />
                <Form.Group controlId="caotion">
              
                    <Form.Control type="text" as="textarea" rows={3} className= "main-text" placeholder="caption" onChange={(e) => setCaption(e.target.value)} isInvalid={Boolean(errors.description)} />
                    {/* <Form.Control.Feedback type="invalid">{}</Form.Control.Feedback> */}
                </Form.Group>
              
                <Form.Group>
                    {/* <Button type="submit" variant="success"  className="main-button"> Post</Button>{''} */}
                     {/* <button type="submit" className="buttonp" >post</button> */}
                
        <Modal.Footer>
          <Button variant="success" style={{backgroundColor:"#33aba3"}} onClick={props.handleClose}>
            Close
          </Button>
          <Button type="submit" variant="success" style={{backgroundColor:"#33aba3"}} onClick={() =>submitPost()}>
            Post
          </Button>
        </Modal.Footer>
        </Form.Group>
            </Form>
        </div>
        </Modal.Body>
      
      </Modal>
    </>
  );
}

export default withRouter(CreatePost);
