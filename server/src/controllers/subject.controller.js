import prisma from '../config/database.js';

export const getSubjects = async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany({
      where: { schoolId: req.schoolId },
      orderBy: { name: 'asc' }
    });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createSubject = async (req, res) => {
  try {
    const { name, code, isActive } = req.body;
    const subject = await prisma.subject.create({
      data: { schoolId: req.schoolId, name, code, isActive }
    });
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await prisma.subject.update({
      where: { id, schoolId: req.schoolId },
      data: req.body
    });
    res.json(subject);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.subject.delete({ where: { id, schoolId: req.schoolId } });
    res.json({ message: 'Subject deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
