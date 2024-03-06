import {formatToCurrency} from './table.js';

export function drawChart(time, total, increments, head) {
    return new Chart("evoChart", {
      type: "line",
      data: {
        labels: time,
        datasets: [{
          label: `Total`,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(34,57,89,1.0)", //Berkeley Blue
          borderColor: "rgba(34,57,89,0.2)",
          data: total
        },
        {
          label: `Invested`,
          fill: true,
          lineTension: 0.1,
          backgroundColor: "rgba(239,91,91,0.2)", //Bittersweet
          borderColor: "rgba(239,91,91,1)",
          pointRadius: 0,
          data: increments
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: true
        },
        plugins : {
          title: {
            display: true,
            text: head,
            font: {
              size: 20
            }
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Months',
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