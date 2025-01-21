
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, LineChart, Line } from "recharts";

// Sample Data
const moodRatios = [
  { name: "Happy", value: 40 },
  { name: "Sad", value: 30 },
  { name: "Angry", value: 20 },
  { name: "Anxious", value: 10 },
];

const moodLogData = [
  { date: "2025-01-15", mood: "Happy", task_rate: 8 },
  { date: "2025-01-16", mood: "Sad", task_rate: 5 },
  { date: "2025-01-17", mood: "Angry", task_rate: 6 },
  { date: "2025-01-18", mood: "Anxious", task_rate: 4 },
];

// Chart Colors
const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#0088FE"];

const Demo = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Mood Ratios (Pie Chart)</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={moodRatios}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label
        >
          {moodRatios.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      <h2>Mood Task Rates (Bar Chart)</h2>
      <BarChart width={500} height={300} data={moodLogData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="task_rate" fill="#82ca9d" />
      </BarChart>

      <h2>Mood Trends Over Time (Line Chart)</h2>
      <LineChart width={500} height={300} data={moodLogData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="task_rate" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Demo;

// i want some visual representation in my mental wellness assistant project,using recharts in react.
// i have hapy_ratio,sad_ratio,angry_ratio,anxious_ratio,counts(no of days that used to calculate ratio). and i can get the mood log tabale values include columns :  date,mood,task_rate,