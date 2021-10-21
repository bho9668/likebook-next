import { connect, connection } from 'mongoose';

const connectToDatabase = async () => (
  await connect(process.env.DB_CONNECTION_STRING || '', { useNewUrlParser: true, useUnifiedTopology: true })
  );

export { connectToDatabase, connection };