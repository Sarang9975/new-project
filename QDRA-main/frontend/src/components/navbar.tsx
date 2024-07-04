import React, { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
const Navbar: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToHome = () => {
      if (isAuthenticated) {
        navigate('/home');
      }
    };

    if (!isLoading) {
      redirectToHome();
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: { returnTo: '/home' },
    });
  };

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    navigate('/login');
  };

  return (
    <div className=" main border-solid-black rounded-md flex flex-wrap items-center justify-between bg-[#FFF5E1] w-full h-20 p-2">
      <div className="flex items-center">
        <img
          className="h-16 w-20"
          src="../../logo.png"
          alt="BudgetBuddy Logo"
        />
        <h2 className="text-xl mx-[-16px] text-[#32012F] font-semibold">QDRA</h2>
      </div>
      <div className="flex gap-2 mt-2 md:mt-0">
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="h-10 text-[#FFC700] w-24 rounded-lg text-sm font-semibold border-solid"
          >
            Log Out
          </button>
        ) : (
          <>
            <button
              onClick={handleLogin}
              className="h-10 text-[#FFBF00] bg-white w-24 rounded-lg text-sm font-semibold border-solid shadow-md"
            >
              Log In
            </button>
            <button
              onClick={handleLogin}
              className="h-10 text-white w-24 rounded-lg bg-[#FFBF00] text-sm font-semibold border-solid shadow-lg"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
