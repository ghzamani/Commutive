import React from "react";
import { useState, useEffect } from "react";
import ShowMoreText from 'react-show-more-text';
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap"
import Toast from 'react-bootstrap/Toast'
import DeletePost from './DeletePost'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Dropdown from 'react-bootstrap/Dropdown'
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={e => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <span class="material-icons">
<MoreVertIcon></MoreVertIcon>
</span>
  </a>
));



function ReportPost(props) {
    const [data, setData] = useState([]);
    const [userState, SetUserState] = useState(true);
    const [showA, setShowA] = useState(true);
  const toggleShowA = () => setShowA(!showA);
   
  const [showDeleteModal, setDeleteShow] = useState(false);
    const handleDeleteClose = () => setDeleteShow(false);
    const handleDeleteShow = () => setDeleteShow(true);

 
    // useEffect(() => {
       
    
            // if(props.communityID!=undefined){
                // let url="http://localhost:8000/communities/" +props.communityID ; 
                // fetch(url + "/posts/"+ props.idPost +"/reports", {
        //       fetch("http://localhost:8000/communities/sega/posts/1/reports" , {
        //       method : 'GET',
        //       headers:{
        //         "Authorization" : "Token " + localStorage.getItem('loginToken')
        //     }
        //     })
        //       .then((res) => {
        //         if (res.status === 200){
        //           return res.json()
        //         }
        //         if (res.status === 401){
        //           window.location.replace("/sign-in")
        //         }
        //         if(res.status === 400){
        //             console.log(res);
        //         }
        //         console.log("imhere")
        //         return {};
        //       }
        //       )
              
        //       .then((data) => setData(Array.from(data))).then((d)=> {console.log(d);})
        //       .catch(error => console.log('error', error));
              
        //     // let username = localStorage.getItem("username");
        //     // if(data.Reported_By.map(function (el) { return el.username; }).includes(username))
        //     // {
        //     //     SetUserState(true);
        //     // }
          
            
        //   }, [props.communityID]);

       
          
          const reportPost = () => {
            fetch("http://localhost:8000/communities/"+props.communityID+"/posts/"+props.postID+"/reports", {
                method: 'POST',
                headers: {
                    "Authorization": "Token " + localStorage.getItem('loginToken')
                }
            }).then((res) => {
                console.log(res.status);
                if (res.status === 400) {
                    SetUserState(false)
                  
                }
                console.log(res);
            }).then((res) => console.log(res));
        }
        const reportP = () => {
            if(!userState){
                SetUserState(true)

            }
            else{
                SetUserState(false)
            }
            reportPost();

        }
      
    

        return (
                                    <div>
                                        {/* <Card key={report.id} style={{ width: "100%", height: "50%" }}>
                                            <Card.Header style={{ color: "grey" }}>{"@" + report.author} <div style={{ display: "flex", float: "right" }}> */}
                                             {!userState ? 
                                               
                                                <div>
                                                <Toast show={showA} onClose={toggleShowA} style={{position:"absolute", marginLeft: "15px", zIndex: 2}}>

  <Toast.Header>
    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
    <strong className="mr-auto">Report</strong>
   <small> </small>
  </Toast.Header>
  <Toast.Body> is already reported</Toast.Body>
</Toast>
</div>
                                     :<div></div> }
                                 

   <Dropdown>
  <Dropdown.Toggle  as={CustomToggle}></Dropdown.Toggle>
   {/* <span class="material-icons">
<MoreVertIcon></MoreVertIcon>
</span>  */}


  <Dropdown.Menu>
  <Dropdown.Item onClick={() => reportPost()}> report</Dropdown.Item>
    {/* { props.isAuthenticated && <Dropdown.Item onClick={()=> handleDeleteShow()}>edit</Dropdown.Item>} */}
    {props.isAuthenticated && <Dropdown.Item onClick={()=> handleDeleteShow()}>delete</Dropdown.Item>}
   
  </Dropdown.Menu>
</Dropdown> 
{showDeleteModal && <DeletePost communityID={props.communityID} showModal={showDeleteModal} handleClose={handleDeleteClose} postID={props.postID} />}

                                         {/* < Button variant="outline-dark"   onClick={() => reportPost()} >report</Button> */}

                                            
                                                {/* <button style={{ display: "inline-block" }} className="report-button" onClick={() => unreportPost(report.id)}>Keep</button> */}
                                            </div>
                   
                
            );
    }
    

          export default ReportPost;
