import prisma from '../config/database.js';

export const lookupResult = async (req, res) => {
  try {
    const { registrationNumber, accessCode, termId } = req.body;

    if (!registrationNumber || !accessCode) {
      return res.status(400).json({ error: 'Registration number and access code are required' });
    }

    const student = await prisma.student.findFirst({
      where: { registrationNumber, accessCode },
      include: { school: true }
    });

    if (!student) {
      return res.status(401).json({ error: 'Invalid registration number or access code' });
    }

    // Record access
    await prisma.parentAccess.create({
      data: { studentId: student.id, lastAccessed: new Date() }
    });

    // Fetch enrollments and results
    let enrollmentsWhere = { studentId: student.id };
    if (termId) enrollmentsWhere.termId = termId;

    const enrollments = await prisma.enrollment.findMany({
      where: enrollmentsWhere,
      include: {
        term: { include: { academicYear: true } },
        class: true,
        results: { include: { subject: true } }
      },
      orderBy: { term: { startDate: 'desc' } } // Latest first
    });

    res.json({
      student: {
        firstName: student.firstName,
        lastName: student.lastName,
        registrationNumber: student.registrationNumber,
        school: student.school.name,
        logo: student.school.logoUrl
      },
      enrollments
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
