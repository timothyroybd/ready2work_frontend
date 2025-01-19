import React, {useState} from 'react';

import '../index.css'; 
import countries from '../data/country';
import languagedb from "../data/languages"


const DeveloperRegistrationPage = () => {
const [languages, setLanguages] = useState(() => 
  languagedb.reduce((acc, lang) => {
    acc[lang] = false
    return acc
  }, {Other: false})
)

const [customLanguage, setCustomLanguage] = useState('');

const handleChange = (e) => {
  const {name, checked} = e.target
  setLanguages({
    ...languages, 
    [name]: checked,
  })
}
const handleCustomChange = (e) => {
  setSelectedLanguage(e.target.value)
}

  return (
    <div className='w-full max-w-lg'>
    <form className="bg-white shadow-md rounded-lg p-6">
           
            <h3 className="text-xl font-semibold mb-4">
              Developer Registration
            </h3>
            {/* Name */}
            <div className="mb-4">
              {' '}
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="developer-name"
              >
                {' '}
                Name{' '}
              </label>{' '}
              <input
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                type="text"
               
                placeholder="Enter your name"
                required 
              />{' '}
            </div>

            {/*Email  */}
            <div className="mb-4">
            
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="developer-email"
              >
                {' '}
                Email{' '}
              </label>
              <input
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                type="text"
               
                placeholder="Enter your email"
              />
            </div>

             {/*Phone  */}
            <div className="mb-4">
            
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="developer-phone"
              >
                {' '}
                Phone{' '}
              </label>
              <input
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                type="tel"
                required
                placeholder="Enter your phone number"
              />
            </div>

              {/*Location  */}
            <div className="mb-4">
            
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="developer-phone"
              >
                {' '}
                Location{' '}
              </label>
              <select className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" required>
                {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                ))}
              </select>
              
            </div>
             {/*Programming Languages  */}
            <div className="mb-4">
            
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="developer-programming_languages"
              >
                {' '}
                Programming Languages{' '}
              </label>
              {Object.keys(languages).map((language) => (
                <div key={language}> 
                  <label className='inline-flex items-center'>
                    <input type ='checkbox' name ={language} checked = {languages[language]} onChange={handleChange} className='form-checkbox text-indigo-600'/>
                    <span className="ml-2">{language}</span>
                  </label>
                </div>
              )) }
             
              
            </div>


            {/* Add more fields as needed */}
            <button className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-700">
              Submit
            </button>
          </form>
          </div>

  );

};



export default DeveloperRegistrationPage;