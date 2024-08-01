import { AreaChart, BarChart, Card, Flex, Switch, Title } from "@tremor/react";

  const chartdata = [
    {
      name: "Amphibians",
      "Number of threatened species": 8903,
    },
    {
      name: "Birds",
      "Number of threatened species": 1445,
    },
    {
      name: "Crustaceans",
      "Number of threatened species": 743,
    },
    {
      name: "Ferns",
      "Number of threatened species": 281,
    },
    {
      name: "Arachnids",
      "Number of threatened species": 251,
    },
    {
      name: "Corals",
      "Number of threatened species": 232,
    },
    {
      name: "Algae",
      "Number of threatened species": 98,
    },
  ];

const valueFormatter = (number) => `$ ${new Intl.NumberFormat("us").format(number).toString()}`;

const BarChart1 = () => (
  <div>
    <Title>Number of species threatened with extinction (2021)</Title>
   
    <BarChart
      className="mt-6 bg-white h-96"
      data={chartdata}
      index="name"
      categories={["Number of threatened species"]}
      colors={["blue"]}
      valueFormatter={valueFormatter}
      yAxisWidth={48}
    />
  </div>
);

export default BarChart1