const Tag = require("../models/tag")
const Goggle = require("../models/goggle")
const async = require("async")
const { body, validationResult } = require("express-validator")

// display all tags
exports.tag_list = (req, res, next) => {
  Tag.find() 
    .sort({ name: 1 })
    .exec(function(err, list_tags) {
      if (err) {
        return next(err)
      }
      res.render("tag_list", {
        title: 'Tag List',
        tag_list: list_tags,
      })
    })
}

// display detail page for specific tag
exports.tag_detail = (req, res, next) => {
  async.parallel(
    {
      tag(callback) {
        Tag.findById(req.params.id).exec(callback)
      },
      tag_goggles(callback) {
        Goggle.find({ tag: req.params.id })
          .populate("brand")
          .exec(callback)
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.tag == null) {
        const err = new Error("Tag not found!")
        err.status = 404
        return next(err)
      }
      res.render("tag_detail", {
        title: "Tag Detail",
        tag: results.tag,
        tag_goggles: results.tag_goggles,
      })
    }
  )
}

// display tag create form on GET
exports.tag_create_get = (req, res, next) => {
  res.render("tag_form", { title: "Create Tag" })
}

// handle tag create on POST
exports.tag_create_post = [
  // validate and sanitize name field
  body("name", "Tag name required")
    .trim()
    .isLength({ min: 1 })
    // .customSanitizer((value, { req } ) => {
    //   let array = value.split(' ')
    //   let newVal = ''
    //   for (i=0; i<array.length; i++) {
    //     let word = array[i]
    //     let value = word.charAt(0).toUpperCase() + word.slice(1)
    //     newVal += value
    //     if (i != array.length-1) {
    //       newVal += ' '
    //     }
    //   }
    // })
    .escape(),
  // process request
  (req, res, next) => {
    // extract validation errors from the request
    const errors = validationResult(req)
    // create tag object w/ escaped and trimmed data
    const tag = new Tag({ name: req.body.name })

    // if errors, render form again w/ user input and error msgs
    if (!errors.isEmpty()) {
      res.render("tag_form", {
        title: "Create Tag",
        tag, 
        errors: errors.array(),
      })
      return;
    } else {
      // no errors - data is valid. check if tag already exists
      Tag.findOne({ name: req.body.name })
        .exec((err, found_tag) => {
          if (err) {
            return next(err)
          }
          if (found_tag) {
            // tag already exists - redirect
            res.redirect(found_tag.url)
          } else {
            tag.save((err) => {
              if (err) {
                return next(err)
              }
              // new tag saved - redirect to it
              res.redirect(tag.url)
            })
          }
        })
    }
  }
]


// display tag delete form on GET
exports.tag_delete_get = (req, res, next) => {
  async.parallel(
    {
      tag(callback) {
        Tag.findById(req.params.id).exec(callback)
      },
      goggles(callback) {
        Goggle.find({ tag: req.params.id }).exec(callback)
      },
    },
    (err, results) => {
      if (err) {
        return next(err)
      }
      if (results.tag == null) {
        res.redirect("/catalog/tags")
      }
      res.render("tag_delete", {
        title: "Delete Tag: " + results.tag.name,
        tag: results.tag,
        goggles: results.goggles,
      })
    }
  )
}

// handle tag delete on POST
exports.tag_delete_post = (req, res, next) => {
  async.parallel(
    {
      tag(callback) {
        Tag.findById(req.body.tagid).exec(callback)
      },
      goggles(callback) {
        Goggle.find({ tag: req.body.tagid }).exec(callback)
      },
    },
    (err, results) => {
      if (err) {
        return next(err)
      }
      if (results.goggles.length > 0) {
        res.render("tag_delete", {
          title: "Delete Tag: " + results.tag.name,
          tag: results.tag,
          goggles: results.goggles,
        })
        return;
      }
      Tag.findByIdAndDelete(req.body.tagid, (err) => {
        if (err) {
          return next(err)
        }
        res.redirect("/catalog/tags")
      })
    }
  )
}

// display tag update form on GET
exports.tag_update_get = (req, res) => {
  res.send("Not Implemented Yet: tag update GET");
}

// handle tag update on POST
exports.tag_update_post = (req, res) => {
  res.send("Not Implemented Yet: tag update POST");
}