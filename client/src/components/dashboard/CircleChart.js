// CircularProgressChart.js

import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const CircleChart = ({ userData }) => {
  const completedPercentage = 75;
  var maxObject = 0;
  var maxPercentage = 0;
  if (userData) {
    maxObject = userData.reduce(
      (max, obj) => (obj.stress_point > max.stress_point ? obj : max),
      userData[0]
    );
    maxPercentage = Math.round(maxObject.stress_point * 100);
  }

  const data = [
    ["Task", "Hours per Day"],
    ["Intensity", maxPercentage],
    ["Other", 100 - maxPercentage],
  ];

  // useEffect(() => {
  //     // Update the data with the completed and remaining percentages
  //     setData([
  //         ['Progress', completedPercentage],
  //         ['Remaining', 100 - completedPercentage],
  //     ]);
  // }, [completedPercentage]);

  // Options for the chart
  const options = {
    title: "Circular Progress Chart",
    pieHole: 0.6,
    pieSliceText: "none",
    slices: {
      0: { color: "#a7caed" },
      1: { color: "gray" },
    },
    animation: {
      startup: true,
      duration: 1000,
      easing: "out",
    },
    backgroundColor: "#41434a",
    chartArea: { width: 300, height: 300 },
    legend: {
      textStyle: { color: "white" },
    },
  };

  return (
    // TODO: display the emotion (text)
    <Chart
      width={"100%"}
      height={"100%"}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={options}
    />
  );
};

export default CircleChart;
