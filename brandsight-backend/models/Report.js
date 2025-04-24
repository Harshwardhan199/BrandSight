const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  confidence: { type: Number, required: true },
  keywords: [{ type: String }],
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  sentiment: { type: String, enum: ['POSITIVE', 'NEGATIVE', 'NEUTRAL'], required: true },
  user: { type: String, required: true }
});

const sentimentDistributionSchema = new mongoose.Schema({
  negative: { type: Number, required: true },
  neutral: { type: Number, required: true },
  positive: { type: Number, required: true }
});

const analysisReportSchema = new mongoose.Schema({
  uid: { type: String},
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  keywords: [{ type: String }],
  sentiment_distribution: sentimentDistributionSchema,
  analyzed_reviews: [reviewSchema],
  suggestions: [{ type: String }],
  success: { type: Boolean, required: true }
},
{
  timestamps: true   // ← adds createdAt & updatedAt
});

module.exports = mongoose.model('AnalysisReport', analysisReportSchema);