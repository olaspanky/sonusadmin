import React from 'react';
import { BarChart, Card, Title } from "@tremor/react";


const Chart = ({ chartData, indexKey, categoryLabels, colorPalette, valueFormatterFn, yAxisWidth, showXAxis = true, showYAxis = true, showGridLines }) => {

   
    return (

    <main className="  flex h-full w-full flex-col gap-9 p-2 z-50">

    <div className='bg-gray-50'>
      <BarChart
        className="mt-6 bg-gray-50 rounded-lg"
        data={chartData}
        index={indexKey}
        categories={categoryLabels}
        colors={colorPalette}
        valueFormatter={valueFormatterFn}
        showGridLines={showGridLines} // Control visibility of gridlines
        
       
      />
    </div>

   
    </main>
  );
};

export default Chart;
