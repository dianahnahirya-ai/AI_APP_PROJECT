import prisma from '../config/database.js';

export const getClasses = async (req, res) => {
  try {
    const classes = await prisma.class.findMany({
      where: { schoolId: req.schoolId },
      orderBy: { sortOrder: 'asc' }
    });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createClass = async (req, res) => {
  try {
    const { name, stream, sortOrder } = req.body;
    const cls = await prisma.class.create({
      data: { schoolId: req.schoolId, name, stream, sortOrder }
    });
    res.status(201).json(cls);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const cls = await prisma.class.update({
      where: { id, schoolId: req.schoolId },
      data: req.body
    });
    res.json(cls);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.class.delete({ where: { id, schoolId: req.schoolId } });
    res.json({ message: 'Class deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
