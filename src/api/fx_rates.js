import fixerAPI from './fixerAPI';

/**
 * If supported by your subscription plan, the Fixer API's timeseries endpoint lets you query
 * the API for daily historical rates between two dates of your choice, with a maximum time
 * frame of 365 days.
 * @param {string} startDate (format: YYYY-MM-DD) The start date of your preferred timeframe.
 * @param {string} endDate (format: YYYY-MM-DD) The end date of your preferred timeframe.
 * @param {string} base Enter the three-letter currency code of your preferred base currency.
 * @param {string[]} symbols Array of currency codes to limit output.
 * currencies.
 * @returns {Object}
 */
export const fetchTimeSeries = async (startDate, endDate, base, symbols) => {
  const params = {
    base,
    symbols: symbols.join(','),
    start_date: startDate,
    end_date: endDate,
  };
  const { data } = await fixerAPI.get('/timeseries', { params });
  return data;
};
