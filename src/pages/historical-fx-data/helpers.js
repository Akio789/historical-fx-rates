/**
 * Structure time series data in order to be correctly consumed by c3.js chart.
 * @param {Object} timeSeriesData The data to be structured.
 * @returns {array[]}
 */
export const structureTimeSeriesData = ({ rates }) => {
  const dates = ['x'];
  const historicalCurrencyRates = {};
  Object.entries(rates).forEach(([date, currencyRates]) => {
    dates.push(date);
    Object.entries(currencyRates).forEach(([currency, rate]) => {
      if (!(currency in historicalCurrencyRates)) {
        historicalCurrencyRates[currency] = [];
      }
      historicalCurrencyRates[currency].push(rate);
    });
  });
  const historicalCurrencyRatesArray = [];
  Object.entries(historicalCurrencyRates)
    .forEach(([currency, historicalRates]) => {
      historicalCurrencyRatesArray.push([currency, ...historicalRates]);
    });
  return [
    dates,
    ...historicalCurrencyRatesArray,
  ];
};
