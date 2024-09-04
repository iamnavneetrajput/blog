import React from 'react'
import { AiOutlineLike } from "react-icons/ai";

export default function LikedPost() {
  return (
      <div className="div4 usercard" data-category="liked-posts">
        <h3>Liked Posts</h3>
        <ul>
          <li>Post 1 <button className="like-button"><AiOutlineLike /></button></li>
          <li>Post 2 <button className="like-button"><AiOutlineLike /></button></li>
          <li>Post 3 <button className="like-button"><AiOutlineLike /></button></li>
        </ul>
      </div>
  )
}
