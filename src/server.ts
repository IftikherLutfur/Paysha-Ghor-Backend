import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from './app' // assuming you export your Express app from this file
import { Server } from 'http'

dotenv.config()

const port = process.env.PORT || 5000;

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`)
    console.log('✅ Database Connected')
    
    server = app.listen(port, () => {
      console.log(`🚀 App listening on port ${port}`)
    })

  } catch (error) {
    console.error('❌ Failed to connect database:', error)
  }
}

startServer()
