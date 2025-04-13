import React, {useState, useRef, useEffect} from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import './home.css';
import useCurrentUser from "./currentUser";

const Home = () => {
    const user = useCurrentUser();
    const navigate = useNavigate();
    
    const [profileImageUrl, setProfileImageUrl] = useState("");

    useEffect(() => {
    if (user) {

        console.log("Logged in user:", user.email);
        // console.log("User object:", user.uid);

        // retrieveUserData();

        // console.log("Photo Url", user.photoURL);

        if (user.photoURL) {
            // console.log("Photo Found");
            setProfileImageUrl(user.photoURL); 
        }
        else{
            console.log("Photo not found");
        }

    } else {
        console.log("No user is currently logged in.");

        setProfileImageUrl(null);
    }
    }, [user]);

    const retrieveUserData = async () => {
    try{
        const response = await axios.post("http://localhost:5000/api/users/getUserData", {
            UID: user.uid
            }, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(`User Name: ${response.data.name}`);
        // setUserName(response.data.name);
    }
    catch(error){
        console.error("Error Fetching User Data:", error.message);
    }
    };

    const Logout = () => {
        const auth = getAuth();
        signOut(auth)
          .then(() => {
            console.log("User logged out successfully.");
    
            navigate("/login");
          })
          .catch((error) => {
            console.error("Error during sign out:", error.message);
          });
      };
    
    return (
        <>
            <div className="body-division">
                <div className="nav-bar">
                    <div className="menu-button">
                        <img src="/menu-icon.png" alt="Menu" className="icon-image" />
                        <p className="logo">BrandSight </p>
                    </div>

                    <div className="profile-img">
                        <img 
                            src={profileImageUrl || "/default-avatar.png"} 
                            alt="Profile Image" 
                            className="user-image" 
                        /> 
                    </div>
                </div>

                <div className="sidebar">
                    <div className="sidebar-upper">
                        <div className="nav-link" style={{ marginTop: '10px' }}>
                            <img src="/home-icon.png" alt="Dashboard" className="icon-image" />
                            {/* <a href="">Dashboard</a>  */}
                        </div>
                        <div className="nav-link">
                            <img src="/analysis-icon.png" alt="Analyze" className="icon-image" />
                            {/* <a href="">Analyze New Brand</a> */}
                        </div>
                        <div className="nav-link">
                            <img src="/history-icon.png" alt="History" className="icon-image" />
                            {/* <a href="">Previous Analyses</a> */}
                        </div>
                    </div>

                    <div className="sidebar-bottom">
                        <div className="nav-link">
                            <img src="/settings-icon.png" alt="Settings" className="icon-image" onClick={Logout} />
                            {/* <a href="">Settings</a>  */}
                        </div>
                        {/* <div className="nav-link">
                            <img src="/logout-icon.png" alt="Logout" className="icon-image" />
                            <a href="">Logout</a>
                        </div>  */}
                    </div>
                </div>

                <div className="main-panel">
                
                    <p className="heading">Analyze a Brand's Reputation</p>
                    <p className="sub-heading">Get real-time sentiment insights from app or store reviews</p>
                    <input type="text" className="url-field" placeholder="Enter URL" />
                
                    <button className="fetch-btn">Fetch & Analyze ➜</button>
        
                    {/* <div className="overview">
                        <p className='over-heading'>Overview</p>

                        <div className='results'>
                            <div className='sentiment-category'>Negative: 10%</div>
                            <div className='sentiment-category'>Neutral: 30%</div>
                            <div className='sentiment-category'>Positive: 60%</div>
                        </div>

                        <p className='over-text'>Most users had a positive experience overall.</p>
                    </div>
        
                    <div className="review-breakdown">
                        <p className='over-heading'>Rewiew Breakdown</p>

                        <div className='results'>
                            <div className='sentiment-category'>Negative &gt;</div>
                            <div className='sentiment-category'>Neutral &gt;</div>
                            <div className='sentiment-category'>Positive &gt;</div>
                        </div>

                    </div>
        
                    <div className="keywords">
                        <p className='over-heading'>Keywords</p>

                        <div className='keyword-container'>
                            <div className='keyword'>Happy</div>
                            <div className='keyword'>Sad</div>
                            <div className='keyword'>Bad</div>
                            <div className='keyword'>Excellent</div>
                            <div className='keyword'>Amazing</div>
                            <div className='keyword'>Bug</div>
                            <div className='keyword'>Glitch</div>
                            <div className='keyword'>Lag</div>
                            <div className='keyword'>Slow</div>
                            <div className='keyword'>Perfect</div>
                            <div className='keyword'>Fix</div>
                            <div className='keyword'>Happy</div>
                            <div className='keyword'>Happy</div>
                            <div className='keyword'>Happy</div>
                            <div className='keyword'>Happy</div>
                            <div className='keyword'>Happy</div>
                        </div>
                    </div>
                    

                    <div className="suggestions">
                        <p className='over-heading'>Suggestions</p>

                        <p className='suggestion'>Users are not able to login, there is a but in the login syatem fix it to increase your brand reputation</p>
                    </div>  */}
                    
                </div>

            </div>
        </>
    );
};
  
export default Home;