import prisma from '../config/database.js';

export const getTerms = async (req, res) => {
  try {
    const { yearId } = req.params;
    const terms = await prisma.term.findMany({
      where: { yearId, academicYear: { schoolId: req.schoolId } },
      orderBy: { startDate: 'asc' }
    });
    res.json(terms);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createTerm = async (req, res) => {
  try {
    const { yearId, name, startDate, endDate, isCurrent } = req.body;
    
    // verify year belongs to school
    const year = await prisma.academicYear.findUnique({ where: { id: yearId, schoolId: req.schoolId } });
    if (!year) return res.status(404).json({ error: 'Academic Year not found' });

    if (isCurrent) {
      await prisma.term.updateMany({
        where: { academicYear: { schoolId: req.schoolId } },
        data: { isCurrent: false }
      });
    }

    const term = await prisma.term.create({
      data: { yearId, name, startDate: startDate ? new Date(startDate) : null, endDate: endDate ? new Date(endDate) : null, isCurrent }
    });
    res.status(201).json(term);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTerm = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, startDate, endDate, isCurrent } = req.body;
    
    const termExists = await prisma.term.findFirst({ where: { id, academicYear: { schoolId: req.schoolId } } });
    if (!termExists) return res.status(404).json({ error: 'Term not found' });

    if (isCurrent) {
      await prisma.term.updateMany({
        where: { academicYear: { schoolId: req.schoolId }, id: { not: id } },
        data: { isCurrent: false }
      });
    }

    const term = await prisma.term.update({
      where: { id },
      data: { name, startDate: startDate ? new Date(startDate) : null, endDate: endDate ? new Date(endDate) : null, isCurrent }
    });
    res.json(term);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteTerm = async (req, res) => {
  try {
    const { id } = req.params;
    const termExists = await prisma.term.findFirst({ where: { id, academicYear: { schoolId: req.schoolId } } });
    if (!termExists) return res.status(404).json({ error: 'Term not found' });

    await prisma.term.delete({ where: { id } });
    res.json({ message: 'Term deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
