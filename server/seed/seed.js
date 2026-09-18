import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateAccessCode } from '../src/utils/generateAccessCode.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Super Admin
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@eduresults.com' },
    update: {},
    create: {
      email: 'admin@eduresults.com',
      passwordHash: adminPassword,
      role: 'SUPER_ADMIN',
      fullName: 'Super Administrator'
    }
  });

  // Greenfield Academy
  const greenfield = await prisma.school.upsert({
    where: { code: 'GFA001' },
    update: {},
    create: {
      name: 'Greenfield Academy',
      code: 'GFA001',
      address: '123 Green Avenue',
      phone: '555-0101',
      email: 'contact@greenfield.edu'
    }
  });

  // Sunrise International
  const sunrise = await prisma.school.upsert({
    where: { code: 'SIS002' },
    update: {},
    create: {
      name: 'Sunrise International School',
      code: 'SIS002',
      address: '456 Sun Blvd',
      phone: '555-0202',
      email: 'hello@sunrise.edu'
    }
  });

  // School Admins
  await prisma.user.upsert({
    where: { email: 'admin@greenfield.edu' },
    update: {},
    create: {
      email: 'admin@greenfield.edu',
      passwordHash: adminPassword,
      role: 'SCHOOL_ADMIN',
      fullName: 'GFA Admin',
      schoolId: greenfield.id
    }
  });

  await prisma.user.upsert({
    where: { email: 'admin@sunrise.edu' },
    update: {},
    create: {
      email: 'admin@sunrise.edu',
      passwordHash: adminPassword,
      role: 'SCHOOL_ADMIN',
      fullName: 'SIS Admin',
      schoolId: sunrise.id
    }
  });

  // Academic Year & Term
  const year = await prisma.academicYear.create({
    data: { schoolId: greenfield.id, name: '2026-2027', isCurrent: true }
  });
  
  const term = await prisma.term.create({
    data: { yearId: year.id, name: 'Term 1', isCurrent: true, startDate: new Date('2026-09-01'), endDate: new Date('2026-12-15') }
  });

  // Classes
  const classA = await prisma.class.create({
    data: { schoolId: greenfield.id, name: 'Grade 10', stream: 'A', sortOrder: 10 }
  });

  // Subjects
  const math = await prisma.subject.create({ data: { schoolId: greenfield.id, name: 'Mathematics', code: 'MATH' } });
  const eng = await prisma.subject.create({ data: { schoolId: greenfield.id, name: 'English', code: 'ENG' } });
  const sci = await prisma.subject.create({ data: { schoolId: greenfield.id, name: 'Science', code: 'SCI' } });

  // Grading Scales
  const scales = [
    { minScore: 90, maxScore: 100, grade: 'A+', points: 4.0, remarks: 'Excellent' },
    { minScore: 80, maxScore: 89, grade: 'A', points: 3.6, remarks: 'Very Good' },
    { minScore: 70, maxScore: 79, grade: 'B', points: 3.0, remarks: 'Good' },
    { minScore: 60, maxScore: 69, grade: 'C', points: 2.0, remarks: 'Fair' },
    { minScore: 0, maxScore: 59, grade: 'F', points: 0.0, remarks: 'Fail' }
  ];
  for (const s of scales) {
    await prisma.gradingScale.create({ data: { ...s, schoolId: greenfield.id } });
  }

  // Students & Enrollments
  const students = [
    { fn: 'John', ln: 'Doe', reg: 'GFA-001' },
    { fn: 'Jane', ln: 'Smith', reg: 'GFA-002' },
    { fn: 'Alice', ln: 'Johnson', reg: 'GFA-003' }
  ];

  for (const st of students) {
    const student = await prisma.student.create({
      data: {
        schoolId: greenfield.id,
        firstName: st.fn,
        lastName: st.ln,
        registrationNumber: st.reg,
        accessCode: generateAccessCode()
      }
    });

    const enrollment = await prisma.enrollment.create({
      data: { studentId: student.id, classId: classA.id, termId: term.id }
    });

    // Results
    const subjects = [math, eng, sci];
    let total = 0;
    for (const sub of subjects) {
      const score = Math.floor(Math.random() * 41) + 60; // 60-100
      total += score;
      
      let gradeStr = 'C'; let remarksStr = 'Fair';
      if(score >= 90) { gradeStr='A+'; remarksStr='Excellent'; }
      else if(score >= 80) { gradeStr='A'; remarksStr='Very Good'; }
      else if(score >= 70) { gradeStr='B'; remarksStr='Good'; }

      await prisma.result.create({
        data: {
          enrollmentId: enrollment.id,
          subjectId: sub.id,
          score,
          grade: gradeStr,
          remarks: remarksStr
        }
      });
    }

    // Quick avg update just for seed
    const avg = total / 3;
    let og = 'C';
    if(avg >= 90) og='A+';
    else if(avg >= 80) og='A';
    else if(avg >= 70) og='B';
    
    await prisma.enrollment.update({
      where: { id: enrollment.id },
      data: { totalMarks: total, average: avg, overallGrade: og }
    });
  }

  console.log('Seed completed successfully');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
