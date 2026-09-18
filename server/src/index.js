import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import schoolRoutes from './routes/school.routes.js';
import studentRoutes from './routes/student.routes.js';
import classRoutes from './routes/class.routes.js';
import subjectRoutes from './routes/subject.routes.js';
import academicYearRoutes from './routes/academicYear.routes.js';
import termRoutes from './routes/term.routes.js';
import resultRoutes from './routes/result.routes.js';
import parentRoutes from './routes/parent.routes.js';
import gradingRoutes from './routes/grading.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';

import { apiLimiter } from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Apply rate limiting to all requests
app.use('/api/', apiLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/academic-years', academicYearRoutes);
app.use('/api/terms', termRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/parent', parentRoutes);
app.use('/api/grading', gradingRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
