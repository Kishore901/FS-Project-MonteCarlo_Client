import React from 'react';
import Navbar from './Navbar';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  console.log(user);
  return (
    <div className="h-screen bg-gray-100">
      <Navbar />
      <div>
        <div className="flex flex-col md:flex-row justify-center items-center md:m-20">
          <div className="md:order-2">
            <img
              className="w-60 md:w-screen"
              src="images/homeAnim.gif"
              alt=""
            />
          </div>
          <div className="px-6 py-2 text-center md:order-1 md:-ml-14 md:text-xl md:pr-20">
            <p className="leading-8">
              Get your stock portfolio optimized. Our app uses monte carlo
              simulation under the hood and suggests you the best porfolio for
              higher returns. You can compare your profile in real time with
              help of graphs and tables provided by Porfolio Optimizer. Now
              higher returns are just a click away.
            </p>
            <div>
              {isAuthenticated ? (
                <button className="bg-blue-400 py-2 px-4 rounded-md mt-2 hover:opacity-80 text-white md:mt-12 md:py-2 md:px-5 ">
                  <Link to="/dashboard">Dashboard</Link>
                </button>
              ) : (
                <button
                  onClick={loginWithRedirect}
                  className="bg-blue-400 py-2 px-4 rounded-md mt-2 hover:opacity-80 text-white md:mt-12 md:py-2 md:px-5 "
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
