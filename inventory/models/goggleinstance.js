const mongoose = require("mongoose")

const Schema = mongoose.Schema
const GoggleInstanceSchema = new Schema({
  goggle: {
    type: Schema.Types.ObjectId,
    ref: "Goggle",
    required: true,
  },
  lens: {
    style: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
  },
  quantity: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
})

// virtual for url
GoggleInstanceSchema.virtual("url").get(function () {
  return `/catalog/goggles/${this._id}`;
})

module.exports = mongoose.model("GoggleInstance", GoggleInstanceSchema)