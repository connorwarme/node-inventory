const Brand = require("../models/brand")

// display all brands
exports.brand_list = (req, res, next) => {
  Brand.find()
    .sort({ name: 1 })
    .exec(function (err, list_brands) {
      if (err) {
        return next(err)
      }
      res.render("brand_list", {
        title: "Brand List",
        brand_list: list_brands,
      })
    })
}

// display detail page for specific brand
exports.brand_detail = (req, res) => {
  res.send(`Not Implemented Yet: brand detail: ${req.params.id}`);
}

// display brand create form on GET
exports.brand_create_get = (req, res) => {
  res.send("Not Implemented Yet: brand create GET");
}

// handle brand create on POST
exports.brand_create_post = (req, res) => {
  res.send("Not Implemented Yet: brand create POST");
}

// display brand delete form on GET
exports.brand_delete_get = (req, res) => {
  res.send("Not Implemented Yet: brand delete GET");
}

// handle brand delete on POST
exports.brand_delete_post = (req, res) => {
  res.send("Not Implemented Yet: brand delete POST");
}

// display brand update form on GET
exports.brand_update_get = (req, res) => {
  res.send("Not Implemented Yet: brand update GET");
}

// handle brand update on POST
exports.brand_update_post = (req, res) => {
  res.send("Not Implemented Yet: brand update POST");
}