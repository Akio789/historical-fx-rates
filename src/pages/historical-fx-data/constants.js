export const CURRENCIES = {
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
};

export const DEFAULT_BASE_CURRENCY = CURRENCIES.USD;

export const DEFAULT_COMPARISON_CURRENCIES = [CURRENCIES.EUR, CURRENCIES.GBP];

export const MAX_RANGE_DAYS = 365;

export const ALERT_ERROR_MESSAGE = 'The date range can\'t exceed 365 days.';
