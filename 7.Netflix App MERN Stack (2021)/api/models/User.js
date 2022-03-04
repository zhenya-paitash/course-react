import mongoose from "mongoose"
import { encrypt, decrypt } from "../utils/password.js"

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      // select: false
    },
    profilePic: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
)

UserSchema.methods.checkPassword = async function (user, password) {
  return decrypt(user.password, process.env.SECRET_KEY) === password
}

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next()
  this.password = encrypt(this.password, process.env.SECRET_KEY)
})

export default mongoose.model("User", UserSchema)
