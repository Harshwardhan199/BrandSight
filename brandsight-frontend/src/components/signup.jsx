import './signup.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () =>{

    const navigate = useNavigate();

    return(
        
        <div class="signup-page">
            <div class="left-logo">
                <div class="logo-box">
                    <p class="logo-name">BrandSight </p>
                </div>
            </div>
            <div class="right-signup-container">
                <div class="signup-container">

                    <Link class="back-link" to="/">&lt; Back</Link>

                    <p class="signup-text">SignUp</p>

                    <p class="sub-text">Welcome!</p>

                    <form action="">
                        <div class="label-input">
                            <label for="">Name</label>
                            <input type="text" />
                        </div>

                        <div class="label-input">
                            <label for="">Email Address</label>
                            <input type="text" />
                        </div>
                        <div class="label-input">
                            <label for="">Password</label>
                            <input type="text" />
                        </div>
                        <div class="label-input">
                            <label for="">Confirm Password</label>
                            <input type="text" />
                        </div>
                        <button class="signup-btn" onClick={() => navigate("/login")}>Create Account</button>
                    </form>

                    <p class="login-link">Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;