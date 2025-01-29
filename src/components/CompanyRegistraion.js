import React from 'react';
import TextInput from './form_elements/TextInput';
import classNames from '../utils/ClassNames';
import Button from './other_components/Button';

const clickHandler = () => {

}

const CompanyRegistration = () => {
    return (
        <div className="w-full max-w-lg">
            <form className="bg-white shadow-md rounded-lg p-6">
            <h1>Company Registration</h1>
            <div>
            <label className={classNames.label}>Company Name</label>
            <TextInput classNames={classNames.textInput} type = "text" placeholder="Enter your company name" required={true} />
            </div>

             <div>
            <label className={classNames.label}>Description</label>
            <TextInput classNames={classNames.textInput} type = "text" placeholder="Describe your company" required={true} />
            </div>

               <div>
            <label className={classNames.label}>Sector</label>
            <TextInput classNames={classNames.textInput} type = "text" placeholder="Please write the sector of your company" required={false} />
            </div>
            <div>

            <label className={classNames.label}>Email</label>
            <TextInput classNames={classNames.textInput} type = "email" placeholder="Please enter company email" required={true} />
            </div>

             <div>

            <label className={classNames.label}>Address</label>
            <TextInput classNames={classNames.textInput} type = "text" placeholder="Please enter address" required={true} />
            </div>

            <Button children={"Submit"} onClickFunction={clickHandler} className={classNames.button} type ='submit' />

            
           </form>
        </div>
    );
};

export default CompanyRegistration;