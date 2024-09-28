// src/models/searchModel.js
import mongoose from 'mongoose';

const searchTermSchema = new mongoose.Schema({
  title: { type: String, required: true },
  count: { type: Number, default: 1 },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' } 
}, { timestamps: true });

const SearchTerm = mongoose.model('SearchTerm', searchTermSchema);

export default SearchTerm;
