import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

const moodRatios = [
  { name: "Happy", value: 50 },
  { name: "Sad", value: 10 },
  { name: "Angry", value: 20 },
  { name: "Anxious", value: 20 },
];

const count = 1000; // Total entries (count)

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Original color palette

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-green-50 border border-green-500 rounded-md p-2 shadow">
        <p className="text-green-700 font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
        <p className="text-green-700">Total Entries: {count}</p> {/* Displaying total count */}
      </div>
    );
  }
  return null;
};

const Demo = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white space-y-10">
      <PieChart width={400} height={400}>
        <Pie
          data={moodRatios}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          label
        >
          {moodRatios.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{ color: "#008000" }} // Green legend text
        />
      </PieChart>

      <AreaChart
        width={600}
        height={300}
        data={moodRatios}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area stackId="a" type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        <Area stackId="a" type="monotone" dataKey="value" stroke="#00C49F" fill="#00C49F" />
        <Area stackId="a" type="monotone" dataKey="value" stroke="#FFBB28" fill="#FFBB28" />
        <Area stackId="a" type="monotone" dataKey="value" stroke="#FF8042" fill="#FF8042" />
        <text x="50%" y="20" textAnchor="middle" fontSize="16" fill="#333">{`Total Mood Logs: ${count}`}</text> {/* Total count in Area chart */}
      </AreaChart>
    </div>
  );
};

export default Demo;
