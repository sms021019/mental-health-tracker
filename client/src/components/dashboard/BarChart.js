// GoogleBarChart.js

import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

const BarChart = () => {
    // Data for the chart
    const emotion = "depressed";
    const [data, setData] = useState([
        ['Percentage', "Mental State Intensity"],
        ['01132024', 20],
        ['01132024', 33],
        ['01132024', 60],
        ['01132024', 90],
        ['01132024', 10],
    ]);
    // const data = [
    //     ['Percentage', emotion],
    //     ['New York City, NY', 20],
    //     ['Los Angeles, CA', 33],
    //     ['Chicago, IL', 60],
    //     ['Houston, TX', 90],
    //     ['Philadelphia, PA', 10],
    // ];
    // useEffect(() => {
    //     // Replace this logic with your actual data fetching or generation logic
    //     // For now, I'm just updating the data with some sample values after 2 seconds
    //     const timeout = setTimeout(() => {
    //         setData([
    //             ['Percentage', "Mental State Intensity"],
    //             ['01132024', 20],
    //             ['01132024', 33],
    //             ['01132024', 60],
    //             ['01132024', 90],
    //             ['01132024', 10],
    //         ]);
    //     }, 1000);

    //     return () => clearTimeout(timeout);
    // }, []);

    // Options for the chart
    const options = {
        title: 'Your Depression Level Log',
        chartArea: { width: '50%' },
        hAxis: {
            title: 'Date',
            minValue: 0,
            titleTextStyle: { color: 'white' }, // Change the color to your preferred color
            textStyle: { color: 'white' }
        },
        vAxis: {
            title: 'Percentage',
            titleTextStyle: { color: 'white' }, // Change the color to your preferred color
            textStyle: { color: 'white' }

        },
        backgroundColor: '#41434a',
        titleTextStyle: { color: 'white' }, // Change the color to your preferred color
        series: {
            0: { color: '#487575' }, // Change the color to your preferred color
        },
        legend: {
            textStyle: { color: 'white' }, // Change the color to your preferred color
        },
        animation: {
            startup: true,  // Enable animation on load
            duration: 1000, // Animation duration in milliseconds
            easing: 'out',  // Easing function for animation
        },
    };

    return (
        <Chart
            width={'700px'}
            height={'300px'}
            chartType="ColumnChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={options}
        />
    );
};

export default BarChart;




// // BarChart.js

// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Line, LineChart } from 'recharts';

// const BarChartComponent = ({ data }) => {
//     const linearRegression = (xs, ys) => {
//         const n = xs.length;
//         let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

//         for (let i = 0; i < n; i++) {
//             sumX += xs[i];
//             sumY += ys[i];
//             sumXY += xs[i] * ys[i];
//             sumX2 += xs[i] * xs[i];
//         }

//         const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
//         const b = (sumY - m * sumX) / n;

//         return { m, b };
//     };

//     // const lineData = data.map(item => ({ x: item.x, y: linearRegression(data.map(d => d.x), data.map(d => d.y)).m * item.x + linearRegression(data.map(d => d.x), data.map(d => d.y)).b }));
//     const CustomTooltip = ({ active, payload, label }) => {
//         if (active) {
//             return (
//                 <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
//                     <p style={{ color: 'black', margin: 0 }}>{`Date: ${label}`}</p>
//                     {payload.map((entry, index) => (
//                         <p key={`data-${index}`} style={{ color: entry.color, margin: 0 }}>
//                             {`${entry.name}: ${entry.value}`}
//                         </p>
//                     ))}
//                 </div>
//             );
//         }

//         return null;
//     };


//     return (
//         <BarChart width={800} height={400} data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             {/* <XAxis dataKey="x" type="number" /> */}
//             <XAxis dataKey="x" type="number" domain={[0, 100]} /> {/* Use "category" type for date values */}
//             <YAxis type="number" domain={[0, 100]} />
//             <Tooltip content={<CustomTooltip />} />

//             <Bar dataKey="y" fill="rgba(75,192,192,0.2)" stroke="rgba(75,192,192,1)" fillOpacity={0.8} />
//             {/* <LineChart data={lineData}>
//                 <Line type="monotone" dataKey="y" stroke="red" strokeWidth={2} dot={{ fill: 'red', r: 4 }} />
//             </LineChart> */}
//         </BarChart>
//     );
// };

// export default BarChartComponent;
