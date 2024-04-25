const mongoose = require('mongoose');


async function connectToMongo() {
  try {

    await mongoose.connect(process.env.MONGODB_URL)
    // console.log("Connected to Mongo Successfully")
  }
  catch (error) {
    console.log("error connecting to database")
  }
}

module.exports = connectToMongo;