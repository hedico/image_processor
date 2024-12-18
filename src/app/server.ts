import express from 'express';

// Initialize the Express application server
const app = express();

// Server configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app;
