import React from 'react';

const TextInput = ({classNames, type, placeholder, required, value, onChange }) => {
    return (
        <input className={Array.isArray(classNames) ? classNames.join(" "): classNames} 
        type= {type} 
        placeholder={placeholder}
        required={required} 
        value ={value} 
        onChange={onChange}/>
    );
};

export default TextInput;