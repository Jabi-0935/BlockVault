import React from "react";
import { AssetProvider, useDash } from "../context/DashContext";
import HighchartsReact from "highcharts-react-official";
import Highcharts, { chart, Series } from "highcharts";

const PieChart = ({ type = "pie" }) => {
  let { assets } = useDash();
  assets = assets.per_asset;

  return (
    <>
      {
        <div className="w-1/2 p-2 border border-white rounded-lg mt-2">
          <h3 className="mb-4 font-bold text-gray-900 dark:text-white text-lg md:text-xl leading-7">
            Holdings
          </h3>
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                type: type,
                backgroundColor: null,
                width: 597,
                height: 248,
              },
              title: {
                text: null,
              },
              plotOptions: {
                pie: {
                  innerSize: "60%",
                  dataLabels: {
                    enabled: false,
                  },
                  showInLegend: true,
                },
              },
              legend: {
                enabled: true,
                align: "right",
                verticalAlign: "middle",
                layout: "vertical",
                itemStyle: {
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: "normal",
                },
                labelFormatter: function () {
                  const percentage =
                    this.percentage !== undefined ? this.percentage : 0;
                  return `<span style="color: ${this.color}">${
                    this.name
                  }</span> <span style="color: #888">${percentage.toFixed(
                    2
                  )}%</span>`;
                },
              },
              tooltip: {
                pointFormat:
                  "<b>{point.percentage:.2f}%</b><br/>Value: ${point.y:,.2f}",
              },
              series: [
                {
                  name: "Holdings",
                  data: assets.map((item) => ({
                    name: item.cryptoName,
                    y: item.holding,
                  })),
                },
              ],
            }}
          />
        </div>
      }
    </>
  );
};

export default PieChart;
