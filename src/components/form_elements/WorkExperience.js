import React from 'react';
import "../../index.css"
import classNames from '../../utils/ClassNames';
import TextInput from './TextInput';
import projectTypes from '../../data/ProjectTypes';
const WorkExperience = () => {
    return (
        <div>
            {/* Years of Experince */}
            <div>
            <h4 className ="text-lg font-semibold mb-4">Years of Experience</h4>
            <select className= {classNames.textInput}>
                <option value ="">-- Select number of years of experience</option>
                <option value = "<1">Less than 1 year</option>
                <option value = "1-3">1-3 years</option>
                <option value = "4-7">4-7 years</option>
                <option value = "7+">7+ years</option>
            </select>
            </div>
            {/* Portfolio Description */}
            <div>
                <h4 className='text-lg font-semibold mb-4'>Projects</h4>
                <TextInput classNames={`${classNames.textInput} mb-4`}type="text" placeholder="Project Title" />
                <TextInput classNames={`${classNames.textInput} mb-4`} type="textarea" placeholder="Project Description" />
                <TextInput classNames={`${classNames.textInput} mb-4`} type="text" placeholder="Project Link" />


                
               
            </div>

            <div>
                <h4 className='text-lg font-semibold mb-3'>Types of Projects</h4>
                {projectTypes.map((type, index) => (

                    <div key ={index} className='mb-2'>
                    <label className='inline-flex items-center'>
                    <input type="checkbox" value = {type} className='form-check' />
                    <span className='ml-2'>{type}</span>
                    </label>
                    </div>
                ))}
            </div>
            
           
        </div>
    );
};

export default WorkExperience;