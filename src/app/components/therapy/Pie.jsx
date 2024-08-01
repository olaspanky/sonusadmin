import { Card, DonutChart } from "@tremor/react";

const cities = [
  {
    name: "Capsule",
    sales: 9800,
  },
  // ...
  {
    name: "Injection",
    sales: 1398,
  },
  {
    name: "Tablet",
    sales: 4678,
  },
];

const valueFormatter = (number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

const customTooltip = ({ payload, active }) => {
  if (!active || !payload) return null;
  const categoryPayload = payload?.[0];
  if (!categoryPayload) return null;
  return (
    <div className="w-96  p-2 ">
      <div className="flex flex-1">
        <div className={`w-1.5 flex flex-col bg-${categoryPayload?.color}-500 rounded`} />
        <div className="w-full">
          <div className="flex items-center justify-between space-x-8">
            <p className="text-right text-tremor-content whitespace-nowrap">
              {categoryPayload.name}
            </p>
            <p className="font-medium text-right whitespace-nowrap text-tremor-content-emphasis">
              {categoryPayload.value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DonutChartCustomTooltip = () => {
  return (
    <>
      <div className=" bg-white">
        <DonutChart
          className="w-full h-96 bg-white"
          data={cities}
          category="sales"
          index="name"
          valueFormatter={valueFormatter}
          customTooltip={customTooltip}
          variant="pie"
          colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}

        />
      </div>
    </>
  );
};

export default DonutChartCustomTooltip