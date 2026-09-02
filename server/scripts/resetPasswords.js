import 'dotenv/config'
import mongoose from 'mongoose'
import User from '../models/User.js'

const DEFAULT_PASSWORD = process.env.RESET_PASSWORD || 'abcd1234'

const resetPasswords = async () => {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    console.error('MONGODB_URI is required')
    process.exit(1)
  }

  await mongoose.connect(uri)

  const users = await User.find()
  if (users.length === 0) {
    console.log('No users found.')
    process.exit(0)
  }

  for (const user of users) {
    user.password = DEFAULT_PASSWORD
    await user.save()
    console.log(`Reset password for ${user.email}`)
  }

  console.log(`\nAll ${users.length} user(s) now use password: ${DEFAULT_PASSWORD}`)
  process.exit(0)
}

resetPasswords().catch((err) => {
  console.error(err)
  process.exit(1)
})
