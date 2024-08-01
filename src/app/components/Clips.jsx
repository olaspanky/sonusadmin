import React, { useState } from 'react';
import Image from 'next/image';

const BoxGrid = ({ data }) => {
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const handleHover = (index) => {
    if (index !== 0) {
      setHoveredIndex(index);
    } else {
      setHoveredIndex(0);
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-2 -mx-2">
      {data.map((box, index) => (
        <div
          key={index}
          onMouseEnter={() => handleHover(index)}
          onMouseLeave={() => setHoveredIndex(0)}
          className={`
            col-span-1
            flex flex-col
            border-2 border-primary rounded-lg shadow-lg hover:bg-clip_bg
            ${hoveredIndex === index ? 'bg-primary bg-contain bg-clip_bg' : 'bg-white'}
          `}
        ><div className={`${hoveredIndex === index ? 'bg-primary bg-clip_bg ' : ''} p-3`}>
          <div className="flex w-full justify-between max-h-36">
            <div className="flex pt-9 items-center">
              <p className={`text-${hoveredIndex === index ? 'white' : '[#1973AF]'} text-3xl font-extrabold`}>
                {box.title}<sup>+</sup>
              </p>
            </div>
            <div className="p-1">
              <Image alt="alt"  src={hoveredIndex === index ? box.icon2 : box.icon} width={40} height={40} />
            </div>
          </div>
          <div>
            <p className={`text-${hoveredIndex === index ? 'white' : '[#1973AF]'} text-2xl pt-3 font-bold pb-6`}>
              {box.description}
            </p>
          </div>
        </div>
        </div>
      ))}
    </div>
  );
};

export default BoxGrid;
