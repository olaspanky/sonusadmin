import React from 'react';

const BoxGrid = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-2 -mx-2">
      {data.map((box, index) => (
        <div
          key={index}
          className="col-span-1 px-2 mb-4"
        >
          <div className="bg-white flex flex-col gap-5 p-5 rounded-lg shadow-lg p-6">
            <h3 className="text-lg text-black  font-bold mb-2">{box.heading}</h3>
            <p className="text-[#1973AF] text-sm mb-2 font-bold">{box.title}</p>
            <p className="text-gray-700 my-5">{box.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoxGrid;
