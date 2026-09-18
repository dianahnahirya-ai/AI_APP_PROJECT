import prisma from '../config/database.js';

export const determineGrade = async (schoolId, score) => {
  const scales = await prisma.gradingScale.findMany({
    where: { schoolId },
    orderBy: { minScore: 'desc' }
  });

  for (const scale of scales) {
    if (score >= scale.minScore && score <= scale.maxScore) {
      return { grade: scale.grade, remarks: scale.remarks, points: scale.points };
    }
  }

  return { grade: null, remarks: null, points: null };
};
