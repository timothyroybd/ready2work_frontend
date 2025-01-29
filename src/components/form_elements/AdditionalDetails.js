import React from 'react';
import CheckBoxInput from './CheckBoxInput';
import TextInput from './TextInput';
import classNames from '../../utils/ClassNames';

const AdditionalDetails = () => {
    return (
        <div>
          
            {/* Add your form elements here */}
            <CheckBoxInput data ={["Yes", "No"]} title ="Interested to collaborate with other developers" />
            <h4 className="text-lg font-semibold mb-4">Additional Info</h4>

            <TextInput classNames={`${classNames.textInput} mb-4`} type="textarea" placeholder="Share your interests, work style and goals" required={false} />

            
        </div>
    );
};

export default AdditionalDetails;