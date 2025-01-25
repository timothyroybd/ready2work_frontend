import React, { useEffect, useState } from 'react';

import '../index.css';
import PersonalInfo from './form_elements/PersonalInfo';
import languagedb from '../data/ProgrammingLanguages';
import frameworks from '../data/Frameworks';
import SkillSelector from '../components/form_elements/Skills';
import OtherSkills from '../data/OtherSkills';
import WorkExperience from './form_elements/WorkExperience';
import Preferences from './form_elements/Preferences';
const DeveloperRegistrationPage = () => {
  

  return (
    <div className="w-full max-w-lg">
      <form className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Developer Registration</h3>
        <PersonalInfo />

        <SkillSelector title="Programming Languages" data={languagedb} />
        <SkillSelector title="Frameworks" data={frameworks} />
        <SkillSelector title="Ohter Skills" data={OtherSkills} />

        <WorkExperience />

        {/* Add more fields as needed */}
        <button className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DeveloperRegistrationPage;
