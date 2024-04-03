import React, { Component, useEffect, useState } from "react";
import './Cards.css';
import CardItem from './CardItem';
import Homepage from './homepage';
import {Row,Col} from  'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'

function Homepagecard() {
    
          const [data, setData] = useState([]);
        
          function timeout(delay) {
            return new Promise(res => setTimeout(res, delay));
          }
 
          useEffect(async () => {
            console.log('im heree');
            await timeout(20);
            fetch("http://localhost:8000/homepage/communities", {
              method: 'GET'
            })
              .then((res) => {
                if (res.status === 200) {
                  return res.json()
                }
                if (res.status === 401) {
                  window.location.replace("/sign-in")
                }
                return {};
              }
              )
              .then((data) => setData(Array.from(data)));
          }, []);

   return(
       <div>
         
         <div style={{/*position: "absolute", top:"200px", zIndex: "1" , white-space: nowrap;*/ }}>
            {/* <Row className="justify-content-center" style={{ width: "100%", position: "absolute", top: "200px", left: "0px", zIndex: "1", margin: "0" }}  > */}
            <Row className="justify-content-center" style={{ width: "100%"/*, position: "absolute", top: "200px", left: "0px"*/, zIndex: "1", margin: "0" }}  >
                { data.length === 0? <div style= {{width:"50vw"}}></div> :
              data.map((data) => {
                        if (data) return (
           
            <div className="m-3" style={{ width: "20rem" }}>
              <CardItem 
                src= {data.photo != null ? data.photo : "https://om.rosheta.com/upload/61e6aa724ce98c29726e423dd146e4bc9435f9ea5eca681a349a2e2ab0a23494.png"}
                title= {data.name}
                subtitle={"@" + data.communityID}
                text= {data.description}
               
                 path=  { "/community/" + data.communityID}
              /> 
              </div>
           
           ) })}
    
       </Row>
       </div>
       </div>
   
  );
}

export default Homepagecard;