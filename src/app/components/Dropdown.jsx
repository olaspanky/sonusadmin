import React, { useState } from 'react';

const SearchDropdown = ({ name, options, isOpen, toggleDropdown }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    toggleDropdown(); // Close dropdown after selection
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="bg-white text-sm text-gray-800 flex py-3 items-center gap-2 px-5 rounded-md border border-gray-100"
        >
          {selectedOption || name}
          <svg
            className={`flex ml-auto w-5 h-5 text-gray-500 transform ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((option, index) => (
              <label key={index} className="flex items-center p-2">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-primary focus:ring-primary"
                  name="dropdownOption"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionChange(option)}
                />
                <span className="ml-2 text-gray-800">{option}</span>
              </label>
            ))}
          </div>
          <div className='p-5 flex justify-start'>
          <button className='bg-primary py-2 px-3 rounded-md text-white text-sm'> Apply</button>

            </div>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
