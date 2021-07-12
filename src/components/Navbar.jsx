import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <div>
      <div className="text-2xl flex justify-around md:justify-between p-2 bg-gray-200 text-gray-700 shadow-md">
        <div className="font-bold py-1 px-2 hidden md:block">
          Portfolio-Optimizer
        </div>
        <div className="flex md:mr-20">
          <div className="rounded-xl hover:bg-blue-400 hover:text-white cursor-pointer py-1 px-2 md:mr-20 mr-6">
            <Link to="/">Home</Link>
          </div>
          {isAuthenticated ? (
            <div
              onClick={logout}
              className="rounded-xl hover:bg-blue-400 hover:text-white cursor-pointer py-1 px-2"
            >
              Logout
            </div>
          ) : (
            <div
              onClick={loginWithRedirect}
              className="rounded-xl hover:bg-blue-400 hover:text-white cursor-pointer py-1 px-2"
            >
              Login
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
