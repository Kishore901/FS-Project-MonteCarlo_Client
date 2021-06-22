import React, { useEffect, useState } from 'react';

const Tables = ({ presentItems }) => {
  console.log(presentItems);
  const [totalQuant, setTotalQuant] = useState(null);
  useEffect(() => {
    let final = 0;
    presentItems.map((item) => {
      final = final + Number(item[1]);
      setTotalQuant(final);
    });
  }, [presentItems]);

  return (
    <>
      {presentItems.length !== 0 && (
        <>
          <div className="bg-blue-100 rounded-md p-2">
            <table>
              <thead>
                <tr className="border-b-2 border-blue-400 font-semibold">
                  <td className="px-6 py-1 pl-2">Stock Name</td>
                  <td className="px-6 py-1 pl-2">Percentage</td>
                </tr>
              </thead>
              <tbody>
                {presentItems.map((data) => (
                  <tr>
                    <td>{data[0]}</td>
                    <td>
                      {Math.trunc((parseInt(data[1], 10) / totalQuant) * 100)} %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <div></div>
    </>
  );
};

export default Tables;
