import mongoose from "mongoose"
import CryptoJS from "crypto-js"

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
)

UserSchema.methods.checkPassword = async function (user, password) {
  const decrypt = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)
  return password === decrypt.toString(CryptoJS.enc.Utf8)
}

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next()

  this.password = CryptoJS.AES.encrypt(
    this.password,
    process.env.SECRET_KEY
  ).toString()
})

export default mongoose.model("User", UserSchema)
