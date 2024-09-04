import React from 'react'
import { AiOutlineEdit } from "react-icons/ai";

function Comments() {
  return (
    <div className="div3 usercard" data-category="comments-replies">
    <h3>Your Comments & Replies</h3>
    <ul>
        <li>Comment 1 <button className="comment-button"><AiOutlineEdit /></button></li>
        <li>Comment 2 <button className="comment-button"><AiOutlineEdit /></button></li>
        <li>Comment 3 <button className="comment-button"><AiOutlineEdit /></button></li>
        <li>Comment 4 <button className="comment-button"><AiOutlineEdit /></button></li>
        <li>Comment 5 <button className="comment-button"><AiOutlineEdit /></button></li>
        <li>Comment 6 <button className="comment-button"><AiOutlineEdit /></button></li>
    </ul>
</div>
  )
}

export default Comments
