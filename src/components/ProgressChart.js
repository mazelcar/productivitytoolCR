import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const ProgressChart = ({ data, categories }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Progress Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {categories.map((category, index) => (
            <Line 
              key={category} 
              type="monotone" 
              dataKey={category} 
              stroke={`hsl(${index * 360 / categories.length}, 70%, 50%)`} 
            />
          ))}
          <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;