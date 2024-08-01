import { LineChart, Card } from "@tremor/react";
import React from "react";

const LineChartCustom = ({ data, index, categories, colors, yAxisWidth, showGridLines }) => {
  return (
    <div className="max-w-2xl mx-auto p-0">
    <div className='bg-white'>
        <LineChart
          className="h-72 mt-4 border border-white"
          data={data}
          index={index}
          categories={categories}
          colors={colors}
          showGridLines={showGridLines} // Control visibility of gridlines
          curveType="monotone"

        />
      </div>
    </div>
  );
};

export default LineChartCustom;
