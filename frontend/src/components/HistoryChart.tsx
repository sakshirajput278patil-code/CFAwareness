import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCarbonStore } from '../store/carbonStore';

export const HistoryChart: React.FC = () => {
  const { history } = useCarbonStore();

  if (!history || history.length < 2) return null;

  const data = history.map((entry, index) => ({
    name: `Session ${index + 1}`,
    emissions: entry.total_kg_co2e
  }));

  return (
    <div className="card w-full max-w-2xl mx-auto my-8">
      <h2 className="text-xl mb-6 text-primary">Your Carbon Trend</h2>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} role="img" aria-label="Line chart showing your carbon emissions trend over time.">
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8C39E" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#4A6254', fontSize: 12}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#4A6254', fontSize: 12}} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px -2px rgba(47, 107, 79, 0.08)' }}
              itemStyle={{ color: '#2F6B4F', fontWeight: 'bold' }}
            />
            <Line type="monotone" dataKey="emissions" stroke="#2F6B4F" strokeWidth={3} dot={{r: 4, fill: '#8FD9A8', strokeWidth: 2}} activeDot={{r: 6}} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Visually hidden data table fallback for screen readers */}
      <table className="sr-only">
        <caption>Carbon Emissions Trend Data</caption>
        <thead>
          <tr>
            <th scope="col">Session</th>
            <th scope="col">Emissions (kg CO2e)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.name}</td>
              <td>{row.emissions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
