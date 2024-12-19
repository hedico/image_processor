import express from 'express';
import tasksRouter from '../routes/taks';

// Initialize the Express application server
const app = express();

// Server configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/tasks', tasksRouter);

export default app;
