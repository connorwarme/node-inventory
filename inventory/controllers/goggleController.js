const Goggle = require("../models/goggle")
const Brand = require("../models/brand")
const Category = require("../models/category")
const Tag = require("../models/tag")
const GoggleInstance = require("../models/goggleinstance")
const async = require("async")
const { body, validationResult } = require("express-validator")

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
exports.goggle_detail = (req, res, next) => {
  async.parallel(
    {
      goggle(callback) {
        Goggle.findById(req.params.id) 
          .populate("brand")
          .populate("category")
          .populate("tag")
          .exec(callback)
      },
      goggle_instance(callback) {
        GoggleInstance.find({ goggle: req.params.id })
          .exec(callback)
      },
    },
    (err, results) => {
      if (err) {
        return next(err)
      }
      if (results.goggle == null) {
        const error = new Error("Goggle not found!")
        error.status = 404
        return next(error)
      }
      res.render("goggle_detail", {
        title: results.goggle.name,
        goggle: results.goggle,
        goggle_instances: results.goggle_instance,
      })
    }
  )
}

// display goggle create form on GET
exports.goggle_create_get = (req, res, next) => {
  async.parallel(
    {
      brands(callback) {
        Brand.find(callback)
      },
      categories(callback) {
        Category.find(callback)
      },
      tags(callback) {
        Tag.find(callback)
      },
    },
    (err, results) => {
      if (err) {
        return next(err)
      }
      res.render("goggle_form", {
        title: "Create Goggle",
        brands: results.brands,
        categories: results.categories,
        tags: results.tags,
      })
    }
  )
}

// handle goggle create on POST
exports.goggle_create_post = [
  (req, res, next) => {
    if (!Array.isArray(req.body.tag)) {
      req.body.tag = typeof req.body.tag === "undefined" ? [] : [req.body.tag]
    }
    next();
  },
  body("name", "Goggle model must have a name")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("brand", "Goggle brand must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description", "Goggle needs a description")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category", "Goggle category must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("cost", "Cost of goggle must be declared")
    .trim()
    .isInt({ min: 50, max: 325 })
    .withMessage("Cost must be an integer between 50 and 325")
    .escape(),
  body("tag.*").escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const goggle = new Goggle({ 
      name: req.body.name,
      brand: req.body.brand,
      description: req.body.description,
      category: req.body.category,
      cost: req.body.cost,
      tag: req.body.genre,
    })

    if (!errors.isEmpty()) {
      async.parallel(
        {
          brands(callback) {
            Brand.find(callback)
          },
          categories(callback) {
            Category.find(callback)
          },
          tags(callback) {
            Tag.find(callback)
          },
        },
        (err, results) => {
          if (err) {
            return next(err)
          }
          for (const tag of results.tags) {
            if (goggle.tag.includes(tag._id)) {
              tag.checked = "true";
            }
          }
          res.render("goggle_form", {
            title: "Create Goggle",
            brands: results.brands,
            categories: results.categories,
            tags: results.tags,
            goggle,
            errors: errors.array(),
          })
        }
      )
      return;
    }
    goggle.save((err) => {
      if (err) {
        return next(err)
      }
      res.redirect(goggle.url)
    })
  }
]
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