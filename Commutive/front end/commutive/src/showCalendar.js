
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Overlay} from 'react-bootstrap';
import {OverlayTrigger} from 'react-bootstrap';
import {useEffect, useState } from 'react';

import {Popover} from 'react-bootstrap';
import ShowCalendarUser from './showCalendarUser';

const localizer = momentLocalizer(moment);



function Event({ event }) {
  let popoverClickRootClose = (
    <Popover id="popover-trigger-click-root-close" style={{ zIndex: 10000 }}>
         <Popover.Title as="h3">{event.title}</Popover.Title>
      {/* <strong>Holy guacamole!</strong> Check this info. */}
      {/* <strong>{event.title}</strong>
      <strong>{event.description}</strong> */}
      <Popover.Content>
      {event.description}
      </Popover.Content>
      <Popover.Content>
     <img src={event?.photo? event.photo : "https://om.rosheta.com/upload/61e6aa724ce98c29726e423dd146e4bc9435f9ea5eca681a349a2e2ab0a23494.png"} style={{display:"flex", height:"90px",width:"90px"}}></img>
    </Popover.Content>
    </Popover>
  );

  console.log(event);
  return (
    <div>
      <div>
        <OverlayTrigger id="help" trigger="click" rootClose container={this} placement="bottom" overlay={popoverClickRootClose}>
          <div>{event.title}
          </div>
        </OverlayTrigger>
      </div>
    </div>
  );
}
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

function ShowCalendar(props)  {
    
        const [myEvents, setEvents] = useState([{start:'',
        end:'', title:"",description:"",photo:null,id:"", allDay: true,}]);
        const [data, setData] = useState([]);
      
        function timeout(delay) {
            return new Promise(res => setTimeout(res, delay));
          }      
    
    useEffect(async () => {
        console.log('im heree');
        await timeout(20);
        fetch("  http://localhost:8000/communities/"+props.communityID +"/events", {
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
            setEvents(data.map( d => { return { id:d.id ,title:d.title , start:new Date (d.startDate) , end:new Date( d.endDate) ,description:d.description,photo:d.photo} } ) )
             console.log(data+"data")
            });
    
      
      }, []);
    
 
 
    return (
        <div style={{ height: '100%', width:"100%", overflowX:"scroll"}}>
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
    );
  }


export default ShowCalendar;