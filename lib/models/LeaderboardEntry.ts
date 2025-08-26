import mongoose from 'mongoose';

const LeaderboardEntrySchema = new mongoose.Schema({
  botId: {
    type: String,
    required: true,
    trim: true
  },
  botName: {
    type: String,
    required: true,
    trim: true
  },
  creator: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  points: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  wins: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  losses: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  draws: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  totalMatches: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  winRate: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 0
  },
  lastMatch: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
LeaderboardEntrySchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.LeaderboardEntry || mongoose.model('LeaderboardEntry', LeaderboardEntrySchema);
