import prisma from '../config/database.js';

export const getSchools = async (req, res) => {
  try {
    const schools = await prisma.school.findMany({ orderBy: { name: 'asc' } });
    res.json(schools);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createSchool = async (req, res) => {
  try {
    const { name, code, address, phone, email } = req.body;
    const existing = await prisma.school.findUnique({ where: { code } });
    if (existing) return res.status(400).json({ error: 'School code must be unique' });
    const school = await prisma.school.create({ data: { name, code, address, phone, email } });
    res.status(201).json(school);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const school = await prisma.school.update({
      where: { id },
      data: req.body
    });
    res.json(school);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteSchool = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.school.delete({ where: { id } });
    res.json({ message: 'School deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
