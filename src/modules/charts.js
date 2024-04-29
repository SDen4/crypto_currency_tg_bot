import axios from 'axios';
import ChartJSImage from 'chart.js-image';

import { bfUrl } from '../../token.js';
import { timestamp } from '../utils/timestamp.js';

// TODO: add tooltips
export const getCharts = async (bot, chatId, selectedCurrency) => {
  await axios
    .get(
      `${bfUrl}/tickers/hist?symbols=t${String(selectedCurrency)
        .substring(1)
        .toUpperCase()}&limit=12`,
    )
    .then((response) => {
      const data = response.data.reverse().map((el) => ({
        value: el[1],
        date: timestamp(el[12]),
      })); //  [{ value: 64076, date: '28.04.2024 12:00' }]

      const chart = ChartJSImage()
        .chart({
          type: 'bar',
          data: {
            labels: data.map((el) => el.date.substr(10)),
            datasets: [
              {
                label: `${response?.data[0]?.[0].substr(1)}`,
                borderColor: 'red',
                backgroundColor: 'orange',
                borderWidth: 1,
                data: data.map((el) => el.value),
              },
            ],
          },
          options: {
            legend: { display: false },
            scales: { yAxes: [{ ticks: { beginAtZero: false } }] },
            title: { display: false },
            // tooltips: {
            //   label: ['1', '2', '3'],
            //   enabled: true,
            //   callbacks: {},
            // },
          },
        })
        .backgroundColor('white')
        .width(600)
        .height(300);

      chart.toDataURI().then((res) => {
        // console.log('res: ', res);
        bot.sendPhoto(chatId, Buffer.from(res.substr(21), 'base64'), {
          filename: 'image',
          contentType: 'image/png',
        });
      });
    });
};
