    

import DashboardNavbar from './DashboardNavbar.js'
import Sidebar from './communitySide'
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Overlay} from 'react-bootstrap';
import {OverlayTrigger} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState } from 'react';

import {Popover} from 'react-bootstrap';

const localizer = momentLocalizer(moment);



function eventStyleGetter(event, start, end, isSelected) {
    console.log(event);
    var backgroundColor = '#' + event.hexColor;
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '0px',
        opacity: 0.8,
        color: 'black',
        border: '0px',
        display: 'block'
    };
    return {
        style: style
    };
}

function ShowCalendarUser(props)  {
    
        const [myEvents, setEvents] = useState([{start:'',
        end:'', title:"",description:"",photo:[],id:"", allDay: true,}]);
        const [data, setData] = useState([]);
      
        function timeout(delay) {
            return new Promise(res => setTimeout(res, delay));
          }      
    
    useEffect(async () => {
        let username = localStorage.getItem("username");
        console.log('im heree');
        await timeout(20);
        fetch(" http://localhost:8000/users/"+username+"/events", {
          method: 'GET',
          headers: {
            "Authorization": "Token " + localStorage.getItem('loginToken')
          }
        })
          .then((res) => {
          console.log(res.status+"status")
            if (res.status === 200) {
              
              return res.json()
            }
          
          }
          )
         
          .then((data) => {
            setData(Array.from(data));
            setEvents(data.map( d => { return { id:d.id ,title:d.title , start:new Date (d.startDate) , end:new Date( d.endDate) ,description:d.description, photo:d.photo} } ) )
             console.log(data+"data")
            });
    
      
      }, []);
    
      
     
 
function Event({ event }) {
   
  
  
  
  let popoverClickRootClose = (
    <Popover id="popover-trigger-click-root-close"  style={{ zIndex: 10000 }}>
        <Popover.Title as="h3">{event.title}</Popover.Title>
      <Popover.Content>
      {event.description}
      </Popover.Content>
      <Popover.Content>
     
     
 <img src={event.photo} style={{display:"flex", height:"90px",width:"90px"}}></img>
 
 </Popover.Content>
  </Popover>

  
// Select a specified element

  );


  console.log(event.photo);
  return (
    <div>
      <div>
        <OverlayTrigger id="help" trigger="click" rootClose container={this} placement="bottom" data-img="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"  overlay={popoverClickRootClose} >
          <div>{event.title}
          
          </div>
        </OverlayTrigger>
      </div>
    </div>
  );
}
 
    return (
      <div>
      <DashboardNavbar />
      <Sidebar location={"My Calendar"}/>
       <div className="calendaruser">
        <div style={{ height: '500pt'}}>
          <Calendar
            events={myEvents}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            // eventPropGetter={(eventStyleGetter)}
            localizer={localizer}
             components={{
              event: Event
            }}
          />
        </div>
        </div>
        </div>

    );
  }


export default ShowCalendarUser;
