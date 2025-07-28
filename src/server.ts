import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from './app' // assuming you export your Express app from this file
import { Server } from 'http'

dotenv.config()

const port = process.env.PORT || 5000

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hyx8zzc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    console.log('✅ Database Connected')

    server = app.listen(port, () => {
      console.log(`🚀 App listening on port ${port}`)
    })

  } catch (error) {
    console.error('❌ Failed to connect database:', error)
  }
}

startServer()
