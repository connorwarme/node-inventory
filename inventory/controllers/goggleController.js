const Goggle = require("../models/goggle")
const Brand = require("../models/brand")
const Category = require("../models/category")
const Tag = require("../models/tag")
const GoggleInstance = require("../models/goggleinstance")

const async = require("async")

// site home page
exports.index = (req, res) => {
  async.parallel(
    {
      goggle_count(callback) {
        Goggle.countDocuments({}, callback)
      },
      goggle_instance_count(callback) {
        GoggleInstance.countDocuments({ quantity: { $gt: 0 } }, callback)
      },
      brand_count(callback) {
        Brand.countDocuments({}, callback)
      },
      category_count(callback) {
        Category.countDocuments({}, callback)
      },
      tag_count(callback) {
        Tag.countDocuments({}, callback)
      },
    },
    (err, results) => {
      res.render("index", {
        title: "Google at Goggles",
        error: err,
        data: results,
      })
    }
  )
}

// display all categories
exports.goggle_list = (req, res, next) => {
  Goggle.find({}, "name brand")
    .sort({ name: 1 })
    .populate("brand")
    .exec(function(err, list_goggles) {
      if (err) {
        return next(err)
      }
      res.render("goggle_list", { title: "Goggle List", goggle_list: list_goggles})
    })
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