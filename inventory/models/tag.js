const mongoose = require("mongoose")

const Schema = mongoose.Schema
const TagSchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 100,
    required: true,
  }
})

TagSchema.virtual("url").get(function () {
  return `/catalog/tag/${this._id}`;
})

module.exports = mongoose.model("Tag", TagSchema)