import React from 'react';

const BoxGrid = ({ data }) => {
  return (
    <div className="grid md:grid-cols-2 gap-2 -mx-2">
      {data.map((box, index) => (
        <div
          key={index}
          className="col-span-1 px-2 mb-4 "
        >
          <div className="bg-white min-h-48 flex flex-col gap-5 p-5 rounded-lg shadow-lg">
            <h3 className="text-lg text-[#1973AF]  font-extrabold font-custom ">{box.heading}</h3>
            <p className="text-gray-700 ">{box.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoxGrid;
