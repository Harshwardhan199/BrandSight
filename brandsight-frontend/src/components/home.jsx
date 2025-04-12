import './home.css'

const Home = () => {

    return (
        <>
            <div className="body-division">
                <div className="nav-bar">
                    <div className="menu-button">
                        <img src="/menu-icon.png" alt="Menu" className="icon-image" />
                        <p className="logo">BrandSight </p>
                    </div>

                    <div className="profile-img">
                        {/* <img src="" alt="" className="user-image">  */}
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
                            <img src="/settings-icon.png" alt="Settings" className="icon-image" />
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
        
                    <div className="overview">
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
                    </div> 
                    
                </div>

            </div>
        </>
    )
}
  
export default Home;