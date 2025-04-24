const gplay = require("google-play-scraper").default;
const axios = require("axios");

const Report = require('../models/Report')

const saveReport = async (reportData) => {
  console.log('Saving report in DB');

  // 1)  Construct a Mongoose document
  const report = new Report(reportData);

  // 2)  Try to save and bubble up errors so the caller can decide
  try {
    const saved = await report.save();   // ← inserts into MongoDB
    console.log('Report saved with id:', saved._id.toString());
  } catch (err) {
    console.error('Failed to save report:', err.message);
    throw err;                           // let caller decide how to respond
  }
};

const getAppIdFromUrl = (brandURL) => {
  try {
    const parsedUrl = new URL(brandURL);
    return new URLSearchParams(parsedUrl.search).get('id');
  } catch (e) {
    return null;
  }
};

const analyzeSentiment = async (uid, reviews, title, icon, description) => {
  try {
      const response = await axios.post("http://localhost:5001/analyze", { uid, reviews, title, icon, description });

      await saveReport(response.data);
      console.log("Saved report in DB");

      return response.data;
  } catch (error) {
      console.error("Error calling sentiment analysis API:", error.message);
      return 0;
  }
};

const analyze = async (req, res) => {
  const { UID,  brandURL, brandURLType, fromDate, tillDate } = req.body;

  if (brandURLType === "PlayStoreApp") {
    const appID = getAppIdFromUrl(brandURL);

    try {
      const raw = await gplay.app({ appId: appID });
      const about = {
        title: raw.title,
        icon: raw.icon,
        description: raw.description,
      };
      
      //console.log("Title: ",about.title);
      //console.log("Summary: ",about.description); 

      const reviews = await gplay.reviews({
        appId: appID,
        sort: gplay.sort.NEWEST, 
        num: 1, 
      });
      const formattedReviews = reviews.data.map(review => ({
        user: review.userName,  
        rating: review.score,   
        review: review.text    
      }));
      
      //console.log("Fetched Review: ",formattedReviews);  

      console.log("Scrapped brand description and Reviews.");
      console.log("Sent for analysis");

      const analysisOutput = await analyzeSentiment(UID, formattedReviews, about.title, about.icon, about.description);

      //console.log("Analyzed Output: ",analysisOutput);

      res.json(analysisOutput);

    } catch (err) {
      console.error("Error fetching Google Play reviews:", err.message);
    }
  }
};

module.exports = { analyze };
