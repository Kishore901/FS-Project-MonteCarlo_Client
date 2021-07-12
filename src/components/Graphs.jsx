import React from 'react';
import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { randomColor } from 'randomcolor';

const Graphs = ({ presentItems }) => {
  const [totalQuant, setTotalQuant] = useState(null);
  let items = [];
  let itemPercentage = [];
  presentItems.forEach((item) => {
    items.push(item[0]);
  });

  useEffect(() => {
    let final = 0;
    presentItems.map((item) => {
      final = final + Number(item[1]);
      setTotalQuant(final);
    });
  }, [presentItems]);

  presentItems.forEach((item) => {
    let per = Math.trunc((parseInt(item[1], 10) / totalQuant) * 100);
    itemPercentage.push(per);
  });

  console.log(totalQuant);
  console.log(items);
  console.log(presentItems);
  console.log(presentItems.length);
  let colors = randomColor({
    count: presentItems.length,
    luminosity: 'bright',
    format: 'rgba',
    hue: 'blue',
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
      <h1>User's current portfolio</h1>
      <Pie data={data} />
    </div>
  );
};

export default Graphs;
