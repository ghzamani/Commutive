import React from 'react'
import { useEffect, useState} from "react";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
} from "react-router-dom";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'
import Login from "./login.component";
import SignUp from "./signUp.component";
//   import AboutUs from './AboutUs';
import { useHistory } from "react-router-dom";
import './DashboardNavbar.css';
import DashboardSearchPage from './DashboardSearchPage.js';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';


function DashboardNavbar(props) {
    const [count, setCount] = useState(0);
  const [boolcount, setBoolcount] = useState(false);
  const history = useHistory();
  let users = localStorage.getItem("username");
  const NotClicked = ()=>{
    setCount(0)
    history.push("/notification"); 
 }

    useEffect(async () => {
        if(props.isNotification){
          return;
        }
        console.log('im heree');
        
      
        fetch("http://localhost:8000/users/notifications/counts" , {
          method: 'GET',
          headers: {
            "Authorization": "Token " + localStorage.getItem('loginToken')
          }
        })
          .then((res) => {
            if (res.status === 200) {
              return res.json()
            }
            return {};
          }
          )
          .then((data) => {setCount(data); console.log(data)});
      }, []);

        return (
//             <div>
                
//                         <Router>
// <a>
                            <Navbar style={{backgroundColor:"#2a1b3d", maxHeight:"60px"}} variant="dark" expand="lg" sticky="top">
                                <Navbar.Brand href="/">Commutive</Navbar.Brand>
                                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                                {/* <Navbar.Collapse id="basic-navbar-nav"> */}

                                    {/*<ul class="nav navbar-nav ml-auto">
                                        {/* <Nav.Link href="/about-us">About Us</Nav.Link>
                                        <Nav.Link href="/sign-in">Login/SignUp</Nav.Link> */}
                                        {/* <Nav.Link href="/sign-up">SignUp </Nav.Link> */}
                                    {/*</ul>*/}
                <ul class="nav navbar-nav navbar-logo mx-auto">
                    <li class="nav-item">
                        <DashboardSearchPage />
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-logo">
                    {!!users && <li id="Notifications" onClick={NotClicked} style={{ cursor: "pointer" }}>
                        <a>
                            <p style={{ fontSize: "20px", margin: "0" }}>
                                <Badge badgeContent={count} color="primary">
                                    <NotificationsIcon style={{ color: "white", marginBottom: "0px" }} />
                                </Badge>
                            </p>
                        </a>
                    </li>}
                </ul>
                                    


                                    {/* <Form inline>
                                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                        <Button variant="outline-success">Search</Button>
                                    </Form> */}
                                {/* </Navbar.Collapse> */}
                            </Navbar>
                            // </a>
                            // <div className="home-page">
                            //     <br />
                            //     <Switch>
                            //         <Route exact path="/">
                            //             {/* </Route> */}
                            //             {/* <Route path="/about-us"> */}
                            //             {/* <AboutUs /> */}
                            //         </Route>
                            //     </Switch>
                            // </div>
            //             </Router>
            // </div>
        )
    
}



export default DashboardNavbar;