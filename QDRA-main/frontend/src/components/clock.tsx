import React, { useState, useEffect } from 'react';
import axiosInstance from '../client/axiosConfig';
import { useAuth0 } from '@auth0/auth0-react';
import { coin } from '../images/index.js';
import './clock.css';
import AuthCallback from './AuthCallback';

const Clock: React.FC = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [points, setPoints] = useState(0);
  const pointsToAdd = 12;
  const coinReward = 15000;

  useEffect(() => {
    let countdown: NodeJS.Timeout | undefined;
    if (isActive && timeLeft > 0) {
      countdown = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      clearInterval(countdown);
      setIsActive(false);
      handleTimerCompletion();
    }
    return () => clearInterval(countdown);
  }, [isActive, timeLeft]);

  const startTimer = () => {
    setTimeLeft(10); // 3 hours in seconds
    setIsActive(true);
  };

  const handleTimerCompletion = async () => {

    try {
      const token = await getAccessTokenSilently();
      
      const response = await axiosInstance.post('/api/updateCoins', { coins: coinReward }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPoints(response.data.updatedPoints);
    } catch (error) {
      console.error('Error updating coins:', error);
    }
  };

  const handleClick = () => {
    setPoints(prev => prev + pointsToAdd);
  };

  const hours = Math.floor((timeLeft % 86400) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <AuthCallback/>
      {/* <div className="clock bg-black">
      <div className='bg-blue-600'>
        <AuthCallback/>
      </div>
      <div className="flex coin_wallet absolute top-0 w-full px-3 pt-20 z-10 flex-col items-center text-white">
        <div className="flex py-auto align-top justify-center coin_system">
          <div className="mt-12 text-5xl font-bold flex items-center">
            <img src={coin} width={44} height={44} alt="coin" />
            <span className="ml-2 text-md">{points}</span>
          </div>
          <div className="flex flex-col justify-end top-7 relative right-20 items-center text-center">
            <h1 className="text-sm align-middle font-semibold">QDRA Wallet</h1>
          </div>
        </div>
      </div>
      <div className="clock-container">
        <section className="countdown-container">
          <div className="hours-container">
            <div className="hours">{hours}</div>
            <div className="hours-label">hours</div>
          </div>
          <div className="minutes-container">
            <div className="minutes">{minutes}</div>
            <div className="minutes-label">minutes</div>
          </div>
          <div className="seconds-container">
            <div className="seconds">{seconds < 10 ? `0${seconds}` : seconds}</div>
            <div className="seconds-label">seconds</div>
          </div>
        </section>
        <button onClick={startTimer} className="start-button">Start</button>
      </div>
    </div> */}
    </div>
  );
};

export default Clock;
