import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Username = () => {
  const { user } = useAuth0();
  console.log(user);
  return (
    <div className="flex items-center px-4 py-6 text-xl text-gray-700">
      <img
        src={user.picture}
        alt="User's profile pic"
        className="rounded-full w-12 h-12 mr-2"
      />
      <div>{user.given_name}'s Portfolio</div>
    </div>
  );
};

export default Username;
