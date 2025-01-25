import React from 'react';

const TextInput = ({classNames, type, placeholder, required }) => {
    return (
        <input className={Array.isArray(classNames) ? classNames.join(" "): classNames} type= {type} placeholder={placeholder}
        required={required}  />
    );
};

export default TextInput;