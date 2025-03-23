import { Buffer } from 'buffer';
import ChartJSImage from 'chart.js-image';

import { sendErrorMessage } from '../modules/messages.js';

export const unicUsersChart = async (bot, chatId, chartData) => {
  try {
    const chart = ChartJSImage()
      .chart({
        type: 'line',
        data: {
          labels: Object.keys(chartData),
          datasets: [
            {
              borderColor: 'orange',
              backgroundColor: 'white',
              fill: false,
              borderWidth: 2,
              data: Object.values(chartData),
            },
          ],
        },
        options: {
          title: { display: true, text: 'New users' },
          legend: { display: false },
          scales: { yAxes: [{ ticks: { beginAtZero: false } }] },
        },
      })
      .backgroundColor('white')
      .width(700)
      .height(400);

    chart.toDataURI().then((res) => {
      bot.sendPhoto(chatId, Buffer.from(res.substr(21), 'base64'), {
        filename: 'image',
        contentType: 'image/png',
      });
    });
  } catch (error) {
    sendErrorMessage(error, bot, chatId);
  }
};
