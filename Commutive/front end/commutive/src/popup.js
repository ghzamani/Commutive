import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import ModalBody from 'react-bootstrap/ModalBody';

const { default: CreatePost, default: MainForm } = require("./mainForm");
function Popup(props) {
  // const [showModal, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "150vh"  }}
      >
        {/* <Button variant="" onClick={handleShow}>
          edit
        </Button> */}
      </div>
      <Modal show={props.showModal} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Community</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        <MainForm communityID={props.communityID} triggerCommunity={props.triggerCommunity} setTriggerCommunity={props.setTriggerCommunity}/>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="primary" onClick={props.handleClose}>
            Close
          </Button>
        
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default Popup;