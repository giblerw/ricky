//dependencies
import { Input, SubmitBtn } from "../Form";
import React, { useState } from "react";
import {useHistory } from 'react-router-dom'
import API from "../../utils/API";


const RegisterUser = () => {
    const history = useHistory()

    //hook for state of registration info form
    const [registrationFormObject, setRegistrationFormObject] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })

    //handles updating component state when user types into the input field
    function handleInputChange(event){
        const { name, value } = event.target;
        setRegistrationFormObject({...registrationFormObject, [name]: value})
    };

    //when the form is submitted, use API.registerUser method to save the user data
    //then navigate to the login page
    function handleRegistrationFormSubmit(event) {
        event.preventDefault()
        if(!registrationFormObject.email){
            alert("please provide an email address")
        }
        else if (registrationFormObject.password !== registrationFormObject.confirmPassword){
            alert("your passwords do not match")
        }
        else if (!registrationFormObject.password){
            alert("please create and confirm a password")
        }
        else{
            API.registerUser({
                email: registrationFormObject.email,
                password: registrationFormObject.password,
            })
                .then(res => {
                    if (res.data === "this user already exists"){
                        alert(res.data)
                        (history.push('/register'))
                    }else {
                        (history.push('/login'))
                    }
                })                
                .catch(err => console.log(err))
        }

        
    };



    return (
        <>
        <h3>user registration</h3>
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
            placeholder ="create password"
            name="password"
            onChange={handleInputChange}
            />
            <label>confirm password</label>
            <Input
            type="password"
            placeholder ="confirm password"
            name="confirmPassword"
            onChange={handleInputChange}
            />
            <SubmitBtn
             onClick={handleRegistrationFormSubmit}

            >
                register
            </SubmitBtn>

        </div>
        </>
    )
}

export default RegisterUser