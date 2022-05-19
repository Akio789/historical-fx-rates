import React, { useEffect } from 'react';
import c3 from 'c3';
import 'c3/c3.css';
// import { fetchHistoricalRates } from '../api/fx_rates';

const HistoricalFxData = () => {
  useEffect(() => {
    // fetchHistoricalRates('2022-01-01', 'USD', ['EUR', 'CAD']);
    c3.generate({
      bindto: '#historical-fx-data-chart',
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25],
        ],
      },
    });
  }, []);

  return (
    <div>
      <div>HistoricalFxData</div>
      <div id="historical-fx-data-chart" />
    </div>
  );
};

export default HistoricalFxData;
