import React from 'react';
import { Pie } from 'react-chartjs-2';
import { randomColor } from 'randomcolor';

const MCGraph = ({ dataItems }) => {
  let items = [];
  let itemPercentage = [];
  dataItems.forEach((ele) => {
    items.push(ele[0]);
    itemPercentage.push(Math.round(Number(ele[1]) * 100));
  });
  console.log(dataItems);
  console.log(items);
  console.log(itemPercentage);

  let colors = randomColor({
    count: dataItems.length,
    luminosity: 'bright',
    format: 'rgba',
    hue: 'green',
  });

  const data = {
    labels: items,
    datasets: [
      {
        label: '# of Votes',
        data: itemPercentage,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-60 md:w-80 bg-white p-2 hover:shadow-xl">
      <h1>Portfolio suggested by monte carlo simulation</h1>
      {dataItems.length > 0 ? (
        <Pie data={data} />
      ) : (
        <h1>No data available, please calculate it first.</h1>
      )}
    </div>
  );
};

export default MCGraph;
