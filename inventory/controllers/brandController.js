const Brand = require("../models/brand")
const Goggle = require("../models/goggle")
const async = require("async")
const { body, validationResult } = require("express-validator")

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
exports.brand_detail = (req, res, next) => {
  async.parallel(
    {
      brand(callback) {
        Brand.findById(req.params.id).exec(callback)
      },
      goggle(callback) {
        Goggle.find({ brand: req.params.id })
          .populate("category")
          .populate("tag")
          .exec(callback)
      },
    },
    (err, results) => {
      if (err) {
        return next(err)
      }
      if (results.brand == null) {
        const error = new Error("Brand not found!")
        error.status = 404
        return next(error)
      }
      res.render("brand_detail", {
        title: results.brand.name,
        brand: results.brand,
        goggles: results.goggle,
      })
    }
  )
}

// display brand create form on GET
exports.brand_create_get = (req, res, next) => {
  res.render("brand_form", { title: "Create Brand" })
}

// handle brand create on POST
exports.brand_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Brand name must be specified"),
  (req, res, next) => {
    const errors = validationResult(req)
    const brand = new Brand({ name: req.body.name })

    if (!errors.isEmpty()) {
      res.render("brand_form", {
        title: "Create Brand",
        brand,
        errors: errors.array(),
      })
      return;
    } else { 
      Brand.findOne({ name: req.body.name })
        .exec((err, found_brand) => {
          if (err) {
            return next(err)
          }
          if (found_brand) {
            res.redirect(found_brand.url)
          } else {
            brand.save((err) => {
              if (err) {
                return next(err)
              }
              res.redirect(brand.url)
            })
          }
        })
    }
  }
]

// display brand delete form on GET
exports.brand_delete_get = (req, res, next) => {
  async.parallel(
    {
      brand(callback) {
        Brand.findById(req.params.id).exec(callback)
      },
      brand_goggles(callback) {
        Goggle.find({ brand: req.params.id }).exec(callback)
      },
    },
    (err, results) => {
      if (err) {
        return next(err)
      }
      if (results.brand == null) {
        res.redirect("/catalog/brands")
      }
      res.render("brand_delete", {
        title: "Delete Brand",
        brand: results.brand,
        goggles: results.brand_goggles,
      })
    }
  )
}

// handle brand delete on POST
exports.brand_delete_post = (req, res, next) => {
  async.parallel(
    {
      brand(callback) {
        Brand.findById(req.body.brandid).exec(callback)
      },
      brand_goggles(callback) {
        Goggle.find({ brand: req.body.brandid }).exec(callback)
      },
    },
    (err, results) => {
      if (err) {
        return next(err)
      }
      if (results.brand_goggles.length > 0) {
        res.render("brand_delete", {
          title: "Delete Brand",
          brand: results.brand,
          goggles: results.brand_goggles,
        })
        return;
      }
      Brand.findByIdAndDelete(req.body.brandid, (err) => {
        if (err) {
          return next(err)
        }
        res.redirect("/catalog/brands")
      })
    }
  )
}

// display brand update form on GET
exports.brand_update_get = (req, res) => {
  res.send("Not Implemented Yet: brand update GET");
}

// handle brand update on POST
exports.brand_update_post = (req, res) => {
  res.send("Not Implemented Yet: brand update POST");
}