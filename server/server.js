import dns from 'node:dns'; // or const dns = require('node:dns');
import "dotenv/config" 
import express from 'express';
import mongoose from 'mongoose';
import taskRoutes from "./route/task.js"; // import routes 

import cors from 'cors';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const uri = process.env.MONGODB_URI; // Get the MongoDB URI from environment variables
const app = express();
app.use(cors()); // Enable CORS
const PORT = process.env.PORT || 3000; // Use the PORT from .env or default to 3000

app.use(express.json()); // to read JSON from request body

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/api/tasks', taskRoutes);

// Connect to MongoDB
try {
  console.log('Connecting to MongoDB...',uri);
  // await mongoose.connect(uri);
  await mongoose.connect(uri, {
    connectTimeoutMS: 30000, // 30 seconds
    socketTimeoutMS: 45000,
  });
   console.log('Connected to MongoDB');
   app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
   }) 
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1); // Exit the process with an error code
}
