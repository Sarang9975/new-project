import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Clock = () => {
  const [timer, setTimer] = useState(0);
  const { user, isAuthenticated } = useAuth0(); // Use the Auth0 hook

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleTimerCompletion = async () => {
    try {
      if (!isAuthenticated || !user) {
        console.error('User is not authenticated');
        return;
      }

      const userId = user.sub; // Get the Auth0 user ID from the authenticated user

      const response = await fetch('http://localhost:3000/api/updateCoins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coins: 10,
          userId: userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Coins updated:', data);
    } catch (error) {
      console.error('Error updating coins:', error);
    }
  };

  useEffect(() => {
    if (timer >= 60) { // For example, when the timer reaches 60 seconds
      handleTimerCompletion();
      setTimer(0); // Reset the timer if you want to perform the action every 60 seconds
    }
  }, [timer]);

  return (
    <div>
      <h1>Timer: {timer}</h1>
    </div>
  );
};

export default Clock;
