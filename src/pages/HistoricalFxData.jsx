import React, { useEffect } from 'react';
import { fetchHistoricalRates } from '../api/fx_rates';

const HistoricalFxData = () => {
  useEffect(() => {
    fetchHistoricalRates('2022-01-01', 'USD', ['EUR', 'CAD']);
  }, []);

  return (
    <div>HistoricalFxData</div>
  );
};

export default HistoricalFxData;
