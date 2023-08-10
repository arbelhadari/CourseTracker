import React from "react";
import {categorizeStudentsByGrade} from "../utils.js"

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
  return (
    <ResponsiveContainer width="50%" height="50%">
        <BarChart
        data={categorizeStudentsByGrade(studentsData)}
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