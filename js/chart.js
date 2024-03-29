import {formatToCurrency} from './table.js';

export function drawChart(dates, total, increments, texts, amount) {
  return new Chart("evoChart", {
    type: "line",
    data: {
      labels: dates,
      datasets: [{
        label: texts.total,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(34,57,89,1.0)", //Berkeley Blue
        borderColor: "rgba(34,57,89,0.2)",
        data: total
      },
      {
        label: texts.invested,
        fill: true,
        lineTension: 0.1,
        backgroundColor: "rgba(239,91,91,0.2)", //Bittersweet
        borderColor: "rgba(239,91,91,1)",
        data: increments
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true
      },
      elements: {
        point: {
          pointRadius: 2,
          hoverRadius: 5
        }
      },
      plugins : {
        title: {
          display: true,
          text: `${texts.totalAmount}: ${amount}`,
          font: {
            size: 20
          }
        },
        tooltip: {
          callbacks: {
            beforeTitle: function(context) {
              return texts.month;
            }
          }
        }
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: texts.months,
            color: '#000',
          }
        },
        y: {
          min: Math.floor(total[0]), 
          max: Math.ceil(total[total.length-1]),
          ticks: {
            callback: function(value) {
              return formatToCurrency(value);
            }
          }
        }
      }
    }
  });
}