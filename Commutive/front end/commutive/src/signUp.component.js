import React, { Component } from "react";
import { useState} from "react";
import { Toast, Button, Form, FormGroup, Label, Input, FormText } from 'react-bootstrap';
import { Link, Redirect, withRouter, useHistory } from 'react-router-dom';

function SignUp(e) {

    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [passwords, setPasswords] = useState({ password: "", confirmPassword: "" })
    const [usernameErr, setUsernameErr] = useState("")
    const [emailErr, setEmailErr] = useState("")
    const [passErr, setPassErr] = useState("")
    const [confirmPassErr, setConfirmPassErr] = useState("")
    const [openToast, SetToastState] = useState(false)
    const history = useHistory()

    if(!!localStorage.getItem('loginToken')){
        history.replace(ReturnWhereSignupIsCalledFrom())
    }

    //saves username and checks if username is not empty
    function validateUsername(newValue) {
        setUserName(newValue);
        let userError = ""
        if ( newValue.length === 0) {
            userError = "Please Enter a unique username.";
        }
        setUsernameErr( userError )
    }

    const emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //saves email and checks if the email is in a valid format
    function validateEmail(email) {
        setEmail(email);
        let userError = ""
        
        if( !emailregex.test(String(email).toLowerCase())){
            userError = "Enter a valid Email!";
        }
        setEmailErr(userError);
    }
    const passregex = /^((?=.*[0-9]{1,})|(?=.*[!.@#$&*-_]{1,}))(?=.*[a-z]{1,}).{8,}$/;
    //saves password and checks if the password is at least 8 chars and has letters and numbers or special characters ! . @ # $ & * - _
    function validatePassword(pass){
        setPasswords({ ...passwords, password: pass })
        let userError = ""
        if (!passregex.test(String(pass).toLowerCase())) {
            userError = "Your password should be at least 8 characters, including letters and numbers or special characters ! . @ # $ & * - _";
        }
        setPassErr(userError)
    }
    //saves confirm password and checks if it matches the password
    function validateConfirmPassword(cpass){
        setPasswords({ ...passwords, confirmPassword: cpass })
        let userError = ""
        if (passwords.password !== cpass) {
            userError = "It doesn't match the password!"
        }
        setConfirmPassErr(userError)
    }

    //to add delay to a function
    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    function ReturnWhereSignupIsCalledFrom() {
        if(history.location && history.location.state && history.location.state.from){
            return history.location.state.from;
        }
        else{
            return "/dashboard";
        }
    }

    //after submitting, checks errors then fetches and if it was successful shows a message in a toast and goes to login page
    const ErrorsOnSubmit = async () => {
        
        validateUsername(username)
        validateEmail(email)
        validatePassword(passwords.password)
        validateConfirmPassword(passwords.confirmPassword)
        if(Boolean(usernameErr) || Boolean(emailErr) || Boolean(passErr) || Boolean(confirmPassErr))
            return;
        
        var myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append("Access-Control-Allow-Headers", "*");
        myHeaders.append('Accept', 'application/json');
        
        var UserCourse = {}
        UserCourse.username = username
        UserCourse.email = email
        UserCourse.password1 = passwords.password
        UserCourse.password2 = passwords.confirmPassword

        var raw = JSON.stringify(UserCourse);
        console.log(raw)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        fetch('http://localhost:8000/rest-auth/registration/', requestOptions)
            .then(async (response) => {
                console.log('status', response.status)

                if (response.status === 201) {
                    SetToastState(true)
                    await timeout(4000)
                    SetToastState(false)
                    history.push({pathname:"/sign-in" , state: {from: (ReturnWhereSignupIsCalledFrom())} })
                    
                }

                return response.json()
            }).then(rep => {
                for (let key in rep) {

                    switch (key) {

                        case "username":
                            setUsernameErr(rep[key]);
                            break;

                        case "email":
                            setEmailErr(rep[key]);
                            break;

                        case "password1":
                            setPassErr(rep[key]);
                            break;
                        case "password2" :
                            setConfirmPassErr(rep[key]);
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



    //THE FORM
    return (
        <div className="outer">
        <div className="row justify-content-center">
          <div className="col-xs-10 col-sm-9 col-md-6 col-lg-5 col-xl-4">
            <div className="inner">
        <Toast show={openToast} transition={null}>
                <Toast.Body>Account is successfully created! You're now being redirected to login...</Toast.Body>
        </Toast>
        <Form onSubmit={(e) => { e.preventDefault(); ErrorsOnSubmit(); }} >
            <h3>Register</h3>

            <Form.Group controlId="username">
                <label>UserName</label>
                <Form.Control type="text" placeholder="Enter username" onKeyPress={(e)=> {e.key === 'Enter' && validateUsername(e.target.value)}} onBlur={(e) => validateUsername(e.target.value)} isInvalid={Boolean(usernameErr)} />
                <Form.Control.Feedback type="invalid">{usernameErr }</Form.Control.Feedback>
            </Form.Group>

            <div className="form-group">
                <label>Email</label>
                <Form.Control type="email" placeholder="Enter email" onKeyPress={(e)=> {e.key === 'Enter' && validateEmail(e.target.value)}} onBlur={(e) => validateEmail(e.target.value)} isInvalid={Boolean(emailErr)} />
                <Form.Control.Feedback type="invalid">{emailErr}</Form.Control.Feedback>
            </div>

            <div className="form-group">
                <label>Password</label>
                <Form.Control type="password" placeholder="Enter password" isInvalid={Boolean(passErr)} onKeyPress={(e)=> {e.key === 'Enter' && validatePassword(e.target.value)}} onBlur= {(e) => validatePassword(e.target.value)}/>
                <Form.Control.Feedback type="invalid">{passErr}</Form.Control.Feedback>
            </div>

            <div className="form-group">
                <label>Confirm Password</label>
                <Form.Control type="password" placeholder="Re-enter password" isInvalid={Boolean(confirmPassErr)} onKeyPress={(e)=> {e.key === 'Enter' && validateConfirmPassword(e.target.value)}} onBlur={(e) => validateConfirmPassword(e.target.value)} />
                <Form.Control.Feedback type="invalid">{confirmPassErr}</Form.Control.Feedback>
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block" >Register</button>
            <p className="forgot-password text-right">
                Already registered? <Link to={{pathname:"/sign-in" , state: {from: (ReturnWhereSignupIsCalledFrom())} }}>log in</Link>
            </p>
            
        </Form>
        </div>
        </div>
        </div>
        </div>
    );
}

//export default SignUp;
export default withRouter(SignUp);
