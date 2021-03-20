import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI!;

const connectDB = mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to database'))
  .catch(() => {
    console.log('Failed to connect to database.');
    process.exit(1);
  });

export default connectDB;
