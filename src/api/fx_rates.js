import fixerAPI from './fixerAPI';

/**
 * Historical rates are available for most currencies all the way back to the year of 1999.
 * You can query the Fixer API for historical rates by appending a date (format YYYY-MM-DD)
 * to the base URL.
 * @param {string} date A date in the past for which historical rates are requested.
 * @param {string} base Enter the three-letter currency code of your preferred base currency.
 * @param {string[]} symbols Enter a list of comma-separated currency codes to limit output
 * currencies.
 * @returns {Object}
 */
export const fetchHistoricalRates = async (date, base, symbols) => {
  const params = {
    base,
    symbols: symbols.join(','),
  };
  const { data } = await fixerAPI.get(`/${date}`, { params });
  return data;
};
