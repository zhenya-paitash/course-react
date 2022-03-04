import mongoose from "mongoose"

export default async () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then(() => console.log("database: ✔️"))
    .catch(err => console.error("database: ❌\ndb error: " + err.message))
}
