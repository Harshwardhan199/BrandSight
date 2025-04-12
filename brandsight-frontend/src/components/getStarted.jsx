import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './getStarted.css';

const GetStarted = () => {

    const navigate = useNavigate();

    return (
      <div className="body-content">
        <div className="nav-bar-s">
            <div className="logo">BrandSight </div>
            <div className="nav-links">
                <a href="#">Home</a>
                <a href="#features">Features</a>
                <a href="#contact">Contact</a>
            </div>
            <div className="nav-links">
                <Link to="/login">Login</Link>
                <button className="signUp-btn" onClick={() => navigate("/signup")}>SignUp</button>
            </div>
        </div>
    
        <div className="about">
            <div className="about-container"> 
                <div className="about-content">
                    <p className="heading-1">Understand What People Really Think About Your Brand</p>
                    <p className="subHeading-1">Analyze reviews from Google Play and Maps in seconds.</p>
                    <p className="subHeading-1">Get instant insights with sentiment analysis, keyword trends, and growth suggestions.</p>
                </div>
                <div className="about-img">
                    <img src="" alt="" />
                </div>
            </div>
            <button className="startAnalyzing" onClick={() => navigate("/home")}>Start Analyzing ➜</button>
        </div>
    
        <div className="features-container" id="features">
            <p>Features</p>
            <div className="features">
                <div className="feature">
                    <img src="" alt="" />
                    <p>Sentiment Overview</p>
                </div>
                <div className="feature">
                    <img src="" alt="" />
                    <p>Keyword Extraction</p>
                </div>
                <div className="feature">
                    <img src="" alt="" />
                    <p>Smart Suggestions</p>
                </div>
                <div className="feature">
                    <img src="" alt="" />
                    <p>Supports Apps + Physical Stores</p>
                </div>
            </div>
        </div>
    
        {/* <div className="working">
            <p>How It Works</p>
            <div className="steps">
                <div className="step">Enter brand URL</div>⇨
                <div className="step">Fetch reviews</div>⇨
                <div className="step">Sentiment Analysis</div>⇨
                <div className="step">Get insights and suggestions</div>
            </div>
        </div>  */}
    
        <div className="contact" id="contact">
            <p>Contact</p>
            <div className="contact-content">
                <div className="contactInfo">
                    
                </div>
                <div className="contact-container">
                    <div className="contact-details">
                        <p>Contact Us</p>
                    </div>
                    
                    <form className="">
                        <div className="label-input">
                            <label for="">Email</label>
                            <input type="text" />
                        </div>
                        <div className="label-input">
                            <label for="">Message</label>
                            <textarea rows="4"></textarea>
                        </div>
                        <button type="submit" className="send-btn">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
}
  
export default GetStarted;
  