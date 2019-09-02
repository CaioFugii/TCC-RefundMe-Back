import * as mongoose from 'mongoose'

export default async function connectToMongo(
  // connectionString: string = process.env.MongoConnectionString,
  // autoIndex: boolean = JSON.parse(process.env.MongoAutoIndex)

  connectionString: string = "mongodb://db-stark-dev:IFp24MKJbukis60Xzzo2M6Uf6irl18Xr3yaJvh1txPzGOE4xdk6tnNz89R9IZuxt7xZg1dtQBLCieGanve8rrA==@db-stark-dev.documents.azure.com:10255/stark?ssl=true&replicaSet=globaldb",
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
