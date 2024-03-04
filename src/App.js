import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily'
        );
        setData(response.data.prices);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 30000); // Fetch data every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Cryptocurrency Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <div>
          <h2>Bitcoin Price Trend</h2>
          <LineChart width={400} height={300} data={data}>
            <XAxis dataKey="0" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="1" stroke="#8884d8" />
          </LineChart>
        </div>
        <div>
          <h2>Bitcoin Price Distribution</h2>
          <BarChart width={400} height={300} data={data}>
            <XAxis dataKey="0" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="1" fill="#8884d8" />
          </BarChart>
        </div>
        <div>
          <h2>Cryptocurrency Market Share</h2>
          <PieChart width={400} height={300}>
            <Pie data={data} dataKey="1" nameKey="0" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" />
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default App;
