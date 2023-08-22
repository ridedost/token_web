import React from "react";
import ReactApexChart from "react-apexcharts";
import "./index.css";

function GraficoDonut({ TotalPoints, CreditadePoints, DebitadePoints }) {
  const series = [TotalPoints, CreditadePoints, DebitadePoints];

  const options = {
    chart: {
      type: "donut",
    },
    legend: {
      show: false,
      position: "bottom",
      width: 120,
    },
    responsive: [
      {
        breakpoint: 320,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    labels: ["TotalPoints", "CreditadePoints", "DebitadePoints"],
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        const seriesName = opts.w.globals.seriesNames[opts.seriesIndex];
        // return seriesName + ": " + val;
        return;
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    annotations: {
      points: [
        {
          x: "50%",
          y: "50%",
          marker: {
            size: 0,
          },
          label: {
            text: TotalPoints,
            style: {
              fontSize: "16px",
            },
          },
        },
      ],
    },
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="donut" />
    </div>
  );
}

const DonutChart = ({ TotalPoints, CreditadePoints, DebitadePoints }) => {
  return (
    <>
      <h3>Points</h3>
      <div className="donut-chart">
        <GraficoDonut
          TotalPoints={TotalPoints}
          CreditadePoints={CreditadePoints}
          DebitadePoints={DebitadePoints}
        />
      </div>
    </>
  );
};

export default DonutChart;
