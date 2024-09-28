import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineLogin, AiOutlineUserAdd, AiOutlineLogout, AiOutlineSetting } from 'react-icons/ai';
import { LuLayoutDashboard, LuUser } from 'react-icons/lu';
import { IoCreateOutline } from "react-icons/io5";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faUserCircle, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { RxDashboard } from "react-icons/rx";
import Cookies from 'js-cookie';

const Sublinlk = () => {
    const location = useLocation();

    // const navigate = useNavigate();

    const handleLogout = () => {
        // Remove user data from cookies
        Cookies.remove('token');
        Cookies.remove('userName');
        Cookies.remove('userEmail');
    
        // Remove user data from local storage
        localStorage.removeItem('user');
    
        // Reload the page or redirect to login page
        window.location.reload();
    };
    

    const isLoggedIn = !!Cookies.get('token');

    return (
        <>
            {isLoggedIn ? (
                <div className="sub-line">
                    <ul>
                    <li><NavLink to="/blogger" title="Dashboard"> <FontAwesomeIcon icon={faPenToSquare} /> <span>Post</span></NavLink></li>
                        <li><NavLink to="/dashboard" title="Dashboard"> <FontAwesomeIcon icon={faUserCircle} /> <span>Account</span></NavLink></li>
                        <li><NavLink to="/settings" title="Settings"><FontAwesomeIcon icon={faGear} /> <span>Settings</span></NavLink></li>
                        <li><button onClick={handleLogout} title="Logout"><FontAwesomeIcon icon={faRightFromBracket} />  <span>Logout</span></button></li>
                    </ul>
                </div>
            ) : (
                <div className="sub-line">
                    <ul>
                        <li><NavLink to="/login" state={{ from: location }} ><AiOutlineLogin /> Log in</NavLink></li>
                        <li><NavLink to="/register" state={{ from: location }} ><AiOutlineUserAdd /> Sign up</NavLink></li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default Sublinlk;
