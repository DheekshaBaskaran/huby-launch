import mongoose from 'mongoose';

const BotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  prompt: {
    type: String,
    required: true,
    trim: true
  },
  personality: {
    type: String,
    trim: true,
    default: ''
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  weirdness: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  creator: {
    type: String,
    required: true,
    trim: true
  },
  responses: [{
    type: String,
    trim: true
  }],
  isExample: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
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

// Update the updatedAt field on save
BotSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Bot || mongoose.model('Bot', BotSchema);
