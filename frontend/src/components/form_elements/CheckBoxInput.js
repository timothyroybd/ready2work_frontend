import React from 'react';

const CheckBoxInput = ({data, title}) => {
    return (
        <div>
            <h4 className='text-lg font-semibold mb-3'>{title}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2"> 
    {data.map((type, index) => (
        <label key={index} className="flex items-center space-x-2">
            <input type="checkbox" value={type} className="form-checkbox text-blue-600" />
            <span>{type}</span>
        </label>
    ))}
</div>

        </div>
    );
};

export default CheckBoxInput;