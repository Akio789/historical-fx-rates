import React, { useState, useEffect } from 'react';
import moment from 'moment';
import c3 from 'c3';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'c3/c3.min.css';
import { fetchTimeSeries } from '../../api/fx_rates';
import { structureTimeSeriesData } from './helpers';
import { DEFAULT_BASE_CURRENCY, DEFAULT_COMPARISON_CURRENCIES } from './constants';

const HistoricalFxData = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timeSeriesData, setTimeSeriesData] = useState({ rates: {} });

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

  return (
    <div>
      <div>HistoricalFxData</div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
      />
      <div id="historical-fx-data-chart" />
    </div>
  );
};

export default HistoricalFxData;
