import React, { useState } from 'react';
import DeveloperRegistraion from './DeveloperRegistraion';
import CompanyRegistration from './CompanyRegistraion';


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
         {selectedForm === 'developer' ? <DeveloperRegistraion /> : <CompanyRegistration />}
       
      </div>{' '}
       

    </div>
  );
};

export default Registration;
