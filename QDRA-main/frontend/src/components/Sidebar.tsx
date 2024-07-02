import React, { useState } from 'react';
import './sidebar.css'; 
import { userInfo } from 'os';
import { useAuth0 } from '@auth0/auth0-react';
import { Auth0Client, User } from '@auth0/auth0-spa-js';
const Sidebar: React.FC = () => {
  
  const [isActive, setIsActive] = useState(false);
  const { user, isAuthenticated } = useAuth0();
  const toggleSidebar = () => {
    setIsActive(!isActive);
  };

  const handleMenuItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const clickedItem = e.currentTarget;
    // Toggle active class on clicked menu item
    clickedItem.classList.toggle('active');
    // Toggle visibility of submenu
    const submenu = clickedItem.querySelector('ul');
    if (submenu) {
      submenu.classList.toggle('active');
    }
    // Close other submenus if open
    const siblings = Array.from(clickedItem.parentElement!.children).filter(child => child !== clickedItem);
    siblings.forEach(sibling => {
      sibling.classList.remove('active');
      const siblingSubmenu = sibling.querySelector('ul');
      if (siblingSubmenu) {
        siblingSubmenu.classList.remove('active');
      }
    });
  };


  return (
    <div className= {`container ${isActive ? 'active' : ''}  bg-[#850F8D] text-[#fff]`} >
      <div className={`sidebar ${isActive ? 'active' : ''}`}>
        <div className="menu-btn" onClick={toggleSidebar}>
        <i className="ri-arrow-right-fill"></i>
        </div>
        <div className="head ">
          <div className="user-img">
            <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTUzMjAyMTh8&ixlib=rb-4.0.3&q=85" alt="" />
          </div>
          <div className="user-details">
            <p className="title">QUDRA Community</p>
            {isAuthenticated ? (
        <p>{user?.name}</p>
      ) : (
        <p className=' text-sm'>Please log in</p>
      )}
          </div>
        </div>
        <div className="nav">
          <div className="menu">
            <p className="title ">Main</p>
            <ul>
              <li onClick={handleMenuItemClick}><a href="/mission"><i className="icon ph-bold ph-house-simple"></i><span className="text">Misson</span></a></li>
              <li onClick={handleMenuItemClick}><a href="/upgrade"><i className="icon ph-bold ph-user"></i><span className="text">Upgrade</span><i className="arrow ph-bold ph-caret-down"></i></a>
                <ul className="sub-menu">
                  <li><a href="#"><span className="text">Users</span></a></li>
                  <li><a href="#"><span className="text">Subscribers</span></a></li>
                </ul>
              </li>
              <li onClick={handleMenuItemClick}><a href="/referral"><i className="icon ph-bold ph-calendar-blank"></i><span className="text">Referral</span></a></li>
              <li onClick={handleMenuItemClick}><a href="/roadmap"><i className="icon ph-bold ph-chart-bar"></i><span className="text">Roadmap</span><i className="arrow ph-bold ph-caret-down"></i></a>
                
              </li>
            </ul>
          </div>
          
        </div>
        <div className="menu">
          <p className="title">Account</p>
          <ul>
            <li><a href="#"><i className="icon ph-bold ph-info"></i><span className="text">FAQ</span></a></li>
            <li><a href="/logout"><i className="icon ph-bold ph-sign-out"></i><span className="text">Logout</span></a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
