import Post from '../models/postModel.js';

// Create a new post
export const createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = new Post({ title, content });
    await newPost.save();
    res.status(201).json({ message: 'Post saved successfully!' });
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ message: 'Failed to save post.' });
  }
};

// Fetch all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts from the database
    res.json(posts); // Send posts as JSON response
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts.' });
  }
};

// Fetch a post by ID
export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Failed to fetch post.' });
  }
};

// Update a post by ID
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (updatedPost) {
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Failed to update post.' });
  }
};

// Delete a post by ID
export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (deletedPost) {
      res.json({ message: 'Post deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Failed to delete post.' });
  }
};
