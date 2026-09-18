import prisma from '../config/database.js';

export const getStats = async (req, res) => {
  try {
    const studentCount = await prisma.student.count({ where: { schoolId: req.schoolId } });
    const classCount = await prisma.class.count({ where: { schoolId: req.schoolId } });
    const subjectCount = await prisma.subject.count({ where: { schoolId: req.schoolId } });
    const teacherCount = await prisma.user.count({ where: { schoolId: req.schoolId, role: 'TEACHER' } });

    res.json({
      students: studentCount,
      classes: classCount,
      subjects: subjectCount,
      teachers: teacherCount
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
