import React, {useState, useRef, useEffect} from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import './home.css';
import useCurrentUser from "./currentUser";

const Home = () => {
    const user = useCurrentUser();
    const navigate = useNavigate();
    
    const [username, setUsername] = useState("User");
    const [profileImageUrl, setProfileImageUrl] = useState("");
    const [brandURL, setBrandURL] = useState("");
    const [reviewNumber, setReviewNumber] = useState(10);

    const [result, setResult] = useState({
        title: "",
        icon: "",
        description: "",
        reviews: [],
        keywords: [],
        sentiment_distribution: {},
        suggestions: []
    });

    const [history, setHistory] = useState([]);
    const [desiredReport, setDesiredReport] = useState([]);
    
    const [gotResult, setGotResult] = useState(false);

    const [expandNegative, setExpandNegative] = useState(false);
    const [expandNeutral, setExpandNeutral] = useState(false);
    const [expandPositive, setExpandPositive] = useState(false);

    const [toogleSidebar, setToogleSidebar] = useState(false);
    const [viewDashboard, setViewDashboard] = useState(true);
    const [viewHistory, setViewHistory] = useState(false);
    const [viewReport, setViewReport] = useState(false);

    useEffect(() => {
    if (user) {

        console.log("Logged in user:", user.email);
        // console.log("User object:", user.uid);

        retrieveUserData();

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
        const firstName = response.data.name.split(" ")[0];
        setUsername(firstName);
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
    
    const analyzeBrand = async () => {

        setGotResult(false);

        const playStoreRegex = /^https:\/\/play\.google\.com\/store\/apps\/details\?id=[\w\.]+/;
        const mapsRegex = /^https:\/\/www\.google\.[a-z.]+\/maps\/place\/[^\/]+\/@[\d.,z]+\/data=/;

        let brandURLType = "";

        if (playStoreRegex.test(brandURL)) {
            brandURLType = "PlayStoreApp";
        } 
        else if (mapsRegex.test(brandURL)) {
            brandURLType = "GoogleMapsPlace";
        } 
        else {
            brandURLType = "Unknown Type";
        }

        console.log("Analysis Started");
        
        try{
            const response = await axios.post("http://localhost:5000/api/nlpModel/analyze", {
                UID: user.uid,
                brandURL,
                brandURLType,
                reviewNumber,
                }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("Analysis Report:", response.data);

            setResult({
                title: response.data.title,
                icon: response.data.icon,
                description: response.data.description,
                reviews: response.data.analyzed_reviews,
                keywords: response.data.keywords,
                sentiment_distribution: response.data.sentiment_distribution,
                suggestions: response.data.suggestions
            });

            setGotResult(true);
        }
        catch(error){
            console.error("Error Fetching User Data:", error.message);
        }
    };

    const expandReviews = (f) => {

        if (f === "neg"){
            setExpandNegative(!expandNegative);
            setExpandNeutral(false);
            setExpandPositive(false);
        }
        else if(f === "neu"){
            setExpandNegative(false);
            setExpandNeutral(!expandNeutral);
            setExpandPositive(false);
        }
        else if(f === "pos"){
            setExpandNegative(false);
            setExpandNeutral(false);
            setExpandPositive(!expandPositive);
        }
    };

    const ToogleSideBar = () => {
        setToogleSidebar(!toogleSidebar);
    };

    const ViewDashboard = () => {
        setViewReport(false);
        setViewHistory(false);
        setViewDashboard(true);
    }

    const Suggestions = ({ suggestions }) => {
        return (
        <section className="suggestion-section">    
            {suggestions.map((s, idx) => {

            const [rawHeading, ...rest] = s.split(':');
            const heading = rawHeading.trim();               
            const body = rest.join(':');                      
            const points = body.split(/\n-\s*/).filter(Boolean); 
    
            return (
                <article key={idx} className="suggestion-block">
                <h4>{heading}:</h4>
                <ul>
                    {points.map((p, i) => (
                    <li key={i}>{p.trim()}</li>
                    ))}
                </ul>
                </article>
            );
            })}
        </section>
        );
    }

    const ViewHistory = async () => {
        setViewDashboard(false);
        setViewHistory(true);

        try{
            const historyResponse = await axios.post("http://localhost:5000/api/users/getHistory", {
                UID: user.uid
                }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            console.log(historyResponse.data["data"]);

            setHistory(historyResponse.data["data"]);
            
        }
        catch(error){
            console.error("Error Fetching User Data:", error.message);
        }
    };
    
    const formatDate = iso => {
        const d = new Date(iso);
    
        const day   = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year  = d.getFullYear();
    
        let hours   = d.getHours();              // 0‑23
        const mins  = String(d.getMinutes()).padStart(2, '0');
    
        const ampm  = hours >= 12 ? 'PM' : 'AM';
        hours       = hours % 12 || 12;          // 0 → 12, 13 → 1, etc.
    
        return `${day}-${month}-${year} ${hours}:${mins} ${ampm}`;
    };
    
    const OpenReport = (key) =>{
        
        const selectedReport = history.find(report => report["_id"] === key);

        setDesiredReport(selectedReport);

        setViewHistory(false);
        setViewReport(true);

        console.log(selectedReport);
    }
      
    return (
        <>
            <div className="body-division">
                <div className="nav-bar">
                    <div className="menu-button">
                        <img src="/menu-icon.png" alt="Menu" className="icon-image" onClick={ToogleSideBar}/>
                        <p className="logo">BrandSight </p>
                    </div>

                    <div className="profile-section">
                        <p className="user-name">{username}</p>
                        <div className="profile-img">
                            <img 
                                src={profileImageUrl || "/default-avatar.png"} 
                                alt="Profile Image" 
                                className="user-image" 
                                referrerPolicy="no-referrer"
                            /> 
                        </div>
                    </div>
                    
                </div>

                <div className="sidebar">
                    <div className="sideBar-left-part">
                        <div className="sidebar-upper">
                            <div className="nav-link-img">
                                <img src="/home-icon.png" alt="Dashboard" className="icon-image" onClick={ViewDashboard} style={{marginTop: '0px', borderTop: '2px solid black'}}/>
                            </div>
                            <div className="nav-link-img">
                                <img src="/analysis-icon.png" alt="Analyze" className="icon-image" />
                            </div>
                            <div className="nav-link-img">
                                <img src="/history-icon.png" alt="History" className="icon-image" onClick={ViewHistory}/>
                            </div>
                        </div>

                        <div className="sidebar-bottom"> 
                            <div className="nav-link-img">
                                <img src="/settings-icon.png" alt="Settings" className="icon-image" onClick={Logout} />
                            </div>
                        </div>
                    </div>

                    <div className="sideBar-right-part">
                        <div className="sidebar-upper">
                            <div className="nav-link-label">
                                {toogleSidebar && <a href="">Dashboard</a>} 
                            </div>
                            <div className="nav-link-label">
                                {toogleSidebar && <a href="">Analyze</a>}
                            </div>
                            <div className="nav-link-label">
                                {toogleSidebar && <a href="">History</a>}
                            </div>
                        </div>

                        <div className="sidebar-bottom"> 
                            <div className="nav-link-label">
                                {toogleSidebar && <a href="">Settings</a>}
                            </div>
                        </div>
                    </div>
                </div>

                {viewDashboard && <div className="main-panel">
                
                    <p className="heading">Analyze a Brand's Reputation</p>
                    <p className="sub-heading">Get real-time sentiment insights from app or store reviews</p>
                    <input 
                        type="text" 
                        className="url-field" 
                        placeholder="Enter URL" 
                        value={brandURL} 
                        onChange={(e) => setBrandURL(e.target.value)}/>

                    <div className="range-selection">
                        <label>Number of latest reviews to Analyze: </label>
                        <input 
                            type="number"
                            className="review-number-input" 
                            value={reviewNumber} 
                            onChange={(e) => setReviewNumber(e.target.value)}/>
                    </div>
                    
                    <button className="fetch-btn" onClick={analyzeBrand}>Fetch & Analyze ➜</button>

                    {gotResult && <div className="result-container">
                        <div className="overview">
                            <p className='over-heading'>Overview</p>

                            <div className="about-brand">
                                <img src={result.icon} alt="Brand Image" className="brand-image"/>
                                <div className="about-brand-content">
                                    <p>Title: {result.title}</p>
                                    <p>Description: {result.description}</p>
                                </div>

                            </div>
                        
                            <div className='over-results'>
                                <div className='sentiment-category'>Negative: {result.sentiment_distribution['negative']}%</div>
                                <div className='sentiment-category'>Neutral: {result.sentiment_distribution['neutral']}%</div>
                                <div className='sentiment-category'>Positive: {result.sentiment_distribution['positive']}%</div>
                            </div>

                            <p className='over-text'>Most users had a positive experience overall.</p>
                        </div>
            
                        <div className="suggestions">
                            <p className='over-heading'>Suggestions</p>

                            <Suggestions suggestions={result.suggestions} />

                        </div> 
                        
                        {/* <div className="keywords">
                            <p className='over-heading'>Keywords</p>

                            <div className='keyword-container'>
                                {result.keywords.map(keyword => (<div className='keyword'>{keyword}</div>))}
                            </div>

                        </div> */}

                        <div className="review-breakdown">
                            <p className='over-heading'>Manual Analysis</p>

                            <div className='results'>
                                <div className="expand-btns">
                                    <div className='sentiment-category-e' onClick={() => expandReviews("neg")}>Negative &gt;</div>
                                    <div className='sentiment-category-e' onClick={() => expandReviews("neu")}>Neutral &gt;</div>
                                    <div className='sentiment-category-e' onClick={() => expandReviews("pos")}>Positive &gt;</div>
                                </div>
                                
                                <div className="reviews">
                                    {expandNegative && 
                                        (result.reviews.filter(review => (review["sentiment"] === 'NEGATIVE')).map(review => (<div className='review'>{review["review"]}</div>)))
                                    }
                                    {expandNeutral &&
                                        (result.reviews.filter(review => (review["sentiment"] === 'NEUTRAL')).map(review => (<div className='review'>{review["review"]}</div>)))
                                    }
                                    {expandPositive &&
                                        (result.reviews.filter(review => (review["sentiment"] === 'POSITIVE')).map(review => (<div className='review'>{review["review"]}</div>)))
                                    }
                                </div>
                            </div>

                        </div>

                    </div>}

                </div>}

                {viewHistory && <div className="main-panel" style={{justifyContent: "flex-start"}}>

                    {history.map((report) => (
                        <div className="reports-container" key={report._id} onClick={() => OpenReport(report._id)}>
                            <div className="report">
                                <img src={report["icon"]} alt="Brand Image" className="brand-image"/>
                                <div className="about-brand-content">
                                    <p>Title: {report["title"]}</p>
                                    <p>Reviews Analyzed: {report["analyzed_reviews"].length}</p>
                                    <p>{formatDate(report["createdAt"])}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>}

                {viewReport && <div className="main-panel">
                    <div className="result-container">
                        <div className="overview" style={{marginTop:'0px', marginRight:'5px'}}>
                            <p className='over-heading'>Overview</p>

                            <div className="about-brand">
                                <img src={desiredReport["icon"]} alt="Brand Image" className="brand-image"/>
                                <div className="about-brand-content">
                                    <p>Title: {desiredReport["title"]}</p>
                                    <p>Description: {desiredReport["description"]}</p>
                                </div>
                            </div>
                        
                            <div className='over-results'>
                                <div className='sentiment-category'>Negative: {desiredReport["sentiment_distribution"]['negative']}%</div>
                                <div className='sentiment-category'>Neutral: {desiredReport["sentiment_distribution"]['neutral']}%</div>
                                <div className='sentiment-category'>Positive: {desiredReport["sentiment_distribution"]['positive']}%</div>
                            </div>

                            <p className='over-text'>Most users had a positive experience overall.</p>
                        </div>
            
                        <div className="suggestions" style={{marginTop:'20px', marginBottom:'0px', marginRight:'5px'}}>
                            <p className='over-heading'>Suggestions</p>

                            <Suggestions suggestions={desiredReport["suggestions"]} />

                        </div> 
                        
                        {/* <div className="keywords">
                            <p className='over-heading'>Keywords</p>

                            <div className='keyword-container'>
                                {result.keywords.map(keyword => (<div className='keyword'>{keyword}</div>))}
                            </div>

                        </div> */}

                        <div className="review-breakdown" style={{marginTop:'20px', marginBottom:'20px', marginRight:'5px'}}>
                            <p className='over-heading'>Manual Analysis</p>

                            <div className='results'>
                                <div className="expand-btns">
                                    <div className='sentiment-category-e' onClick={() => expandReviews("neg")}>Negative &gt;</div>
                                    <div className='sentiment-category-e' onClick={() => expandReviews("neu")}>Neutral &gt;</div>
                                    <div className='sentiment-category-e' onClick={() => expandReviews("pos")}>Positive &gt;</div>
                                </div>
                                
                                <div className="reviews">
                                    {expandNegative && 
                                        (desiredReport["analyzed_reviews"].filter(review => (review["sentiment"] === 'NEGATIVE')).map(review => (<div className='review'>{review["review"]}</div>)))
                                    }
                                    {expandNeutral &&
                                        (desiredReport["analyzed_reviews"].filter(review => (review["sentiment"] === 'NEUTRAL')).map(review => (<div className='review'>{review["review"]}</div>)))
                                    }
                                    {expandPositive &&
                                        (desiredReport["analyzed_reviews"].filter(review => (review["sentiment"] === 'POSITIVE')).map(review => (<div className='review'>{review["review"]}</div>)))
                                    }
                                </div>
                            </div>

                        </div>

                    </div>
                </div>}

            </div>
        </>
    );
};
  
export default Home;