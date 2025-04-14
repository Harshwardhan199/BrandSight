const gplay = require("google-play-scraper").default;
const axios = require("axios");

const getAppIdFromUrl = (brandURL) => {
  try {
    const parsedUrl = new URL(brandURL);
    return new URLSearchParams(parsedUrl.search).get('id');
  } catch (e) {
    return null;
  }
};

const analyzeSentiment = async (reviews, summary) => {
  try {
      const response = await axios.post("http://localhost:5001/analyze", { reviews, summary });
      return response.data;
  } catch (error) {
      console.error("Error calling sentiment analysis API:", error.message);
      return 0;
  }
};

const analyze = async (req, res) => {
  const { brandURL, brandURLType } = req.body;

  if (brandURLType === "PlayStoreApp") {
    const appID = getAppIdFromUrl(brandURL);

    try {
      const reviews = await gplay.reviews({
        appId: appID,
        sort: gplay.sort.NEWEST, 
        num: 5, 
      });

      const formattedReviews = reviews.data.map(review => ({
        user: review.userName,  
        rating: review.score,   
        review: review.text    
      }));
      
      console.log("Fetched Review: ",formattedReviews);  

      //get some actual summary
      const summary = "A trendy fashion e-commerce app for young adults."

      const analysisOutput = await analyzeSentiment(formattedReviews, summary);

      console.log("Analyzed Output: ",analysisOutput);

      res.json(analysisOutput);

    } catch (err) {
      console.error("Error fetching Google Play reviews:", err.message);
    }
  }
};

module.exports = { analyze };
