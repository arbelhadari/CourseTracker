
export function categorizeStudentsByGrade(students) {
    const gradeBins = Array(10).fill(0);

  for (const student of students) {
    let binIndex = Math.floor(student.grade / 10);
    if (binIndex >= 10) {
      binIndex = 9;
    }
    gradeBins[binIndex]++;
  }

  const result = gradeBins.map((count, index) => {
    let binStart = index * 10;
    let binEnd = binStart + 9;
    if (index === 9) {
      binEnd = 100;
    }
    return { bin: `${binStart}-${binEnd}`, count };
  });

  return result;
}


export function categorizeStudentsByAge(students) {
    const ageBins = new Map();
    ageBins.set("0-17", 0);
    ageBins.set("18-24", 0);
    ageBins.set("25-30", 0)
    ageBins.set("31+", 0);

    const now = new Date();

    for (const student of students) {
        const dob = new Date(student.StudentDOB);
        const age = now.getFullYear() - dob.getFullYear();
        if (age <= 17) {
            ageBins.set("0-17", ageBins.get("0-17") + 1);
        } else if (age <= 24) {
            ageBins.set("18-24", ageBins.get("18-24") + 1);
        } else if (age <= 30) {
            ageBins.set("25-30", ageBins.get("25-30") + 1);
        } else {
            ageBins.set("31+", ageBins.get("31+") + 1);
        }
    }

    console.log(Array.from(ageBins, ([name, value]) => ({ name, value })));
    return Array.from(ageBins, ([name, value]) => ({ name, value }));
}

export function categorizeStudentsByGender(students) {
    let maleCount = 0;
    let femaleCount = 0;

    for (const student of students) {
        if (student.Gender === "M") 
            maleCount++;
        
            else if (student.Gender === "F") 
        femaleCount++;
    }

    return [{"name": "M", "value": maleCount}, {"name": "F", "value": femaleCount}];
}


export function getAverageGrade(students) {
    if (students.length === 0)
        return "-";
    let gradeSum = 0;

    for (const student of students) {
        gradeSum += student.grade;
    }

    return (gradeSum / students.length).toFixed(2);
}

export function getMinGrade(students) {
    if (students.length === 0)
        return "-";

    let minGrade = 100;
    for (const student of students) {
        if (student.grade < minGrade) 
            minGrade = student.grade || 0;
    }
    return minGrade;
}

export function getMaxGrade(students) {
    if (students.length === 0)
        return "-";

    let maxGrade = 0;
    for (const student of students) {
        if (student.grade > maxGrade) 
            maxGrade = student.grade;
    }
    return maxGrade;
}