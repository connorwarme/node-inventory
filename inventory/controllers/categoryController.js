const Category = require("../models/category")
const Goggle = require("../models/goggle")
const async = require("async")
const { body, validationResult } = require("express-validator")

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
  res.render("category_form", { title: "Create Category" })
}

// handle category create on POST
exports.category_create_post = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Category name must be specified"),

  (req, res, next) => {
    const errors = validationResult(req)
    const category = new Category({ title: req.body.title })

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Create Category",
        category,
        errors: errors.array(),
      })
      return;
    } else {
      Category.findOne({ title: req.body.title })
        .exec((err, found_category) => {
          if (err) {
            return next(err)
          }
          if (found_category) {
            res.redirect(found_category.url)
          } else {
            category.save((err) => {
              if (err) {
                return next(err)
              }
              res.redirect(category.url)
            })
          }
        })
    }

  }
]

// display category delete form on GET
exports.category_delete_get = (req, res, next) => {
  async.parallel(
    {
      category(callback) {
        Category.findById(req.params.id).exec(callback)
      },
      goggles(callback) {
        Goggle.find({ category: req.params.id }).exec(callback)
      },
    },
    (err, results) => {
      if (err) {
        return next(err)
      }
      if (results.category == null) {
        res.redirect("/catalog/categories")
      }
      res.render("category_delete", {
        title: "Delete Category",
        category: results.category,
        goggles: results.goggles,
      })
    }
  )
}

// handle category delete on POST
exports.category_delete_post = (req, res, next) => {
  async.parallel(
    {
      category(callback) {
        Category.findById(req.body.categoryid).exec(callback)
      },
      goggles(callback) {
        Goggle.find({ category: req.body.categoryid }).exec(callback)
      },
    },
    (err, results) => {
      if (err) {
        return next(err)
      }
      if (results.goggles.length > 0) {
        res.render("category_delete", {
          title: "Delete Category",
          category: results.category,
          goggles: results.goggles,
        })
        return;
      }
      Category.findByIdAndDelete(req.body.categoryid, (err) => {
        if (err) {
          return next(err)
        }
        res.redirect("/catalog/categories")
      })
    }
  )
}

// display category update form on GET
exports.category_update_get = (req, res) => {
  res.send("Not Implemented Yet: category update GET");
}

// handle category update on POST
exports.category_update_post = (req, res) => {
  res.send("Not Implemented Yet: category update POST");
}