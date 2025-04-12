import './loginSignUp.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () =>{

    const navigate = useNavigate();

    return(
        
        <div class="page">
            <div class="left-logo">
                <div class="logo-box">
                    <p class="logo-name">BrandSight </p>
                </div>
            </div>
            <div class="right-container">
                <div class="content-container">

                    <Link class="back-link" to="/">&lt; Back</Link>

                    <p class="ls-text">SignUp</p>

                    <p class="sub-text">Welcome!</p>

                    <form action="">
                        <div class="label-input">
                            <label for="">Name</label>
                            <input className="name-section" type="text" />
                        </div>

                        <div class="label-input">
                            <label for="">Email Address</label>
                            <input className="email-section" type="text" />
                        </div>
                        <div class="label-input">
                            <label for="">Password</label>
                            <input className="password-section" type="text" />
                        </div>
                        <div class="label-input">
                            <label for="">Confirm Password</label>
                            <input className="password-section" type="text" />
                        </div>
                        <button class="submit-btn" onClick={() => navigate("/login")}>Create Account</button>
                    </form>

                    <p class="question">Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;