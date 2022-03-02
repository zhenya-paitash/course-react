const mongoose = require("mongoose")

const database = {
  connect() {
    mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
      })
      .then(() => console.log("database: ✔️"))
      .catch(err => console.error(err))
  },
}

module.exports = database
