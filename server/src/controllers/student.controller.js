import prisma from '../config/database.js';
import { generateAccessCode } from '../utils/generateAccessCode.js';

export const getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      where: { schoolId: req.schoolId },
      orderBy: [{ lastName: 'asc' }, { firstName: 'asc' }]
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createStudent = async (req, res) => {
  try {
    const { registrationNumber, firstName, lastName, gender, dateOfBirth, parentName, parentPhone } = req.body;
    const accessCode = generateAccessCode();
    const student = await prisma.student.create({
      data: {
        schoolId: req.schoolId,
        registrationNumber,
        accessCode,
        firstName,
        lastName,
        gender,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        parentName,
        parentPhone
      }
    });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { dateOfBirth, ...rest } = req.body;
    const data = { ...rest };
    if (dateOfBirth) data.dateOfBirth = new Date(dateOfBirth);

    const student = await prisma.student.update({
      where: { id, schoolId: req.schoolId },
      data
    });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.student.delete({ where: { id, schoolId: req.schoolId } });
    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const generateCodes = async (req, res) => {
  try {
    const { studentIds } = req.body; // Array of IDs
    if (!studentIds || !Array.isArray(studentIds)) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const updated = [];
    for (const id of studentIds) {
      const code = generateAccessCode();
      const st = await prisma.student.update({
        where: { id, schoolId: req.schoolId },
        data: { accessCode: code }
      });
      updated.push(st);
    }
    res.json({ message: 'Access codes regenerated', students: updated });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
