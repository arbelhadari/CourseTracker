import React from "react";


export function categorizeStudentsByGrade(students) {
    console.log(students)
    const gradeBins = Array(10).fill(0);

    for (const student of students) {
        const binIndex = Math.floor(student.grade / 10);        
        gradeBins[binIndex]++;
    }

    const result = gradeBins.map((count, index) => {
        const binStart = index * 10;
        const binEnd = binStart + 10;
        return { bin: `${binStart}-${binEnd}`, count };
    });

    return result;
}