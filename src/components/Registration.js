import React, { useState } from 'react';
import DeveloperRegistraion from './DeveloperRegistraion';

const Registration = () => {
  const [selectedForm, setSelectedForm] = useState('developer');
  const handleFormToggle = (formType) => {
    setSelectedForm(formType);
  };
//
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {' '}
      <h2 className="text-3xl font-semibold text-gray-800 my-6">
        Register
      </h2>{' '}
      <div className="flex space-x-4  mb-8">
        {' '}
        <button
          onClick={() => handleFormToggle('developer')}
          className={`py-2 px-4 rounded-lg ${
            selectedForm === 'developer'
              ? 'bg-gray-800 text-white'
              : 'bg-gray-300 text-gray-800'
          }`}
        >
          {' '}
          Register as Developer{' '}
        </button>{' '}
        <button
          onClick={() => handleFormToggle('business')}
          className={`py-2 px-4 rounded-lg ${
            selectedForm === 'business'
              ? 'bg-gray-800 text-white'
              : 'bg-gray-300 text-gray-800'
          }`}
        >
          {' '}
          Register as Business{' '}
        </button>{' '}
      </div>{' '}
      <div className="w-full max-w-md">
        {' '}
        {selectedForm === 'developer' && (
          <form className="bg-white shadow-md rounded-lg p-6">
            {' '}
            <h3 className="text-xl font-semibold mb-4">
              Developer Registration
            </h3>{' '}
            {/* Developer registration fields */}{' '}
            <div className="mb-4">
              {' '}
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="developer-name"
              >
                {' '}
                Name{' '}
              </label>{' '}
              <input
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                type="text"
                id="developer-name"
                placeholder="Enter your name"
              />{' '}
            </div>{' '}
            {/* Add more fields as needed */}{' '}
            <button className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
              Submit
            </button>{' '}
          </form>
        )}{' '}
        {selectedForm === 'business' && (
          <form className="bg-white shadow-md rounded-lg p-6">
            {' '}
            <h3 className="text-xl font-semibold mb-4">
              Business Registration
            </h3>{' '}
            {/* Business registration fields */}{' '}
            <div className="mb-4">
              {' '}
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="business-name"
              >
                {' '}
                Business Name{' '}
              </label>{' '}
              <input
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                type="text"
                id="business-name"
                placeholder="Enter your business name"
              />{' '}
            </div>{' '}
            {/* Add more fields as needed */}{' '}
            <button className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
              Submit
            </button>{' '}
          </form>
        )}{' '}
      </div>{' '}
        <DeveloperRegistraion />

    </div>
  );
};

export default Registration;
