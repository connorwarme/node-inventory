const Goggle = require("../models/goggle")

// site home page
exports.index = (req, res) => {
  res.send("Not Implemented Yet: home page")
}

// display all categories
exports.goggle_list = (req, res) => {
  res.send("Not Implemented Yet: goggle list");
}

// display detail page for specific goggle
exports.goggle_detail = (req, res) => {
  res.send(`Not Implemented Yet: goggle detail: ${req.params.id}`);
}

// display goggle create form on GET
exports.goggle_create_get = (req, res) => {
  res.send("Not Implemented Yet: goggle create GET");
}

// handle goggle create on POST
exports.goggle_create_post = (req, res) => {
  res.send("Not Implemented Yet: goggle create POST");
}

// display goggle delete form on GET
exports.goggle_delete_get = (req, res) => {
  res.send("Not Implemented Yet: goggle delete GET");
}

// handle goggle delete on POST
exports.goggle_delete_post = (req, res) => {
  res.send("Not Implemented Yet: goggle delete POST");
}

// display goggle update form on GET
exports.goggle_update_get = (req, res) => {
  res.send("Not Implemented Yet: goggle update GET");
}

// handle goggle update on POST
exports.goggle_update_post = (req, res) => {
  res.send("Not Implemented Yet: goggle update POST");
}