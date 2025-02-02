import React from 'react';
import countries from '../../data/Country';
import TextInput from './TextInput';
import classNames from '../../utils/ClassNames';
const PersonalInfo = () => {
  const required = true;

  
  return (
    <div>
   
     
      {/*Phone  */}
      <div className="mb-4">
        <label className={classNames.label}>Phone</label>
        <TextInput
          classNames={classNames.textInput}
          type="tel"
          placeholder="Enter your phone number"
          required={required}
        />
      </div>

      {/*Location  */}
      <div className="mb-4">
        <label className={classNames.label}>Location</label>
        <select className={classNames.textInput} required>
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
