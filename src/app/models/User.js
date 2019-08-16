const bcrypt = require('bcryptjs')

const { Schema, model } = require('../../database')

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  pass: {
    type: String,
    required: true,
    select: false
  },

}, { timestamps: true })

//executa antes do save
UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.pass, 10)
  this.pass = hash

  next()
})

module.exports = model('User', UserSchema)