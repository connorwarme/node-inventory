const Tag = require("../models/tag")
const Goggle = require("../models/goggle")
const async = require("async")

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
exports.tag_create_get = (req, res) => {
  res.send("Not Implemented Yet: tag create GET");
}

// handle tag create on POST
exports.tag_create_post = (req, res) => {
  res.send("Not Implemented Yet: tag create POST");
}

// display tag delete form on GET
exports.tag_delete_get = (req, res) => {
  res.send("Not Implemented Yet: tag delete GET");
}

// handle tag delete on POST
exports.tag_delete_post = (req, res) => {
  res.send("Not Implemented Yet: tag delete POST");
}

// display tag update form on GET
exports.tag_update_get = (req, res) => {
  res.send("Not Implemented Yet: tag update GET");
}

// handle tag update on POST
exports.tag_update_post = (req, res) => {
  res.send("Not Implemented Yet: tag update POST");
}