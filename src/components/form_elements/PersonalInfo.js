import React from 'react';
import countries from '../../data/country';

const PersonalInfo = () => {
  return (
    <div>
      {/* Name */}
      <div className="mb-4">
        
        <label className="block text-gray-700 text-sm font-bold mb-2">
   
          Name
        </label>
        <input
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          type="text"
          placeholder="Enter your name"
          required
        />
      </div>

      {/*Email  */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          
          Email
        </label>
        <input
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          type="text"
          placeholder="Enter your email"
        />
      </div>

      {/*Phone  */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          
          Phone
        </label>
        <input
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          type="tel"
          required
          placeholder="Enter your phone number"
        />
      </div>

      {/*Location  */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          
          Location
        </label>
        <select
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          required
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PersonalInfo;
