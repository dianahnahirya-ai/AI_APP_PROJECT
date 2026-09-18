import prisma from '../config/database.js';

export const getGradingScales = async (req, res) => {
  try {
    const scales = await prisma.gradingScale.findMany({
      where: { schoolId: req.schoolId },
      orderBy: { minScore: 'desc' }
    });
    res.json(scales);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createGradingScale = async (req, res) => {
  try {
    const { minScore, maxScore, grade, points, remarks } = req.body;
    const scale = await prisma.gradingScale.create({
      data: { schoolId: req.schoolId, minScore, maxScore, grade, points, remarks }
    });
    res.status(201).json(scale);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateGradingScale = async (req, res) => {
  try {
    const { id } = req.params;
    const scale = await prisma.gradingScale.update({
      where: { id, schoolId: req.schoolId },
      data: req.body
    });
    res.json(scale);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteGradingScale = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.gradingScale.delete({ where: { id, schoolId: req.schoolId } });
    res.json({ message: 'Grading scale deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
