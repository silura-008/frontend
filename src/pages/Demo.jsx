import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const moodRatios = [
  { name: "Happy", value: 50 },
  { name: "Sad", value: 10 },
  { name: "Angry", value: 20 },
  { name: "Anxious", value: 20 },
];

const count = 1000; // Total entries (count)

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]; // Original color palette

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    if (payload[0].payload) {
      return (
        <div className="bg-green-50 border border-green-500 rounded-md p-2 shadow">
          <p className="text-green-700 font-medium">{`${payload[0].payload.name}: ${payload[0].payload.value}%`}</p>
          <p className="text-green-700">Total Entries: {count}</p> {/* Displaying total count */}
        </div>
      );
    } else {
      return (
        <div className="bg-green-50 border border-green-500 rounded-md p-2 shadow">
          <p className="text-green-700 font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
          <p className="text-green-700">Total Entries: {count}</p> {/* Displaying total count */}
        </div>
      );
    }
  }
  return null;
};

const Demo = () => {
  return (
    <div className="h-auto grid grid-cols-1 justify-items-center place-items-center md:grid-cols-2 gap-8 bg-white pt-10 pb-10">
      
      {/* Pie Chart with ResponsiveContainer */}
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
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
      </ResponsiveContainer>
        
      {/* Area Chart with ResponsiveContainer */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={moodRatios}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Area stackId="a" type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
          <Area stackId="a" type="monotone" dataKey="value" stroke="#00C49F" fill="#00C49F" />
          <Area stackId="a" type="monotone" dataKey="value" stroke="#FFBB28" fill="#FFBB28" />
          <Area stackId="a" type="monotone" dataKey="value" stroke="#FF8042" fill="#FF8042" />
          <text x="50%" y="20" textAnchor="middle" fontSize="16" fill="#333">
            {`Total Mood Logs: ${count}`}
          </text>
        </AreaChart>
      </ResponsiveContainer>
      
      {/* Bar Chart with ResponsiveContainer */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={moodRatios}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis type="number" domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value">
            {moodRatios.map((entry, index) => (
              <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Radial Bar Chart with ResponsiveContainer */}
      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="20%"
          outerRadius="90%"
          barSize={15}
          data={moodRatios}
          startAngle={90} // Start the chart at 90 degrees
          endAngle={-270} // Rotate clockwise to prevent overlap
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tickFormatter={(tick) => (tick === 100 ? '' : `${tick}%`)} // Remove 100% label, keep others
          />
          <RadialBar background clockWise dataKey="value" fillOpacity={0.8}>
            {moodRatios.map((entry, index) => (
              <Cell key={`radial-cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </RadialBar>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconSize={10}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ color: "#333" }}
          />
        </RadialBarChart>
      </ResponsiveContainer>

    </div>
  );
};

export default Demo;
