import React, { Component } from "react";
import { useState, useEffect } from "react";
import { Toast, Button, Form, FormGroup, Label, Input, FormText } from 'react-bootstrap';
import { Link, Redirect, withRouter, useHistory } from 'react-router-dom';

function Login() {

    const [username, setUserName] = useState("");
    const [passwords, setPasswords] = useState({ password: "", confirmPassword: "" })
    const [usernameErr, setUsernameErr] = useState("")
    const [passErr, setPassErr] = useState("")
    const [openToast, SetToastState] = useState(false)
    const [toastText, setToastText] = useState("")
    const history = useHistory();

    if(!!localStorage.getItem('loginToken')){
        history.replace(ReturnWhereLoginIsCalledFrom())
    }

    //saves username and checks if username is not empty
    function validateUsername(newValue) {
        setUserName(newValue);
        let userError = ""
        if ( newValue.length === 0) {
            userError = "Please Enter your username.";
        }
        setUsernameErr( userError )
    }

    //saves password and checks if password is not empty
    function validatePassword(pass){
        setPasswords({ ...passwords, password: pass })
        let userError = ""
        if (pass.length === 0) {
            userError = "Please enter your password.";
        }
        setPassErr(userError)
    }

    function ReturnWhereLoginIsCalledFrom() {
        if(history.location && history.location.state && history.location.state.from){
            return history.location.state.from;
        }
        else{
            return "/dashboard";
        }
    }


    //to add delay to a function
    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const ErrorsOnSubmit = async () => {
        SetToastState(false);
        validateUsername(username)
        validatePassword(passwords.password)
        //if there is an error for username or password
        if( !!(usernameErr) || !!(passErr) ) 
            return;
        
        const loginToken = window.localStorage.getItem('token');
        var myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append("Access-Control-Allow-Headers", "*");
        myHeaders.append('Accept', 'application/json');


        var UserCourse = {}
        UserCourse.username = username
        UserCourse.password = passwords.password
        var raw = JSON.stringify(UserCourse);
        console.log(raw)

        var requestOptions =
        {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        
        let response = fetch('http://localhost:8000/rest-auth/login/', requestOptions)
            .then(response => {
                console.log('status', response.status)

                if (response.status === 200) {
                    console.log(ReturnWhereLoginIsCalledFrom())
                }

                return response.json()
            }).then(async rep => {
                for (let key in rep) {

                    switch (key) {

                        case "non_field_errors":
                            setToastText(rep[key]);
                            SetToastState(true);
                            break;

                        case "key":
                            localStorage.setItem('loginToken', rep[key])
                            localStorage.setItem('username' , username);
                            await timeout(20);
                            history.push(ReturnWhereLoginIsCalledFrom())
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
        <div className="outer">
        <div className="row justify-content-center">
          <div className="col-xs-10 col-sm-9 col-md-6 col-lg-5 col-xl-4">
            <div className="inner">
        <Toast show={openToast} transition={null}>
                <Toast.Body>{toastText}</Toast.Body>
        </Toast>
        <Form onSubmit={(e) => { e.preventDefault(); ErrorsOnSubmit(); }}>
            <h3>Login</h3>

            <Form.Group controlId="username">
                <label>UserName</label>
                <Form.Control type="text" placeholder="Enter username"onKeyPress={(e)=> {e.key === 'Enter' && setUserName(e.target.value)}} onBlur={(e) => validateUsername(e.target.value)} isInvalid={Boolean(usernameErr)} />
                <Form.Control.Feedback type="invalid">{usernameErr }</Form.Control.Feedback>
            </Form.Group>

            <div className="form-group">
                <label>Password</label>
                <Form.Control type="password" placeholder="Enter password" isInvalid={Boolean(passErr)} onKeyPress={(e)=> {e.key === 'Enter' && setPasswords({ ...passwords, password: e.target.value })}} onBlur= {(e) => validatePassword(e.target.value)}/>
                <Form.Control.Feedback type="invalid">{passErr}</Form.Control.Feedback>
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in </button>
            <p className="forgot-password text-right">
            Don't have an account? <Link to={{pathname : "/sign-up" , state: {from: (ReturnWhereLoginIsCalledFrom())}}}>Sign Up!</Link>
            </p>
        </Form>
        </div>
        </div>
        </div>
        </div>
    );
}

//export default Login;
export default withRouter(Login);
