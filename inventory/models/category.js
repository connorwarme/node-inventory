const mongoose = require("mongoose")

const Schema = mongoose.Schema
const CategorySchema = new Schema({
  title: {
    type: String,
    maxLength: 100,
    required: true,
  }
})

// virtual for url
CategorySchema.virtual("url").get(function () {
  return `/catalog/category/${this._id}`;
})

module.exports = mongoose.model("Category", CategorySchema)