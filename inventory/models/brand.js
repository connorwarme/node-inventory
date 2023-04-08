const mongoose = require("mongoose")
const Schema = mongoose.Schema

const BrandSchema = new Schema({
  name: { type: String, required: true },
})
// do I want to format Brand name (trim, all lowercase, then capitalize first letter)?

// virtual for brand's URL
BrandSchema.virtual("url").get(function() {
  return `/catalog/brand/${this._id}`;
})

// export model
module.exports = mongoose.model("Brand", BrandSchema);