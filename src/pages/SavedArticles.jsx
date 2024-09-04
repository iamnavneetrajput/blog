import React from 'react';
import { AiOutlineDelete } from "react-icons/ai";

const SavedArticles = () => (
  <div className="div2 usercard" data-category="saved-articles">
    <h3>Saved Articles</h3>
    <ul>
      <li>Article 1 <button className="delete-button"><AiOutlineDelete /></button></li>
      <li>Article 2 <button className="delete-button"><AiOutlineDelete /></button></li>
      <li>Article 3 <button className="delete-button"><AiOutlineDelete /></button></li>
    </ul>
  </div>
);

export default SavedArticles;
