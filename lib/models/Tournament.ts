import mongoose from 'mongoose';

const TournamentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  maxParticipants: {
    type: Number,
    required: true,
    min: 1
  },
  currentParticipants: {
    type: Number,
    default: 0,
    min: 0
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled', 'upcoming'],
    default: 'active'
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  prize: {
    type: String,
    required: true,
    trim: true
  },
  rules: [{
    type: String,
    trim: true
  }],
  participants: [{
    type: String,
    trim: true
  }],
  winner: {
    type: String,
    trim: true,
    default: null
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
TournamentSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Tournament || mongoose.model('Tournament', TournamentSchema);
