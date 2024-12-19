import app from './server';
import * as dotenv from 'dotenv';
import * as mongo from '../db';

const startServer = async () => {
  // Loads environment variables into process.env
  dotenv.config();

  const PORT = process.env.PORT || 3500;

  await mongo.connect();

  // Start the server and listen for incoming requests
  app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
};

// Starts server instance and connects to database
startServer();
