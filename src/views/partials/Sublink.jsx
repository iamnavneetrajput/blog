import React from "react";
import { NavLink } from "react-router-dom";

const Sublinlk = () => {
    return (
        <>
            <div className="sub-line">
                <ul>
                    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                    <li><NavLink to="/account">Account</NavLink></li>
                    <li><NavLink to="/logout">Logout</NavLink></li>
                </ul>
            </div>
        </>
    )
}

export default Sublinlk; 