import React from 'react';

const SearchInput = ({ placeholder }) => {
  return (
    <div className="relative w-full h-full border border-gray-100 rouded-md">
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        className="pl-8 pr-10 w-full border border-gray-300  rounded-md  py-3 bg-gray-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
      <svg
        className="absolute w-5 h-5 text-gray-500 left-2 top-2.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-4.873-4.873M8 15a7 7 0 100-14 7 7 0 000 14z"
        />
      </svg>
    </div>
  );
};

export default SearchInput;
