import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase.js";
import {createUserWithEmailAndPassword } from "firebase/auth";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import './loginSignUp.css'

const SignUp = () =>{
    const navigate = useNavigate();

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [passwordRule,setPasswordRules] = useState({
        length: false,
        letter: false,
        number: false,
        specialChar: false
      });

    const [emailIsValid, setEmailIsValid] = useState(false);
    const [passwordNotMatched, setPasswordNotMatched] = useState(true);

    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

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

    const checkAndSetPassword = (e) => {
        setPassword(e.target.value);

        const passToCheck = e.target.value;

        const newRules = {
            length: passToCheck.length >= 8,
            letter: /[A-Za-z]/.test(passToCheck),
            number: /\d/.test(passToCheck),
            specialChar: /[@_!#$%^&*.,?]/.test(passToCheck)
        };

        setPasswordRules(newRules);

        const allValid = Object.values(newRules).every(Boolean);

        if (allValid || passToCheck.length === 0) {
            passwordRef.current.style.borderColor = "black";
        } else {
            passwordRef.current.style.borderColor = "red";
        }
    };

    const checkAndSetConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);

        const passTomatch = e.target.value;

        console.log(password, passTomatch);

        if (password === passTomatch){
            console.log("galat hai");
          setPasswordNotMatched(false);
          confirmPasswordRef.current.style.borderColor = "black";
        }
        else{
            console.log("galat hai");
          setPasswordNotMatched(true);
          confirmPasswordRef.current.style.borderColor = passTomatch.length > 0 ? "red" : "black";
        }
    };

    const handleEmailSignUp = async (e) => {
        e.preventDefault();
    
        try{
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        //   const user = userCredential.user;
    
            //Request to backend to add user data to DB.
            
        //   await axios.post("http://localhost:5000/api/users/registerUser", {
        //     UID: user.uid,
        //     name,
        //     email,
        //     password,
        //   }, {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   });
    
          console.log("User created as:", userCredential.user.email);
          
          navigate("/login");
        }
        catch(error) {
          console.error("SignUp error:", error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        console.log("Google se login karega");
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            console.log("Google user created/logged in:", user.displayName, user.email, user.photoURL);

            navigate("/home");
        } catch (error) {
            console.error("Google Sign-Up error:", error.message);
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

                    <p className="ls-text">SignUp</p>

                    <p className="sub-text">Welcome!</p>

                    <form onSubmit={handleEmailSignUp}>
                        <div className="label-input">
                            <label>Name</label>
                            <input 
                                className="name-section" 
                                type="text" 
                                value={name} 
                                onChange={e => setName(e.target.value)} 
                                required />
                        </div>

                        <div className="label-input">
                            <label>Email Address</label>
                            <input 
                                className="email-section" 
                                type="text" 
                                value={email}
                                ref={emailRef}
                                onChange={(e) => checkAndSetEmail(e)}
                                onFocus={() => setIsEmailFocused(true)}
                                onBlur={() => setIsEmailFocused(false)}
                                required />
                        </div>

                        {isEmailFocused && email.length>0 && !emailIsValid && <p className="error-text">Enter Valid Email Address</p>}

                        <div className="label-input">
                            <label>Password</label>
                            <input 
                                className="password-section" 
                                type="text" 
                                value={password}
                                ref={passwordRef}
                                onChange={(e) => checkAndSetPassword(e)}
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => setIsPasswordFocused(false)}
                                required />
                        </div>

                        {isPasswordFocused && password.length > 0 && (
                            !passwordRule.length && <p className="error-text">At least 8 characters</p> ||
                            !passwordRule.letter && <p className="error-text">Includes a letter</p> ||
                            !passwordRule.number && <p className="error-text">Includes a number</p> ||
                            !passwordRule.specialChar && <p className="error-text">Includes a special character</p>
                        )}

                        <div className="label-input">
                            <label>Confirm Password</label>
                            <input 
                                className="password-section" 
                                type="text" 
                                value={confirmPassword}
                                ref={confirmPasswordRef}
                                onChange={(e) => checkAndSetConfirmPassword(e)}
                                onFocus={() => setIsConfirmPasswordFocused(true)}
                                onBlur={() => setIsConfirmPasswordFocused(false)}
                                required />
                        </div>

                        {isConfirmPasswordFocused && confirmPassword.length > 0 && passwordNotMatched && <p className="error-text">Passwords don't match</p>}

                        <button className="submit-btn" type="submit">Create Account</button>

                        <div className="line"><span className="or-text">Or</span></div>

                        <button className="google-btn" onClick={handleGoogleSignIn}>SignIn with Google</button>
                    </form>

                    <p className="question">Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;