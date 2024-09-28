// src/controllers/postController.js
import Category from '../models/categoryModel.js';
import Post from '../models/postModel.js';

// Create a new post
export const createPost = async (req, res) => {
  try {
    const { title, content, categoryName, status = 'draft' } = req.body;

    // Find the category by name
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }

    // Create a new post
    const newPost = new Post({
      title,
      content,
      status,
      category: category._id,
    });

    // Save the post
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('category', 'name'); // Populate category to include the category name
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get the latest three articles
export const getRecentArticles = async (req, res) => {
  try {
    // Fetch the latest three posts sorted by publish date
    const posts = await Post.find()
      .sort({ publishDate: -1 })
      .limit(3)
      .populate('category', 'name'); // Populate the category field to include the category name

    if (posts.length === 0) {
      return res.status(200).json({ message: 'No posts available' });
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a post by ID
export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate('category', 'name');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
