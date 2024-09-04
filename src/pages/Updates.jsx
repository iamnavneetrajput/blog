import React from 'react'
import { AiOutlineEye } from "react-icons/ai";

function Updates() {
    return (
        <div className="div6 usercard" data-category="notifications-updates">
            <h3>Notifications/Updates</h3>
            <ul>
                <li>Update 1: New comment on your post. <button className="updates-button"><AiOutlineEye /></button></li>
                <li>Update 2: Your article was liked by User X. <button className="updates-button"><AiOutlineEye /></button></li>
                <li>Notification 3: You have a new follower. <button className="updates-button"><AiOutlineEye /></button></li>
            </ul>
        </div>
    )
}

export default Updates
