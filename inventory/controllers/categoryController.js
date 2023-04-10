const Category = require("../models/category")

// display all categories
exports.category_list = (req, res) => {
  res.send("Not Implemented Yet: category list");
}

// display detail page for specific category
exports.category_detail = (req, res) => {
  res.send(`Not Implemented Yet: category detail: ${req.params.id}`);
}

// display category create form on GET
exports.category_create_get = (req, res) => {
  res.send("Not Implemented Yet: category create GET");
}

// handle category create on POST
exports.category_create_post = (req, res) => {
  res.send("Not Implemented Yet: category create POST");
}

// display category delete form on GET
exports.category_delete_get = (req, res) => {
  res.send("Not Implemented Yet: category delete GET");
}

// handle category delete on POST
exports.category_delete_post = (req, res) => {
  res.send("Not Implemented Yet: category delete POST");
}

// display category update form on GET
exports.category_update_get = (req, res) => {
  res.send("Not Implemented Yet: category update GET");
}

// handle category update on POST
exports.category_update_post = (req, res) => {
  res.send("Not Implemented Yet: category update POST");
}