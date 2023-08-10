import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  ResponsiveContainer
} from "recharts";


const Histogram = ({ studentsData }) => {
  const maxCount = Math.max(...studentsData.map((entry) => entry.count));

  return (
    <ResponsiveContainer width="50%" height="50%">
        <BarChart
        data={studentsData}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
        }}
        >
        <CartesianGrid />
        <XAxis dataKey="bin" />
        <YAxis domain={[0, maxCount + 2]}>
            <Label
            value="Student count"
            position="insideLeft"
            angle={-90}
            offset={-15}
            style={{ textAnchor: "middle" }}
            />
        </YAxis>
        <Tooltip />
        <Bar dataKey="count" fill="#1aac83" />
        </BarChart>
    </ResponsiveContainer>
  );
}

export default Histogram;