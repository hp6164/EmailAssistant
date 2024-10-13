"use client"

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FiBell, FiCamera, FiEdit2, FiLogOut, FiMail, FiSave } from 'react-icons/fi';

const UserProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'Passionate about technology and innovation.',
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });

  const router = useRouter();

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationToggle = (setting: 'emailNotifications' | 'pushNotifications') => {
    setNotifications(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    console.log('Updated user info:', userInfo);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  return (
    <div className="mx-auto p-4 bg-gray-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6 max-w-6xl mx-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(!isEditing)}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-emerald-700 transition-colors flex items-center"
            >
              {isEditing ? <FiSave className="mr-2" /> : <FiEdit2 className="mr-2" />}
              {isEditing ? 'Save' : 'Edit'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-colors flex items-center"
            >
              <FiLogOut className="mr-2" />
              Logout
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <div className="w-32 h-32 mx-auto bg-gray-300 rounded-full overflow-hidden mb-4 relative">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <FiCamera className="text-white text-2xl" />
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{userInfo.name}</h2>
              <p className="text-gray-700">{userInfo.email}</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInfoChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-gray-800"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInfoChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-gray-800"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={userInfo.bio}
                  onChange={handleInfoChange}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 text-gray-800"
                />
              </div>
            </form>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Notification Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FiMail className="text-gray-600 mr-2" />
                    <span className="text-gray-700">Email Notifications</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleNotificationToggle('emailNotifications')}
                    className={`${
                      notifications.emailNotifications ? 'bg-emerald-600' : 'bg-gray-300'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                  >
                    <span
                      className={`${
                        notifications.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </motion.button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FiBell className="text-gray-600 mr-2" />
                    <span className="text-gray-700">Push Notifications</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleNotificationToggle('pushNotifications')}
                    className={`${
                      notifications.pushNotifications ? 'bg-emerald-600' : 'bg-gray-300'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                  >
                    <span
                      className={`${
                        notifications.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h3>
          <ul className="space-y-4">
            {['Logged in from a new device', 'Updated profile picture', 'Changed password'].map((activity, index) => (
              <li key={index} className="bg-gray-50 p-3 rounded-md text-gray-700">
                {activity}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default UserProfilePage;