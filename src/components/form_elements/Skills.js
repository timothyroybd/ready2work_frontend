import React from 'react';

const Skills = ({title, skills, onChange, customSkill, onCustomChange}) => {
    
    return (
         <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            
          >
            
            {title}
          </label>
          <div className="grid grid-cols-2 gap-4">
          {Object.keys(skills)
      .filter((skill) => skill !== "Other")
      .map((skill) => (
        <div key={skill} className="flex items-center">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name={skill}
              checked={skills[skill]}
              onChange={onChange}
              className="form-checkbox text-indigo-600"
            />
            <span className="ml-2">{skill}</span>
          </label>
        </div>
      ))}
      <div key="Other" className="flex items-center">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="Other"
              checked={skills["Other"]}
              onChange={onChange}
              className="form-checkbox text-indigo-600"
            />
            <span className="ml-2">Other</span>
          </label>
        </div>
        {/* Custom input field for "Other" */}
        {skills.Other && (
          <div className="col-span-2 flex items-center mt-4">
            <input
              type="text"
              className="flex-grow px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter additional skill"
              value={customSkill}
              onChange={onCustomChange}
            />
          </div>
        )}

    
  
          </div>
        </div>
    );
};

export default Skills;