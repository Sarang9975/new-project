import React, { useEffect, useRef } from 'react';
import Vivus from 'vivus';

import './Roadmap.css'; // Ensure Tailwind CSS is imported
const Roadmap = () => {
  return (
    <div className='h-[600px] w-full bg-black'>
      <div className="wrapper">
  <h1 className='text-yellow-400'>coming soon<span className="dot">.</span></h1>
  <p>Put some text here.</p>
<div className="icons">
    <a href="https://t.me/qudracommunity"><i className="ri-telegram-fill"></i></a>
    <a href="https://x.com/qudracommunity
"><i className="ri-twitter-x-line"></i></a>
    <a href="https://youtube.com/@qudracommunity?si=ERGWqPKRKmPY_pm2"><i className="ri-youtube-fill"></i></a>
    <a href="
https://www.instagram.com/qudracommunity?igsh=dGRtZTJibDBzczg="><i className="ri-instagram-line"></i></a>
  </div>
 </div>
    </div>
  
  );
}
 


export default Roadmap;
