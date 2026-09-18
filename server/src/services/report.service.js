import prisma from '../config/database.js';
import { determineGrade } from './grading.service.js';

export const calculateRankings = async (schoolId, classId, termId) => {
  const enrollments = await prisma.enrollment.findMany({
    where: { classId, termId },
    include: { results: true }
  });

  if (enrollments.length === 0) return;

  const data = [];
  for (const e of enrollments) {
    let totalMarks = 0;
    for (const r of e.results) {
      totalMarks += r.score;
    }
    const average = e.results.length > 0 ? totalMarks / e.results.length : 0;
    
    // determine overall grade
    const overallInfo = await determineGrade(schoolId, average);

    data.push({
      id: e.id,
      totalMarks,
      average,
      overallGrade: overallInfo.grade || null
    });
  }

  // Sort by total marks desc
  data.sort((a, b) => b.totalMarks - a.totalMarks);

  let position = 1;
  for (let i = 0; i < data.length; i++) {
    if (i > 0 && data[i].totalMarks === data[i-1].totalMarks) {
      data[i].position = data[i-1].position;
    } else {
      data[i].position = position;
    }
    position++;
  }

  // update db
  for (const d of data) {
    await prisma.enrollment.update({
      where: { id: d.id },
      data: {
        totalMarks: d.totalMarks,
        average: d.average,
        overallGrade: d.overallGrade,
        position: d.position
      }
    });
  }
};
