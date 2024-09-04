// models/BlogModel.js
const mongoose = require('mongoose');

// Define the blog post schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: Array,
    required: true,
  },
  labels: {
    type: [String],
    required: true,
  },
  publishedOn: {
    type: Date,
    default: Date.now,
  },
  permalink: {
    type: String,
    required: true,
    unique: true,
  },
});

// Create the BlogPost model
const BlogPost = mongoose.model('BlogPost', blogSchema);

module.exports = BlogPost;
