import app from './server';
import * as dotenv from 'dotenv';

// Load environment variables into process.env
dotenv.config();

const PORT = process.env.PORT || 3500;

// Start the server and listen for incoming requests
app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
