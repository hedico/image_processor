import express from 'express';
import tasksRouter from '../routes/taks';
import { errorHandler } from '../middlewares/error-handler';

// Initialize the Express application server
const app = express();

// Server configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/tasks', tasksRouter);

app.use(errorHandler);

export default app;
