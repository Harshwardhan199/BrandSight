import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";

import './loginSignUp.css';

const Login = () =>{

    const navigate = useNavigate();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailIsValid, setEmailIsValid] = useState(false);

    const checkAndSetEmail = (e) => {
        const emailToCheck = e.target.value;
        setEmail(emailToCheck);
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const testEmail = emailPattern.test(emailToCheck);

        setEmailIsValid(testEmail);

        if (testEmail){
            emailRef.current.style.borderColor = "black";
        }
        else{
            emailRef.current.style.borderColor = emailToCheck.length > 0 ? "red" : "black";
        }
    };

    return(
        <div className="page">
        <div className="left-logo">
            <div className="logo-box">
                <p className="logo-name">BrandSight </p>
            </div>
        </div>
        <div className="right-container">
            <div className="content-container">

                <Link className="back-link" to="/">&lt; Back</Link>

                <p className="ls-text">Login</p>

                <p className="sub-text">Welcome Back!</p>

                <form action="">
                    <div className="label-input">
                        <label for="">Email Address</label>
                        <input 
                            className="email-section"
                            type="text"
                            value={email}
                            ref={emailRef}
                            onChange={(e) => checkAndSetEmail(e)}
                            required
                        />
                    </div>
                    <div className="label-input">
                        <label for="">Password</label>
                        <input 
                            className="password-section"
                            type="text" 
                            value={password}
                            ref={passwordRef}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="submit-btn" onClick={() => navigate("/home")}>Login Account</button>
                </form>

                <p className="question">Don't have an account? <Link to="/signup">SignUp</Link></p>
            </div>
        </div>
    </div>
    );
};

export default Login;