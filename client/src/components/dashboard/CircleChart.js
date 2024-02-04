// CircularProgressChart.js

import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

const CircleChart = () => {
    const completedPercentage = 75;
    // const [data, setData] = useState([
    //     ['Progress', completedPercentage],
    //     ['Remaining', 100 - completedPercentage],
    // ]);
    // const data = [
    //     ['Progress', completedPercentage],
    //     ['Remaining', 100 - completedPercentage]
    // ];
    const data = [
        ["Task", "Hours per Day"],
        ['Intensity', completedPercentage],
        ['Other', 100 - completedPercentage]
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
        title: 'Circular Progress Chart',
        pieHole: 0.6, // Set the size of the hole in the middle to create a circle
        pieSliceText: 'none', // Hide labels on the chart
        slices: {
            0: { color: '#487575' }, // Color for the completed portion
            1: { color: 'gray' }, // Color for the remaining portion
        },
        animation: {
            startup: true,  // Enable animation on load
            duration: 1000, // Animation duration in milliseconds
            easing: 'out',  // Easing function for animation
        },
        backgroundColor: '#41434a',
        chartArea: { width: 300, height: 300 },
        legend: {
            textStyle: { color: 'white' }, // Change the color to your preferred color
        },
    };

    return (
        <Chart
            width={'100%'}
            height={'100%'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={options}
        />
    );
};

export default CircleChart;
