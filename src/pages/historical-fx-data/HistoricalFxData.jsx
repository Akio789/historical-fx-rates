import React, { useState, useEffect } from 'react';
import moment from 'moment';
import c3 from 'c3';
import { Alert, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'c3/c3.min.css';
import { fetchTimeSeries } from '../../api/fx_rates';
import { structureTimeSeriesData } from './helpers';
import {
  DEFAULT_BASE_CURRENCY,
  DEFAULT_COMPARISON_CURRENCIES,
  ALERT_ERROR_MESSAGE,
} from './constants';
import Header from '../../components/header/Header';
import styles from './HistoricalFxData.module.scss';

const HistoricalFxData = () => {
  const [startDate, setStartDate] = useState(moment(new Date()).add(-1, 'months').toDate());
  const [endDate, setEndDate] = useState(new Date());
  const [timeSeriesData, setTimeSeriesData] = useState({ rates: {} });
  const [error, setError] = useState('');

  const fetchAndStoreTimeSeriesData = async () => {
    const data = await fetchTimeSeries(
      moment(startDate).format('YYYY-MM-DD'),
      moment(endDate).format('YYYY-MM-DD'),
      DEFAULT_BASE_CURRENCY,
      DEFAULT_COMPARISON_CURRENCIES,
    );
    setTimeSeriesData(data);
  };

  useEffect(() => {
    fetchAndStoreTimeSeriesData();
  }, [startDate, endDate]);

  const generateChart = () => {
    const structuredData = structureTimeSeriesData(timeSeriesData);
    c3.generate({
      bindto: '#historical-fx-data-chart',
      data: {
        x: 'x',
        xFormat: '%Y-%m-%d',
        columns: structuredData,
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d',
          },
          label: 'Dates',
        },
        y: {
          label: 'USD Conversion Rate',
        },
      },
    });
  };

  useEffect(() => {
    generateChart();
  }, [timeSeriesData]);

  const onStartDateChange = (date) => {
    const dateRangeInDays = moment(endDate).diff(date, 'days');
    if (dateRangeInDays > 365) {
      setError(ALERT_ERROR_MESSAGE);
      return;
    }
    setError('');
    setStartDate(date);
  };

  const onEndDateChange = (date) => {
    const dateRangeInDays = moment(date).diff(startDate, 'days');
    if (dateRangeInDays > 365) {
      setError(ALERT_ERROR_MESSAGE);
      return;
    }
    setError('');
    setEndDate(date);
  };

  const alertError = (
    !!error && (
      <Alert
        variant="danger"
        dismissible
        onClose={() => setError('')}
      >
        {error}
      </Alert>
    )
  );

  return (
    <div>
      <Header />
      <Container className="pt-4">
        {alertError}
        <div className={styles['date-pickers']}>
          <h2>Select a date range</h2>
          <div>
            <p>Start date</p>
            <DatePicker
              selected={startDate}
              onChange={onStartDateChange}
              dateFormat="yyyy-MM-dd"
            />
          </div>
          <div>
            <p>End Date</p>
            <DatePicker
              selected={endDate}
              onChange={onEndDateChange}
              dateFormat="yyyy-MM-dd"
            />
          </div>
        </div>
        <div id="historical-fx-data-chart" />
      </Container>
    </div>
  );
};

export default HistoricalFxData;
