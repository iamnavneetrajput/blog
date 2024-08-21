import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineLogin, AiOutlineUserAdd, AiOutlineLogout, AiOutlineSetting } from "react-icons/ai";
import { LuLayoutDashboard, LuUser } from "react-icons/lu";

const Sublinlk = () => {
    return (
        <>
            <div className="sub-line">
                <ul>
                    <li><NavLink to="/login"><AiOutlineLogin /> Log in</NavLink></li>
                    <li><NavLink to="/register"><AiOutlineUserAdd /> Sign up</NavLink></li>
                </ul>
            </div>


            {/* <div className="sub-line">
                <ul>
                    <li><NavLink to="/login" title="Dashboard"><LuLayoutDashboard /> <span>Dashboard</span></NavLink></li>
                    <li><NavLink to="/register" title="Account"><LuUser /> <span>Account</span></NavLink></li>
                    <li><NavLink to="/register" title="Setting"><AiOutlineSetting /> <span>Setting</span></NavLink></li>
                    <li><NavLink to="/register" title="Logout"><AiOutlineLogout /> <span>Logout</span></NavLink></li>
                </ul>
            </div> */}
        </>
    )
}

export default Sublinlk; 