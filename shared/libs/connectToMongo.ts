import * as mongoose from 'mongoose'

export default async function connectToMongo(
  connectionString: string = process.env.MongoConnectionString,
  autoIndex: boolean = true
) {
  if (!mongoose.connection || !mongoose.connection.readyState) {
    await mongoose.connect(connectionString, {
      autoIndex,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false
    });
  }

  return mongoose.connection;
}
