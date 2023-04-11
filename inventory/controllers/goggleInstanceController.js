const GoggleInstance = require("../models/goggleinstance")

// display all goggleinstances
exports.goggleinstance_list = (req, res, next) => {
  GoggleInstance.find()
    .populate("goggle")
    .sort({ goggle: 1 })
    .exec(function(err, list_goggleinstances) {
      if (err) {
        return next(err)
      }
      res.render("goggleinstance_list", {
        title: "Goggle + Lens Combinations",
        goggleinstance_list: list_goggleinstances,
      })
    })
}

// display detail page for specific goggleinstance
exports.goggleinstance_detail = (req, res) => {
  res.send(`Not Implemented Yet: goggleinstance detail: ${req.params.id}`);
}

// display goggleinstance create form on GET
exports.goggleinstance_create_get = (req, res) => {
  res.send("Not Implemented Yet: goggleinstance create GET");
}

// handle goggleinstance create on POST
exports.goggleinstance_create_post = (req, res) => {
  res.send("Not Implemented Yet: goggleinstance create POST");
}

// display goggleinstance delete form on GET
exports.goggleinstance_delete_get = (req, res) => {
  res.send("Not Implemented Yet: goggleinstance delete GET");
}

// handle goggleinstance delete on POST
exports.goggleinstance_delete_post = (req, res) => {
  res.send("Not Implemented Yet: goggleinstance delete POST");
}

// display goggleinstance update form on GET
exports.goggleinstance_update_get = (req, res) => {
  res.send("Not Implemented Yet: goggleinstance update GET");
}

// handle goggleinstance update on POST
exports.goggleinstance_update_post = (req, res) => {
  res.send("Not Implemented Yet: goggleinstance update POST");
}