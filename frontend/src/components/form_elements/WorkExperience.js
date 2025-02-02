import React from 'react';
import '../../index.css';
import classNames from '../../utils/ClassNames';
import TextInput from './TextInput';
import projectTypes from '../../data/ProjectTypes';
import CheckBoxInput from './CheckBoxInput';
import OptionInput from './OptionInput';
import YearsOfExperience from '../../data/YearsOfExperience';
const WorkExperience = () => {
  return (
    <div>
      {/* Years of Experince */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Years of Experience</h4>

        <OptionInput
          data={YearsOfExperience}
          OptionclassNames={classNames.textInput}
          isYearsOfExperience={true}
        />
      </div>
      {/* Portfolio Description */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Projects</h4>
        <TextInput
          classNames={`${classNames.textInput} mb-4`}
          type="text"
          placeholder="Project Title"
        />
        <TextInput
          classNames={`${classNames.textInput} mb-4`}
          type="textarea"
          placeholder="Project Description"
        />
        <TextInput
          classNames={`${classNames.textInput} mb-4`}
          type="text"
          placeholder="Project Link"
        />
      </div>

      <CheckBoxInput data={projectTypes} title={'Types of Projects'} />
    </div>
  );
};

export default WorkExperience;
