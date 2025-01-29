import React from 'react';
import CheckBoxInput from './CheckBoxInput';


const ProjectPreferences = () => {
    return (
        <div>
            <CheckBoxInput data = {["Startups","Corporations", "Freelance", "Volunteer"  ]} title = {"Interested Projects"} />

             <CheckBoxInput data = {["Remote","On-site", "Hybrid"  ]} title = {"Preferred Work Mode"} />

             <CheckBoxInput data = {["Short-term","Medium-term", "Long-term"  ]} title = {"Preferred Project Duration"} />
          
        </div>
    );
};

export default ProjectPreferences;