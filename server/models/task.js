import mongoose from 'mongoose';
import express from 'express';
// import task from './route/taskRoutes'; // import routes

const taskSchema = new mongoose.Schema(
    {

       title: { type: String, required: true},
       done: { type: Boolean, default: false }, 
    },
    {timestamps: true}
);

export default mongoose.model('Task', taskSchema);

// const app = express();

// app.use(express.json()); // to read JSON from request body

// // Connect to MongoDB
// mongoose.connect('your_mongodb_url_here')
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// // Use the task routes
// app.use('/api/tasks', taskRoutes);

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });

