import React from 'react';

const OptionInput = ({data, OptionclassNames, isYearsOfExperience}) => {
    return (
        <select className= {OptionclassNames} >

           

        {data.map((option, index) => (
            <option key={index} value ={option}>
                {isYearsOfExperience? option === "-- Select years of experience"
                ? option: option === "<1" ? `${option} Year`: `${option} Years`: option}
            </option>
            
                
            

        ))}
        </select>
        
    );
};

export default OptionInput;