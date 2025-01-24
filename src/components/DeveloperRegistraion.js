import React, { useEffect, useState } from 'react';

import '../index.css';
import PersonalInfo from './form_elements/PersonalInfo';
import languagedb from '../data/languages';
import frameworks from '../data/framework';
import SkillSelector from '../components/form_elements/Skills';
const DeveloperRegistrationPage = () => {
  const [languages, setLanguages] = useState(() =>
    languagedb.reduce(
      (acc, lang) => {
        acc[lang] = false;
        console.log(acc)
        return acc;
      },
      { Other: false }
    )
  );

  

  const [customLanguage, setCustomLanguage] = useState('');

  const handleLanguageChange = (e) => {
    const { name, checked } = e.target;
    setLanguages({
      ...languages,
      [name]: checked,
    });
  };
  const handleCustomLanguageChange = (e) => {
    setCustomLanguage(e.target.value);
  };

  return (
    <div className="w-full max-w-lg">
      <form className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Developer Registration</h3>
        <PersonalInfo />
        {/* <Skills 
        title= "Programming Lanugages"
        skills={languages}
        onChange={handleLanguageChange}
        customSkill={customLanguage}
        onCustomChange={handleCustomLanguageChange}/> */}
        <SkillSelector title="Programming Languages" data={languagedb} />
      
      

        {/* Add more fields as needed */}
        <button className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DeveloperRegistrationPage;
