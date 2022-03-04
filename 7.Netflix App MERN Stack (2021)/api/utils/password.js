import CryptoJS from "crypto-js"

const encrypt = (pass, key) => CryptoJS.AES.encrypt(pass, key).toString()
const decrypt = (pass, key) => CryptoJS.AES.decrypt(pass, key).toString(CryptoJS.enc.Utf8)

export { encrypt, decrypt }
