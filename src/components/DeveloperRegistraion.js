import React, { useEffect, useState } from 'react';

import '../index.css';
import PersonalInfo from './form_elements/PersonalInfo';
import languagedb from '../data/ProgrammingLanguages';
import frameworks from '../data/Frameworks';
import SkillSelector from '../components/form_elements/Skills';
import OtherSkills from '../data/OtherSkills';
import WorkExperience from './form_elements/WorkExperience';
import ProjectPreferences from './form_elements/ProjectPreferences';
import languages from '../data/SpokenLanguages';
import AdditionalDetails from './form_elements/AdditionalDetails';
import softSkills from '../data/SoftSkills';
import Button from './other_components/Button';
import classNames from '../utils/ClassNames';
const clickHandler = () => {

}

const DeveloperRegistrationPage = () => {
  

  return (
    <div className="w-full max-w-lg">
      <form className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Developer Registration</h3>
        <PersonalInfo />

        <SkillSelector title="Programming Languages" data={languagedb} />
        <SkillSelector title="Frameworks" data={frameworks} />
        <SkillSelector title="Ohter Skills" data={OtherSkills} />
        <SkillSelector title="Soft Skills" data = {softSkills} />


        <WorkExperience />
        <ProjectPreferences />
        <SkillSelector title = "Languages" data ={languages} />
        <AdditionalDetails />
        


        {/* Add more fields as needed */}
       
        <Button children={"Submit"} onClickFunction={clickHandler()} className={classNames.button} type = "submit" />
      </form>
    </div>
  );
};

export default DeveloperRegistrationPage;
