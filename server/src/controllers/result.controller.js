import prisma from '../config/database.js';
import { determineGrade } from '../services/grading.service.js';
import { calculateRankings } from '../services/report.service.js';

export const saveResults = async (req, res) => {
  try {
    const { studentId, classId, termId, results } = req.body; // results is array of { subjectId, score }

    let enrollment = await prisma.enrollment.findUnique({
      where: { studentId_classId_termId: { studentId, classId, termId } }
    });

    if (!enrollment) {
      // Ensure student exists in this school
      const st = await prisma.student.findUnique({ where: { id: studentId, schoolId: req.schoolId } });
      if (!st) return res.status(404).json({ error: 'Student not found in this school' });
      
      enrollment = await prisma.enrollment.create({
        data: { studentId, classId, termId }
      });
    }

    for (const r of results) {
      const { grade, remarks } = await determineGrade(req.schoolId, r.score);
      
      await prisma.result.upsert({
        where: { enrollmentId_subjectId: { enrollmentId: enrollment.id, subjectId: r.subjectId } },
        update: { score: r.score, grade, remarks, enteredBy: req.user.id },
        create: { enrollmentId: enrollment.id, subjectId: r.subjectId, score: r.score, grade, remarks, enteredBy: req.user.id }
      });
    }

    // Trigger ranking update
    await calculateRankings(req.schoolId, classId, termId);

    res.json({ message: 'Results saved successfully' });
  } catch (error) {
    console.error('Save results error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getClassResults = async (req, res) => {
  try {
    const { classId, termId } = req.params;
    
    // verify class belongs to school
    const cls = await prisma.class.findFirst({ where: { id: classId, schoolId: req.schoolId } });
    if (!cls) return res.status(404).json({ error: 'Class not found' });

    const enrollments = await prisma.enrollment.findMany({
      where: { classId, termId },
      include: {
        student: true,
        results: {
          include: { subject: true }
        }
      },
      orderBy: { position: 'asc' }
    });

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
