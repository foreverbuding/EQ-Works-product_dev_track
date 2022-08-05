import {useParams} from "react-router-dom";
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
import LineChart from "./components/LineChart";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const { RangePicker } = DatePicker;
const eventsHourlyDataOption = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Event Hourly Data',
    },
  },
};

function Detail() {
  const {poi_id} = useParams();
  const [eventsHourlyData, setEventsHourlyData] = useState(null);
  const [eventsHourlyRange, setEventsHourlyRange] = useState(null);

  const [eventsDailyData, setEventDailyData] = useState([]);
  const [statsHourlyData, setStatsHourlyData] = useState([]);
  const [statsDailyData, setStatsDailyData] = useState([]);
  useEffect(() => {
    if (eventsHourlyRange) {

      fetch(`http://localhost:5000/events/hourly/${poi_id}/${eventsHourlyRange[0]}/${eventsHourlyRange[1]}`)
        .then(res => res.json())
        .then(data => {
          const labels = data.map(item => moment(item.date).format("YYYY-MM-DD"));
          const datasets = [
            {
              label: 'Events Number',
              data: data.map(item => item.events),
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Events Hour',
              data: data.map(item => item.hour),
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ];
          console.log(labels, datasets)
          setEventsHourlyData({
            labels,
            datasets
          })
        })
    }
  }, [poi_id, eventsHourlyRange]);
  return (
    <div className={'container'}>
      <div className={'row'}>
        <div className={'col-6'}>
          <LineChart
            poi_id={poi_id}
            api={'/events/hourly'}
            labelMap={data => {
              return data.map(item => moment(item.date).format("YYYY-MM-DD"))
            }}
            datasetsMap={data => {
              return [
                {
                  label: 'Events Number',
                  data: data.map(item => item.events),
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                  label: 'Events Hour',
                  data: data.map(item => item.hour),
                  borderColor: 'rgb(53, 162, 235)',
                  backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
              ];
            }}
            title={'Event Hourly'}/>
        </div>
        <div className={'col-6'}>
          <LineChart
            poi_id={poi_id}
            api={'/events/daily'}
            labelMap={data => {
              return data.map(item => moment(item.date).format("YYYY-MM-DD"))
            }}
            datasetsMap={data => {
              return [
                {
                  label: 'Events Number',
                  data: data.map(item => item.events),
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
              ];
            }}
            title={'Event Daily'}/>
        </div>
      </div>




      <div className={'row'}>
        <div className={'col-6'}>
          <LineChart
            poi_id={poi_id}
            api={'/stats/hourly'}
            labelMap={data => {
              return data.map(item => moment(item.date).format("YYYY-MM-DD"))
            }}
            datasetsMap={data => {
              return [
                {
                  label: 'Clicks Number',
                  data: data.map(item => item.clicks),
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },

                {
                  label: 'Revenue',
                  data: data.map(item => Number(item.revenue)),
                  borderColor: 'rgb(138,238,9)',
                  backgroundColor: 'rgb(138,238,9)',
                },

              ];
            }}
            title={'Stats Hourly'}/>
        </div>
        <div className={'col-6'}>
          <LineChart
            poi_id={poi_id}
            api={'/stats/daily'}
            labelMap={data => {
              return data.map(item => moment(item.date).format("YYYY-MM-DD"))
            }}
            datasetsMap={data => {
              return [
                {
                  label: 'Clicks Number',
                  data: data.map(item => item.clicks),
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },

                {
                  label: 'Revenue',
                  data: data.map(item => Number(item.revenue)),
                  borderColor: 'rgb(138,238,9)',
                  backgroundColor: 'rgb(138,238,9)',
                },

              ];
            }}
            title={'Stats Daily'}/>
        </div>
      </div>
    </div>
  )
}

export default Detail;