const Category = require("../models/category")
const Goggle = require("../models/goggle")

const async = require("async")

// display all categories
exports.category_list = (req, res, next) => {
  Category.find() 
    .sort()
    .exec(function(err, list_categories) {
      if (err) {
        return next(err)
      }
      res.render("category_list", {
        title: 'Category List',
        category_list: list_categories,
      })
    })
}

// display detail page for specific category
exports.category_detail = (req, res, next) => {
  async.parallel(
    {
      category(callback) {
        Category.findById(req.params.id).exec(callback)
      },
      goggle(callback) {
        Goggle.find({ "category": req.params.id })
          .sort({ name: 1 })
          .populate("brand")
          .exec(callback)
      },
    },
    (err, results) => {
      if (err) {
        return next(err)
      }
      if (results.category == null) {
        const error = new Error("Category not found!")
        error.status = 404
        return next(err)
      }
      res.render("category_detail", {
        title: results.category.title,
        category: results.category,
        goggle_list: results.goggle,
      })
    }
  )
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