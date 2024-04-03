import { Button } from "bootstrap";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";

function DeletePost(props){
    const create = ()=>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token " + localStorage.getItem('loginToken'));
        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders
          };
          
           fetch("http://localhost:8000/communities/" + props.communityID + "/posts/" + props.postID, requestOptions)
               .then( (response) => {
  
                 if (response.status === 204) {
                    props.handleClose();
                    window.location.reload();
                  }
             })
            .catch(error => {
                  console.log('error', error)
              });
    }
    return (
        <div>
        <Modal show={props.showModal} onHide={props.handleClose} style={{display:"flex"}}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
            <div className="adminPoll">
                    <p>Are you sure you want to delete this post?</p>
                    <p>This can't be undone.
                    </p>
                    <div className="justify-content-center" style={{ width: "100%", display: "flex" }}>
                    <div className="btn vote-button" onClick={()=> create()}>Delete</div>
                </div>
            </div>
        </Modal.Body>
      
      </Modal>
      </div>
    )
}

export default DeletePost;