import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['published', 'draft', 'archived'],
    default: 'draft'
  }
});

const Post = mongoose.model('Post', postSchema);

export default Post;
