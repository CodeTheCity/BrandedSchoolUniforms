"use client";

import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function ScatterGraph() {
  const chartRef = useRef(null); // Ref to access the canvas element
  const chartInstanceRef = useRef(null); // Ref to store the chart instance

  useEffect(() => {
    // Fetch the data from the JSON file
    fetch('https://raw.githubusercontent.com/CodeTheCity/BrandedSchoolUniforms/scraper/data/sample_comparison_product.json')
      .then((response) => response.json())
      .then((jsonData) => {
        const schoolData = jsonData.schools.map((item) => ({
          x: item.avg_price,
          y: item.max_price,
        }));

        const chartData = {
          datasets: [{
            label: 'School Uniform Prices',
            data: schoolData,
            backgroundColor: 'rgba(255, 99, 132, 1)',
          }],
        };

        const chartOptions = {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom',
              title: {
                display: true,
                text: 'Average Price',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Max Price',
              },
            },
          },
        };

        // Destroy previous chart instance if exists
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        // Check if the canvas ref is attached to the canvas element
        if (chartRef.current) {
          // Initialize the Chart.js scatter graph
          const chartInstance = new Chart(chartRef.current, {
            type: 'scatter',
            data: chartData,
            options: chartOptions,
          });

          // Store the chart instance for potential cleanup
          chartInstanceRef.current = chartInstance;
        }
      });
  }, []);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default ScatterGraph;