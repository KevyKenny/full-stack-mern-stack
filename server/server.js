import dns from 'node:dns'
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dns.setServers(['8.8.8.8', '1.1.1.1'])

const app = express()
const PORT = process.env.PORT || 3000
const uri = process.env.MONGODB_URI

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Task Manager API is running',
    version: '1.0.0',
  })
})

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/tasks', taskRoutes)

app.use(notFound)
app.use(errorHandler)

const startServer = async () => {
  if (!uri) {
    console.error('MONGODB_URI is missing from environment variables')
    process.exit(1)
  }

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is missing from environment variables')
    process.exit(1)
  }

  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(uri, {
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    })

    console.log('Connected to MongoDB')

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1)
  }
}

startServer()
