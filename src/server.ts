// server.ts

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log('✅ Database Connected');

    app.listen(port, () => {
      console.log(`🚀 App listening on port ${port}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to database:', error);
    process.exit(1); // Exit with failure
  }
};

startServer();
