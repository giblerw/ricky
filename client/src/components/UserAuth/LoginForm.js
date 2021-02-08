//dependencies
import { Input, SubmitBtn } from "../Form";
import {useHistory } from 'react-router-dom'
import API from '../../utils/API';
import React, { useState } from "react";


const LoginForm = () => {

    const history = useHistory()

    //hook for state of login form
    const [loginFormObject, setLoginFormObject] = useState({
        email: "",
        password: ""
    })

    //handles updating component state when user types into the input field
    function handleInputChange(event){
        const { name, value } = event.target;
        setLoginFormObject({...loginFormObject, [name]: value})
    };

    //function for navigating user to the registration page
    function newReg(){
        history.push('/register')
    }

    //when the login form is submitted, use API.loginUser method to authenticate
    function handleLoginFormSubmit(event){
        event.preventDefault()
        API.loginUser({
            email: loginFormObject.email,
            password: loginFormObject.password,
        })
        .then(res => {
            //if the email and password match a record in the database, send to the home page
            if(res.data){
                history.push(`/`)
            }
            //if the email and password do not match a record in the database, send an alert and keep on login page
            else{
                alert("login failed")
                history.push(`/login`)
            }
        })
        .catch(err => console.log(err))
    }


    return (
        <>
        <h1>sign in</h1>
        <div className="form-group">
            <label>email</label>
            <Input
            type="email"
            placeholder="enter email"
            name="email"
            onChange={handleInputChange}

            />
            <label>password</label>
            <Input
            type="password"
            placeholder ="enter password"
            name="password"
            onChange={handleInputChange}

            />
            
            <SubmitBtn
            onClick={handleLoginFormSubmit}
            >
                sign in
            </SubmitBtn>
            <SubmitBtn
            onClick={newReg}
            >
                register
            </SubmitBtn>
        </div>
        </>
    )
}

export default LoginForm