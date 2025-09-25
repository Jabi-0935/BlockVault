import React from "react";
import { AssetProvider, useDash } from "../context/DashContext";
import HighchartsReact from "highcharts-react-official";
import Highcharts, { chart, Series } from "highcharts";

const BarChart = ({ type = "column" }) => {
  let { assets } = useDash();
  assets = assets.per_asset;

  if (!assets || assets.length === 0) {
    return (
      <div className="w-full xl:w-1/2 px-4 py-2 border border-white rounded-lg mt-2">
        <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-lg md:text-xl leading-7">
          Returns
        </h3>
        <div className="flex items-center justify-center h-48">
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-full xl:w-1/2 px-4 py-2 border border-white rounded-lg mt-2">
        <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-lg md:text-xl leading-7">
          Returns
        </h3>
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            accessibility: {
              enabled: false,
            },
            chart: {
              type: type,
              backgroundColor: null,
              width: null,
              height: null,
            },
            title: {
              text: null,
            },
            xAxis: {
              categories: assets.map((item) => item.cryptoName),
              labels: {
                style: {
                  color: "#ffffff",
                },
              },
            },
            yAxis: {
              title: {
                text: "Returns ($)",
                style: {
                  color: "#ffffff",
                },
              },
              labels: {
                style: {
                  color: "#ffffff",
                },
              },
            },
            plotOptions: {
              column: {
                dataLabels: {
                  enabled: false,
                },
                colorByPoint: true,
              },
              bar: {
                dataLabels: {
                  enabled: false,
                },
                colorByPoint: true,
              },
            },
            legend: {
              enabled: false,
            },
            tooltip: {
              pointFormat: "<b>${point.y:,.2f}</b>",
              headerFormat:
                '<span style="font-size:10px">{point.key}</span><br/>',
            },
            series: [
              {
                name: "Returns",
                data: assets.map((item) => ({
                  name: item.cryptoName,
                  y: item.returns,
                })),
              },
            ],
            responsive: {
              rules: [
                {
                  condition: {
                    maxWidth: 768,
                  },
                  chartOptions: {
                    chart: { height: 250 },
                  },
                },
              ],
            },
          }}
        />
      </div>
    </>
  );
};

export default BarChart;
