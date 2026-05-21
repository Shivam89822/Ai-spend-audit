// Express app configuration
import express from 'express';
import auditRoutes from './routes/auditRoutes';
import leadRoutes from './routes/leadRoutes';
import summaryRoutes from './routes/summaryRoutes';
import errorHandler from './middleware/errorHandler';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/audits', auditRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/summaries', summaryRoutes);

// Error handling
app.use(errorHandler);

export default app;
