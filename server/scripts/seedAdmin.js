import 'dotenv/config'
import mongoose from 'mongoose'
import User from '../models/User.js'
import { ROLES } from '../config/roles.js'

const seedAdmin = async () => {
  const uri = process.env.MONGODB_URI
  const email = process.env.ADMIN_EMAIL || 'admin@taskmanager.com'
  const password = process.env.ADMIN_PASSWORD || 'abcd1234'

  if (!uri) {
    console.error('MONGODB_URI is required')
    process.exit(1)
  }

  await mongoose.connect(uri)

  const existing = await User.findOne({ email })
  if (existing) {
    console.log(`Admin already exists: ${email}`)
    process.exit(0)
  }

  await User.create({
    firstName: 'System',
    lastName: 'Admin',
    email,
    password,
    role: ROLES.ADMIN,
    department: 'Management',
    jobTitle: 'Administrator',
    isEmailVerified: true,
  })

  console.log('Admin user created successfully')
  console.log(`Email: ${email}`)
  console.log(`Password: ${password}`)
  console.log('Change the password after first login.')

  process.exit(0)
}

seedAdmin().catch((err) => {
  console.error(err)
  process.exit(1)
})
