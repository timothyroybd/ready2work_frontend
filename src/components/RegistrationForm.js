import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from '../utils/ClassNames';
import TextInput from './form_elements/TextInput';
import Button from './other_components/Button';
import Header from './Header';

const RegistrationForm = ({ title }) => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        const userType = title.includes("Developer") ? "developer" : "company"

        const isReturningUser = localStorage.getItem(`${userType}_registered`)
        if(!isReturningUser){
            localStorage.setItem(`${userType}_registered`, true)
            navigate(userType === "developer" ? "/developer-info": "/company-info")
        }else {
            navigate("/dashboard")
        }
    }
  return (
    <div className="flex flex-col items-center justify-center">
  
      <h4 className="text-lg font-semibold mb-4">{title} Registration</h4>

      <div className={classNames.form_wrapper}>
        <form className={classNames.form}>
          <div>
            <label className={classNames.label}> Email </label>

            <TextInput
              classNames={classNames.textInput}
              type="email"
              placeholder="Enter your email"
              required={true}
              value = {email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className={classNames.label}> password </label>
            <TextInput
              classNames={classNames.textInput}
              type="password"
              placeholder="Enter your password"
              required={true}
              value = {password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button children="Submit" onClickFunction={submitHandler} className={classNames.button} type = "submit" />
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
