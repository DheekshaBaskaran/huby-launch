import mongoose from 'mongoose';

const MetaPromptSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    default: 'Meta AI',
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  usageCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.MetaPrompt || mongoose.model('MetaPrompt', MetaPromptSchema);
