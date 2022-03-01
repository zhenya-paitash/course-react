const mongoose = require("mongoose")

const database = {
  connect() {
    mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
      })
      .then(() => console.log("Database Connection Sucessfull! 🟢"))
      .catch(err => console.error(err))
  },
}

module.exports = database
