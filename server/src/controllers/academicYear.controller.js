import prisma from '../config/database.js';

export const getYears = async (req, res) => {
  try {
    const years = await prisma.academicYear.findMany({
      where: { schoolId: req.schoolId },
      orderBy: { name: 'desc' }
    });
    res.json(years);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createYear = async (req, res) => {
  try {
    const { name, isCurrent } = req.body;
    
    if (isCurrent) {
      // Unset other current years
      await prisma.academicYear.updateMany({
        where: { schoolId: req.schoolId },
        data: { isCurrent: false }
      });
    }

    const year = await prisma.academicYear.create({
      data: { schoolId: req.schoolId, name, isCurrent }
    });
    res.status(201).json(year);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateYear = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isCurrent } = req.body;

    if (isCurrent) {
      await prisma.academicYear.updateMany({
        where: { schoolId: req.schoolId, id: { not: id } },
        data: { isCurrent: false }
      });
    }

    const year = await prisma.academicYear.update({
      where: { id, schoolId: req.schoolId },
      data: { name, isCurrent }
    });
    res.json(year);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteYear = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.academicYear.delete({ where: { id, schoolId: req.schoolId } });
    res.json({ message: 'Academic Year deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
