
import React from 'react'

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

import Cards from './Cards';
 import './homepage.css';
import SearchPage from './SearchPage.js';



class Homepage extends React.Component {


    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Router>
                       
                            <Navbar style={{backgroundColor:"#2a1b3d", maxHeight:"60px"}} variant="dark" expand="lg" sticky="top">
                                <Navbar.Brand href="/">Commutive</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    
                                   <ul class="nav navbar-nav ml-auto">
                                   <Nav.Link href="/about-us">About Us</Nav.Link>
                                        <Nav.Link href="/sign-in">Login/SignUp</Nav.Link>
                                        {/* <Nav.Link href="/sign-up">SignUp </Nav.Link> */}
                                   </ul>
                                
                                
                                    {/* <Form inline>
                                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                        <Button variant="outline-success">Search</Button>
                                    </Form> */}
                                </Navbar.Collapse>
                            </Navbar>
                            <div className="home-page"> 
                            <SearchPage/>
                            
                            <br />
                            <Switch>
                                <Route exact path="/">
                                    {/* </Route> */}
                                    {/* <Route path="/about-us"> */}
                                    {/* <AboutUs /> */}
                                </Route>
                            </Switch>
                            <Cards/>
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        )
    }
}



export default Homepage;