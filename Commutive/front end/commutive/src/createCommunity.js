import React, { Component } from "react";
import { useState } from "react";
import { Toast, Button, Form, FormGroup, Label, Input, FormText } from 'react-bootstrap';
import { Link, Redirect, withRouter, useHistory } from 'react-router-dom';
import './createCommunity.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UploadImg from './uploadImg';


function Createcommunity(e) {

    const [errors, setErrors] = useState({});
    const [name, setName] = useState("");
    const [communityID, setIdcommunity] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState("");



    const [nameErr, setNameErr] = useState("")
    const [IDcommunityErr, setIDcommunityErr] = useState("")
    const [descriptionErr, setDescriptionErr] = useState("")
    const [openToast, SetToastState] = useState(false)



    function validatename(newValue) {
        setName(newValue);
        let userError = ""
        if (newValue.length === 0) {
            userError = "Please Enter a communityName.";
        }
        setNameErr(userError)
    }
    function validateIDcommunity(newValue) {
        setIdcommunity(newValue);
        let userError = ""
        if (newValue.length === 0) {
            userError = "Please Enter a unique communityID.";
        }
        setIDcommunityErr(userError)
    }




    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }



    const ErrorsOnSubmit = async () => {

        validatename(name)
        validateIDcommunity(communityID)
        if (Boolean(nameErr) || Boolean(IDcommunityErr))
            return;



        var myHeaders = new Headers();


        //myHeaders.append("Content-Type", "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW");
        //myHeaders.append("Content-Type", "application/json");
        // myHeaders.append('Access-Control-Allow-Origin', '*');
        // myHeaders.append("Access-Control-Allow-Headers", "*");
        // myHeaders.append('Accept', 'application/json');
        //myHeaders.append("respons","image/jpeg")
        myHeaders.append("Authorization", "Token " + localStorage.getItem('loginToken'));

        var UserCourse = {}
        UserCourse.name = name
        UserCourse.communityID = communityID
        UserCourse.description = description
        UserCourse.photo = photo




        var raw = JSON.stringify(UserCourse);
        let fd = new FormData();
        fd.append("photo", photo)
        fd.append('name', name);
        fd.append('communityID', communityID);
        fd.append('description', description);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: fd,
        };


        fetch('http://127.0.0.1:8000/create-community/', requestOptions)
            .then(async (response) => {
                console.log('status', response.status)

                if (response.status === 201) {
                   
                    SetToastState(true)
                    await timeout(4000)
                    window.location.replace("/community/" + communityID)
                    SetToastState(false)
                }

                return response.json()
            }).then(rep => {
                for (let key in rep) {

                    switch (key) {
                        case "name":
                            setNameErr(rep[key]);
                            break;

                        case "communityID":
                            setIDcommunityErr(rep[key]);
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
        <div className="background">
            
        <div className="createcommunity"> {/* container*/}
            

        <div className=" flexbox-container row justify-content-center" style={{margin:"0"}} >
        <div className="col-12 col-md-6 col-lg-6 order-md-3">
        <div className="row justify-content-center" style={{margin:"0", display:"flex"}} >
            <UploadImg profileImg={photo} setProfileImg={setPhoto} />
            </div>
            </div>
        <div className="col-12 col-md-6 col-lg-6 order-md-1 formmm">
            <Form onSubmit={(e) => { e.preventDefault(); ErrorsOnSubmit(); }}>
            
                <Form.Group controlId="name">
                    <label>CommunityName</label>
                    <Form.Control type="text" placeholder="Enter communityName" onKeyPress={(e) => { e.key === 'Enter' && validatename(e.target.value) }} onBlur={(e) => validatename(e.target.value)} isInvalid={Boolean(nameErr)} />
                    <Form.Control.Feedback type="invalid">{nameErr}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="communityID">
                    <label>CommunityID</label>
                    <Form.Control type="text" placeholder="Enter communityID" onKeyPress={(e) => { e.key === 'Enter' && validateIDcommunity(e.target.value) }} onBlur={(e) => validateIDcommunity(e.target.value)} isInvalid={Boolean(IDcommunityErr)} />
                    <Form.Control.Feedback type="invalid">{IDcommunityErr}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="description">
                    <label>Description</label>
                    <Form.Control type="text" as="textarea" rows={3} placeholder="description" onChange={(e) => setDescription(e.target.value)} isInvalid={Boolean(errors.description)} />
                    {/* <Form.Control.Feedback type="invalid">{}</Form.Control.Feedback> */}
                </Form.Group>
                {/* < Link  to ={{pathname:"/community/" + idcommunity}}> Create</Link> */}

                {/* <Form.Group>
                            <label>Filed</label>
                            {['checkbox'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check inline label="Actor" type={type} id={`inline-${type}-1`} />
                                    <Form.Check inline label="Anime" type={type} id={`inline-${type}-2`} />
                                    <Form.Check inline label="Art" type={type} id={`inline-${type}-2`} />
                                    <Form.Check inline label="Astronomy" type={type} id={`inline-${type}-2`} />
                                    <Form.Check inline label="Beauty" type={type} id={`inline-${type}-2`} />
                                    <Form.Check inline label="Book" type={type} id={`inline-${type}-2`} />
                                    <Form.Check inline label="Celebrities" type={type} id={`inline-${type}-2`} />
                                    <Form.Check inline label="Comic" type={type} id={`inline-${type}-2`} />
                                    <Form.Check inline label="Game" type={type} id={`inline-${type}-2`} />
                                    <Form.Check inline label="History" type={type} id={`inline-${type}-2`} />
                                    <Form.Check inline label="Medicine" type={type} id={`inline-${type}-2`} />
                                    <Form.Check inline label="Movie" type={type} id={`inline-${type}-2`} />
                                    <Form.Check inline label="Music" type={type} id={`inline-${type}-2`} />
                                    <Form.Check inline label="Painting" type={type} id={`inline-${type}-2`} />
                                    <Form.Check inline label="Sport" type={type} id={`inline-${type}-2`} />
                                    <Form.Check inline label="Others" type={type} id={`inline-${type}-2`} />
                                </div>
                            ))}
                        </Form.Group> */}
                
            </Form>
            </div>
            
        </div>
        <Form.Group>
        <div className="row justify-content-center" style={{margin:"0", display:"flex"}} >
                    <Button type="submit" variant="success" onClick={()=>ErrorsOnSubmit()} style={{backgroundColor:"#33aba3", border:"none", width:"50vw"}}>CreateCommunity</Button>{''}
                    {/* <button type="submit" className="button" >CreateCommunity</button> */}
                </div>
                </Form.Group>
        </div>
        <div className="aroundToast">
            <Toast show={openToast} transition={null} style={{ textAlign:"center" , fontWeight: "bold" , fontSize:"20px" , backgroundColor:"white"}}>
                <Toast.Body style={{ color: "#576777"}} >community is successfully created!</Toast.Body>
            </Toast>
            </div>
        </div>
    );

}


export default withRouter(Createcommunity);
