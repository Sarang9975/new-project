import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import coin3 from '../images/coin3.png';
import './Mission.css';

const Mission = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [backgroundColor, setBackgroundColor] = useState<string>('');

  const handleFollow = (platform: string) => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      // Add your logic to reward the user with coins
      // This can be an API call to your backend
      alert(`You followed ${platform}! Coins rewarded.`);
    }
  };

  const handleMouseEnter = (color: string) => {
    setBackgroundColor(color);
  };

  const handleMouseLeave = () => {
    setBackgroundColor('');
  };

  return (
    <div className="container mx-auto py-auto flex flex-col h-[700px] text-white bg-[#151515]">
      <h2 className="text-[27px] mb-6 text-start py-8 w-auto leading-6 h-[40px] font-semibold text-white"><span className='text-[#F4CE14]'>Follow Us</span> and Get Rewarded!</h2>
      <div className="main flex flex-wrap flex-col justify-start w-full h-[full] relative" id="social-section" style={{ backgroundColor }}>
        <img className="flex flex-wrap absolute  left-[20%] top-[-5%] align-middle items-center w-[250px] h-auto" src={coin3} alt="coin" />
        <div className='py-12 items-center  flex flex-wrap justify-center'>
          <div className="social-container absolute top-[100%] left-[17%]
           ">
            <a
              href="https://x.com/qudracommunity
"
              className="twitter bg-[#0F67B1] rounded-lg shadow-lg font-regular"
              onMouseEnter={() => handleMouseEnter('color-twitter')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleFollow('Twitter')}
            >
              <i className="ri-telegram-fill"></i>
              <i className="fa fa-twitter"></i>Telegram
              <i className='text-end pl-4 font-bold text-[#F4CE14]'>+5000 coins</i>

            </a>
            <a
              href="https://x.com/qudracommunity
"
              className="twitter bg-[#3FA2F6] rounded-lg shadow-lg"
              onMouseEnter={() => handleMouseEnter('color-twitter')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleFollow('Twitter')}
            >
              <i className="ri-twitter-x-line"></i>
              <i className="fa fa-twitter"></i>Twitter
              <i className='text-end pl-4 font-bold text-[#F4CE14]'>+5000 coins</i>

            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61561154702697&mibextid=ZbWKwL"
              className="facebook bg-[#4A249D] rounded-lg "
              onMouseEnter={() => handleMouseEnter('color-facebook')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleFollow('Facebook')}
            >
              <i className="ri-facebook-circle-fill"></i>
              <i className="fa fa-facebook"></i>Facebook
              <i className='text-end pl-4 font-bold text-[#F4CE14]'>+5000 coins</i>

            </a>

           

            <a
  href="https://t.me/qudracommunity"
  className="Youtube bg-[#C80036] rounded-lg"
  onMouseEnter={() => handleMouseEnter('color-pinterest')}
  onMouseLeave={handleMouseLeave}
  onClick={() => handleFollow('Pinterest')}
>
  <i className="ri-youtube-fill"></i>
  <i className="fa fa-pinterest"></i>Youtube
  <i className='text-end pl-4 font-bold text-[#F4CE14]'>+5000 coins</i>
</a>


           

            <a
              href="https://www.instagram.com/qudracommunity?igsh=dGRtZTJibDBzczg=
"
              className="instagram bg-[#FF5BAE] rounded-lg"
              onMouseEnter={() => handleMouseEnter('color-instagram')}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleFollow('Instagram')}
            >
              <i className="ri-instagram-line"></i>
              <i className="fa fa-instagram"></i>Instagram
              <i className='text-end pl-4 font-bold text-[#F4CE14]'>+5000 coins</i>

            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
