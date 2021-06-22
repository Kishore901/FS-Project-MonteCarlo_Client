import React from 'react';

const MCTable = ({ dataItems }) => {
  return (
    <>
      {dataItems.length !== 0 && (
        <div className="bg-blue-100 rounded-md p-2">
          <table>
            <thead>
              <tr className="border-b-2 border-blue-400 font-semibold">
                <td className="px-6 py-1 pl-2">Stock Name</td>
                <td className="px-6 py-1 pl-2">Percentage</td>
              </tr>
            </thead>
            <tbody>
              {dataItems.map((data) => (
                <tr>
                  <td>{data[0]}</td>
                  <td>{Math.round(Number(data[1]) * 100)} %</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default MCTable;
