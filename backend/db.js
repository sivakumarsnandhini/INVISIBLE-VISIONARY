const mongoose = require('mongoose')

const URI = 'mongodb+srv://<username>:<password>@cluster0.7gztdjc.mongodb.net/'

const connectDB = async () => {
  try {
      const connection = await mongoose.connect(
          URI,
          {
              useCreateIndex: true,
              useNewUrlParser: true,
              useFindAndModify: false,
              useUnifiedTopology: true
          }
      )
      console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
      console.log(`MongoDB error when connecting: ${error}`);
  }
}
connectDB()
module.exports = mongoose