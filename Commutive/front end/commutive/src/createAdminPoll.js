import { Button } from "bootstrap";
import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import './adminVotingSystem.css'

function CreateAdminPoll(props){
    const create = ()=>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token " + localStorage.getItem('loginToken'));
        let requestOptions = {
            method: 'POST',
            headers: myHeaders
          };
          
           fetch("http://localhost:8000/communities/" + props.communityID + "/polls", requestOptions)
               .then( (response) => {
  
                 if (response.status === 201) {
                    props.setTriggerCommunity();
                    props.handleClose();
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
          <Modal.Title>New Admin Poll</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
            <div className="adminPoll">
                    <p>Are you sure you want to create a new poll?</p>
                    <p>This poll automatically selects at most 5 of the most active members of the community.
                        Members can vote for the next 5 days, then the new admins will be set.
                    </p>
                    <div className="justify-content-center" style={{ width: "100%", display: "flex" }}>
                    <div className="btn vote-button" onClick={()=> create()}>Create an admin poll!</div>
                </div>
            </div>
        </Modal.Body>
      
      </Modal>
      </div>
    )
}

export default CreateAdminPoll;