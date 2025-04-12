import './login.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () =>{
    const navigate = useNavigate();

    return(
        <div class="login-page">
        <div class="left-logo">
            <div class="logo-box">
                <p class="logo-name">BrandSight </p>
            </div>
        </div>
        <div class="right-login-container">
            <div class="login-container">

                <Link class="back-link" to="/">&lt; Back</Link>

                <p class="login-text">Login</p>

                <p class="sub-text">Welcome Back!</p>

                <form action="">
                    <div class="label-input">
                        <label for="">Email Address</label>
                        <input type="text" />
                    </div>
                    <div class="label-input">
                        <label for="">Password</label>
                        <input type="text" />
                    </div>
                    <button class="login-btn" onClick={() => navigate("/home")}>Login Account</button>
                </form>

                <p class="signup-link">Don't have an account? <Link to="/signup">SignUp</Link></p>
            </div>
        </div>
    </div>
    );
};

export default Login;