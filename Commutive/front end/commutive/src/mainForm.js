import React, { useState,useEffect } from "react";
import FormikForm from "./formikForm";
import "bootstrap/dist/css/bootstrap.min.css";

import PictureUploader from "./pictureUploader";
import { Update } from "@material-ui/icons";
import { map } from "jquery";
import ServerURL from './constants'
import './edit.css'
import { Toast} from 'react-bootstrap';



function MainForm(props) {
   const [fields, updateFields] = useState({name:"",description:"",photo:""});
    // const [fields, setFields] = useState({});
    //  const [data, setData] = useState([]);
    const [status, setStatus] = useState({edit : false})
 
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [openToast, SetToastState] = useState(false)
  const [communityID, setCommunityID] = useState("");
  const [src, setSrc] = useState(null);
   function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
 }



  //  var myHeaders = new Headers();
  //  myHeaders.append("Authorization", "Token " + localStorage.getItem('loginToken'));

  // var raw = JSON.stringify(UserCourse);
  // let fd = new FormData();
  // fd.append("photo", photo)
  // fd.append('name', name);
  // fd.append('description', description);

  // var requestOptions = {
  //     method: 'PUT',
  //     headers: myHeaders,
  //     body: fd,
  // };
  // fetch(' http//localhost:8000/communities/sega', requestOptions)
  // .then(async (response) => {
  //     console.log('status', response.status)

  //     if (response.status === 200) {
         
  //         SetToastState(true)
  //         await timeout(4000)
       
  //         SetToastState(false)
  //     }

  //     return response.json()
  // })
  // .catch(error => {
  //     console.log('error', error)
  // });

 

  
function timeout(delay) {
  return new Promise(res => setTimeout(res, delay));
}


useEffect(async () => {
  console.log("i'm hereee")
  await timeout(20);
  fetch(" http://localhost:8000/communities/"+props.communityID, {
    method: 'GET',
    headers: {
      "Authorization": "Token " + localStorage.getItem('loginToken')
    }
  })
    .then((res) => {
      if (res.status === 200) {
        console.log("get successful")
        return res.json()
      }
    }
    )
    // .then((data) => updateFields({name:data.name,description:data.description,photo:data.photo}));
    .then((data) => { if(data) {setName( data.name);
      setDescription(data.description); 
      if(!!data.photo){
        setPhoto(data.photo.includes("http://")? data.photo : ServerURL + data.photo)
        setSrc(data.photo.includes("http://")? data.photo : ServerURL + data.photo)
      }
      updateFields({name:data.name,description:data.description,photo:data.photo})}});
      console.log("this is name in main:"+name)

}, [props.triggerCommunity]);

  const submitChanges = () => {
    console.log("this is communityID: " + props.communityID)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Token " + localStorage.getItem('loginToken'));
    let fd = new FormData();
    var changedCount =0;
    console.log("name is" + name)
    console.log("desc is" + description)
    console.log(" fields name is" + fields.name)
    if(name === "" || name === null)
    {
      setName( fields.name);
      fd.append('name',fields.name );
    }
    else if(name !== fields.name){
      changedCount++;
      fd.append('name',name );
    }
    
    if(description !== fields.description)
    {
      console.log("here")
      fd.append("description",description);
      changedCount++;
    }
    if(photo !== ServerURL + fields.photo && photo !== fields.photo)
    {
      if(photo === null){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Token " + localStorage.getItem('loginToken'));
        let requestOptions = {
            method: 'PUT',
            headers: myHeaders
          };
        fetch("http://localhost:8000/communities/" + props.communityID + "/delete", requestOptions)
               .then( (response) => {
                 if (response.status !== 200) {
                   return;
                  }
             })
            .catch(error => {
                  console.log('error', error)
              });
      }
      else{
        fd.append("photo", photo);
        changedCount++;
      }
    }
    if(changedCount === 0){
      return;
    }
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: fd,
    };
    let url= "http://localhost:8000/communities/" +props.communityID;
    fetch(url, requestOptions)
      .then(async (response) => {
        console.log('status', response.status)

        if (response.status === 200) {
            props.setTriggerCommunity(!props.triggerCommunity)
            console.log(props.triggerCommunity)
            SetToastState(true)
            await timeout(4000)
            SetToastState(false)
        }

        return response.json()
      })
      .catch(error => {
        console.log('error', error)
      });
  }


 return(
 
    <div className="container edit-community">
   {/* {fields.map((data)=>{
  
    return (
      
            <div
         
            
         key={data.communityID}
           name={data.name}
          description={data.description}
         photo={data.photo}
          >
         </div>
                  
      
    
    )

  })} */}
    <Toast show={openToast} style={{position: "fixed", bottom:"10px", zIndex:"100", color:"#552097", fontSize:"19px", width:"100%"}}>
                <Toast.Body>Successfully edited community's info</Toast.Body>
    </Toast>
    <PictureUploader photo={photo} setSrc={setSrc} src={src} setPhoto={setPhoto} status={status}/>
    <FormikForm /*fields={fields} updateFields={updateFields}*/ status={status} setStatus={setStatus} setName={setName} name={name} oldName={fields.name} description={description} setDescription={setDescription} submitChanges={submitChanges}/>
      
      
      
    </div>
 )

}

export default MainForm;