// src/controllers/searchController.js
import Post from '../models/postModel.js';
import SearchTerm from '../models/searchModel.js';

export const searchPosts = async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ message: 'Query is required' });
    }

    const posts = await Post.find({ title: { $regex: query, $options: 'i' } });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const recordSearchTerm = async (req, res) => {
  try {
    const { title, postId } = req.body;
    if (!title || !postId) {
      return res.status(400).json({ message: 'Title and post ID are required' });
    }

    let searchTerm = await SearchTerm.findOne({ postId });

    if (searchTerm) {
      searchTerm.count += 1;
    } else {
      searchTerm = new SearchTerm({ title, postId, count: 1 });
    }

    await searchTerm.save();
    res.status(200).json({ message: 'Search term recorded successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTopSearchedPosts = async (req, res) => {
  try {
    const topSearchedTerms = await SearchTerm.find()
      .sort({ count: -1 })
      .limit(3)
      .populate('postId', 'title') // Ensure this is correct
      .exec();

    const formattedTerms = topSearchedTerms.map(term => ({
      ...term._doc,
      postId: term.postId._id // Ensure postId is in the correct format
    }));

    res.status(200).json(formattedTerms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
