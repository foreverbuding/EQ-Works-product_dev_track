import {useEffect, useState} from "react";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {DatePicker} from 'antd';

import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({poi_id, title, api, labelMap, datasetsMap}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    if (startDate && endDate) {
      fetch(`http://localhost:5000${api}/${poi_id}/${startDate}/${endDate}`)
        .then(res => res.json())
        .then(data => {
          const labels = labelMap(data);
          const datasets = datasetsMap(data);
          setChartData({
            labels,
            datasets
          })
        })
    }
  }, [poi_id, startDate, endDate]);
  return (
    <div className={'w-100'}>
      <h3 className={'mt-5'}>{title}</h3>
      <DatePicker
        className={'me-2'}
        onChange={m => setStartDate(m.format('YYYY-MM-DD'))}
        placeholder={'Start Date'} />
      <DatePicker
        placeholder={'End Date'}
        onChange={m => setEndDate(m.format('YYYY-MM-DD'))}
      />
      {chartData && <Line options={options} data={chartData} />}
    </div>
  )
}

export default LineChart;