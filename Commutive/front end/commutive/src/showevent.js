import React, { Component, useEffect, useState } from "react";
import { Row, Col } from 'react-bootstrap';
import ShowMoreText from 'react-show-more-text';
import moment from "moment"
import ScheduleIcon from '@material-ui/icons/Schedule';
import EventIcon from '@material-ui/icons/Event';

import { Card, CardColumns } from "react-bootstrap";
import { PinDropSharp } from "@material-ui/icons";
function Showevent(props) {

    const [data, setData] = useState([{}]);
    const [datan, setDatan] = useState([{}]);
    const [update,setUpdate]=useState(false);
    const [users_joined,setUsers_joined]=useState([])
    // function getspilt(string) {

    //     return string.replace("T", "").replace("Z", "")

    // }

    //  function getspilt(string){
    //    return string.format("YYYY-MM-DD HH:mm")
    //  }
    let username=localStorage.getItem("username");
    useEffect(async () => {
        
        console.log('im heree');
        fetch("http://localhost:8000/communities/" + props.communityID + "/events", {
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
                    window.location.replace("")
                }
                return {};
            }
            )
            .then((data) => { setData(Array.from(data.map((d)=>{
                d.isJoined = d.users_joined.map(function (el) { return el.username; }).includes(username);
                return d;
            }))); console.log(data) });
    }, []);



 const members= async (id) => {
        let isJoined = false;
        console.log('im heree');
        await fetch("http://localhost:8000/communities/"+props.communityID + "/events/"+id+"/members", {
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
                    window.location.replace("")
                }
                return {};
            }
            )
            // .then((datan) => { setDatan(Array.from(datan)); console.log(datan) })
            .then((d) => {
             let username = localStorage.getItem("username");
            //  {data.map((d) =>
            //    { 
            //        console.log(d.users_joined+" oooo")
                 if(d.users_joined.map(function (el) { return el.username; }).includes(username))
                 {
                     isJoined = true;
                     setUpdate(true)
                }
           
                
            //    }
            //  )}
        
         
        });

        return isJoined;

    }

    const joinButtonClicked = async (id) => {
        // let username=localStorage.getItem("username");
       

        return await fetch("http://localhost:8000/communities/"+props.communityID+"/events/"+id+"/members" ,
            {
                method: 'PUT',
                headers: {
                    'Authorization': "Token " + localStorage.getItem('loginToken')
                }
            })
            .then(response => {
                if (response.status === 200) {
                  
                }
                return response.json();
            })
            .then(d => {
                let events = [...data];
                for(let i=0; i< events.length; i++){
                    if(events[i].id === id){
                        events[i].isJoined = !events[i].isJoined;
                    }
                }
                setData(events);
                console.log(d)
            }
        )
      
          
      
            .catch(error =>
                console.log(error)
            );
            
    }

    
    return (
                 
     <Row className="justify-content-center" style={{ width: "100%"/*, position: "absolute", top: "200px", left: "0px"*/, zIndex: "1", margin: "0",marginTop:"30px" }}  >
     { data.length === 0? <div style= {{width:"50vw"}}></div> :
   data.map((data) => {
     if (data) return (
       <Card className="m-4" key={data.communityID} style={{ width: "16em" }}>
         <Card.Img variant="top" src={data.photo != null ? data.photo : "https://om.rosheta.com/upload/61e6aa724ce98c29726e423dd146e4bc9435f9ea5eca681a349a2e2ab0a23494.png"} />
         <Card.Body>
           <Card.Title>{data.title}</Card.Title>
           {/* <Card.Subtitle style={{ color: "grey" }}>{"@" + data.communityID}</Card.Subtitle> */}
           <Card.Text style={{ paddingTop: "5px" }}>
             
                     {data.description}
                  <Card.Text>
                     <i className="material-icons" style={{ left: "4px" }}  ><ScheduleIcon></ScheduleIcon> </i>
                        start : {moment(data.startDate).format('YYYY/MM/DD  hh:mm')}
                        </Card.Text>
                        <Card.Text>
                     <i className="material-icons" style={{ left: "4px" }}  ><ScheduleIcon></ScheduleIcon> </i>
                    end :{moment(data.endDate).format('YYYY/MM/DD hh:mm')}
                    </Card.Text>      


               </Card.Text>
           {/* <Button variant="primary" href={character.url} target="_blank">
   More Info
 </Button> */}
         
           {/* <a href="#" class="btn btn-primary">See Profile</a> */}
           {/* { members(data.id)} */}
          {
            
            data.isJoined== false?
           <a  class="btn btn-primary" style={{backgroundColor:"#33aba3", border:"none"}} onClick={()=>joinButtonClicked(data.id)} >join event</a>

           :
           <a  class="btn btn-primary" style={{backgroundColor:"#33aba3", border:"none"}} onClick={()=>joinButtonClicked(data.id)} >leave event</a>
            
          }
          
         </Card.Body>
       </Card>)  })}</Row>








);
}   

//                     <div style={{/*position: "absolute", top:"200px", zIndex: "1" , white-space: nowrap;*/ }}>
//                     {/* <Row className="justify-content-center" style={{ width: "100%", position: "absolute", top: "200px", left: "0px", zIndex: "1", margin: "0" }}  > */}
//                     <Row className="justify-content-center" style={{ width: "100%"/*, position: "absolute", top: "200px", left: "0px"*/, zIndex: "1", margin: "0" }}  >
//                         { data.length === 0? <div style= {{width:"50vw"}}> </div> :
//                             data.map((data) => {
//                           if (data) return (
//                           <Card className="m-4" key={data.communityID} style={{ width: "16rem" }}>
//                             <Card.Img variant="top" src={data.photo != null ? data.photo : "https://om.rosheta.com/upload/61e6aa724ce98c29726e423dd146e4bc9435f9ea5eca681a349a2e2ab0a23494.png"} />
//                             <Card.Body>
//                               <Card.Title>{data.title}</Card.Title>
//                               {/* <Card.Subtitle style={{ color: "grey" }}>{"@" + data.communityID}</Card.Subtitle> */}
//                               <Card.Text style={{ paddingTop: "5px" }}>{data.description}
//                               <p>
//                                   start date:
//                                          {moment(data.startDate).format('YYYY/MM/DD  hh:mm')}
//                                     </p>
//                                     <p>
//                                         <i className="material-icons" style={{ left: "4px" }}  ><ScheduleIcon></ScheduleIcon> </i>
//                                         end dete:
//                                         {moment(data.endDate).format('YYYY/MM/DD hh:mm')}
//                                     </p>
//                               </Card.Text>
//                               {/* <Button variant="primary" href={character.url} target="_blank">
//                       More Info
//                     </Button> */}
//                               {/* <a href="#" class="btn btn-primary">See Profile</a> */}
//                               <a  class="btn btn-primary" onClick={()=>joinButtonClicked(data.id)} >join event</a> 
//                             </Card.Body>
//                           </Card>)
//                       })}
            
//                     </Row>
//                     {/* </CardColumns> */}
              
//      </div>
                             


//     );
// }

export default Showevent;