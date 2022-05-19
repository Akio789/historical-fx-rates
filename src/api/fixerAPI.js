import Axios from 'axios';

/**
 * API documentation: https://fixer.io/documentation
 */
const fixerAPI = Axios.create({
  baseURL: 'https://api.apilayer.com/fixer',
  headers: { apikey: process.env.REACT_APP_FIXER_API_KEY },
});

export default fixerAPI;
