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

const data = [
  { bin: "0-10", count: 5 },
  { bin: "10-20", count: 8 },
  { bin: "20-30", count: 12 },
  { bin: "30-40", count: 15 },
  { bin: "40-50", count: 7 },
  { bin: "50-60", count: 15 },
  { bin: "60-70", count: 19 },
  { bin: "70-80", count: 2 },
  { bin: "80-90", count: 0 },
  { bin: "90-100", count: 10 },
];

const Histogram = ({ studentsData }) => {
    console.log(studentsData)
  return (
    <ResponsiveContainer width="50%" height="50%">
        <BarChart
        data={data}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="bin" />
        <YAxis domain={[0, 21]}>
            <Label
            value="Student count"
            position="insideLeft"
            angle={-90}
            offset={-15}
            style={{ textAnchor: "middle" }}
            />
        </YAxis>
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
    </ResponsiveContainer>
  );
}

export default Histogram;