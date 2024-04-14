// src/components/LogoutButton.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/userSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
