// require mongoose
const mongoose = require("mongoose");

// define the schema
const Schema = mongoose.Schema;
const GoggleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    min: 50,
    max: 325,
    required: true,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  tag: [{
    type: Schema.Types.ObjectId,
    ref: "Tag",
  }],
})

// virtual for goggles' URL
GoggleSchema.virtual("url").get(function () {
  return `/catalog/goggle/${this._id}`;
})

// compile model from schema
// not sure if this is needed / where it goes
// const GoggleModel = mongoose.model("GoggleModel", GoggleSchema);

// export model
module.exports = mongoose.model("Goggle", GoggleSchema)