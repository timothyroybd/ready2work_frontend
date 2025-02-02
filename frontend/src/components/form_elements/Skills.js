import React, { useState } from "react";

const SkillSelector = ({ title, data }) => {
  const [searchText, setSearchText] = useState(""); // Search text state
  const [activeSkill, setActiveSkill] = useState(null); // Track hovered item
  const [addedSkills, setAddedSkills] = useState([]); // Store selected skills and levels
  const [showOtherFields, setShowOtherFields] = useState(false); // Toggle other fields
  const [customLanguage, setCustomLanguage] = useState(""); // Custom language input
  const [customLevel, setCustomLevel] = useState(""); // Custom level input

  const levels = ["Beginner", "Intermediate", "Advanced"]; // Skill levels

  // Add selected language and level to the list
  const handleAddSkill = (language, level) => {
    setAddedSkills((prev) => [...prev, { language, level }]);
    setSearchText(""); // Clear search input
    setActiveSkill(null); // Reset active skill
    setShowOtherFields(false); // Hide "Other" fields
    setCustomLanguage(""); // Clear custom language
    setCustomLevel(""); // Clear custom level
  };

  // Remove a skill
  const handleRemoveSkill = (index) => {
    setAddedSkills((prev) => prev.filter((_, i) => i !== index));
  };

  // Filter the list based on the search text
  const filteredData = data
    .filter((language) =>
      language.toLowerCase().includes(searchText.toLowerCase())
    )
    .concat(searchText ? ["Other"] : []); // Add "Other" if search text is not empty

  return (
    <div className="relative w-full">
      <h4 className="text-lg font-semibold mb-4">{title}</h4>

      {/* Added Skills Section */}
      <div className="flex flex-wrap mb-4">
        {addedSkills.map((skill, index) => (
          <div
            key={index}
            className="inline-flex items-center bg-gray-200 px-4 py-2 rounded-lg mr-2 mb-2"
          >
            {skill.language} — {skill.level}
            <button
              onClick={() => handleRemoveSkill(index)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder={`Search ${title}`}
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          setShowOtherFields(false); // Hide "Other" fields if the user starts typing again
        }}
        className="w-full border rounded-md px-4 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Suggestions Dropdown */}
      {searchText && !showOtherFields && filteredData.length > 0 && (
        <div className="absolute bg-white border rounded-md shadow-lg z-10 w-full">
          {filteredData.map((language, index) => (
            <div
              key={index}
              className="relative px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                if (language === "Other") {
                  setShowOtherFields(true); // Show "Other" input fields
                  setSearchText(""); // Close suggestions by clearing the search text
                  setActiveSkill(null); // Reset active skill
                } else {
                  setActiveSkill(language); // Set active skill
                  setShowOtherFields(false); // Hide "Other" fields
                }
              }}
            >
              {language}
            </div>
          ))}
        </div>
      )}

      {/* Other Fields */}
      {showOtherFields && (
        <div className="flex items-center gap-4 mt-4">
          <input
            type="text"
            placeholder="Enter new language"
            value={customLanguage}
            onChange={(e) => setCustomLanguage(e.target.value)}
            className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
          />
          <select
            value={customLevel}
            onChange={(e) => setCustomLevel(e.target.value)}
            className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3"
          >
            <option value="">Select Level</option>
            {levels.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => {
              if (customLanguage && customLevel) {
                handleAddSkill(customLanguage, customLevel);
              }
            }}
          >
            Add
          </button>
        </div>
      )}

      {/* Submenu for Hovered Skill */}
      {activeSkill && (
        <div className="absolute bg-white border rounded-md shadow-lg z-20 mt-2 p-4">
          <h5 className="font-semibold mb-2">{activeSkill}</h5>
          {levels.map((level, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleAddSkill(activeSkill, level)}
            >
              {level}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillSelector;
