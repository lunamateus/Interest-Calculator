export function drawChart(xData, yData, head) {
    return new Chart("evoChart", {
      type: "line",
      data: {
        labels: xData,
        datasets: [{
          label: `Investment`,
          fill: false,
          lineTension: 1,
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.2)",
          data: yData
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
            min: Math.floor(yData[0]), 
            max: Math.ceil(yData[yData.length-1]),
            ticks: {
              callback: function(value, index, ticks) {
                return '$' + value;
              }
            }
          }
        }
      }
    });
  }