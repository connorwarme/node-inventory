const GoggleInstance = require("../models/goggleinstance")
const Goggle = require("../models/goggle")
const async = require("async")

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
exports.goggleinstance_detail = (req, res, next) => {
  const instance = []
  async.waterfall(
    [
      function instance(callback) {
        GoggleInstance.findById(req.params.id)
          .populate("goggle")
          .exec(callback)
      },
      function goggle(results, callback) {
        instance.push(results)
        Goggle.findById(results.goggle._id)
          .populate("brand")
          .populate("category")
          .populate("tag")
          .exec(callback)
      }
    ],
    function (err, results) {
      if (err) {
        return next(err)
      }
      console.log(results)
      if (instance[0] == null) {
        const error = new Error("Specific goggle + lens not found!")
        error.status = 404
        return next(error)
      }
      else if (results == null) {
        console.log('houston, we have a problem here')
        const error = new Error("Unable to access goggle details!")
        error.status = 404
        return next(error)
      }
      console.log(results.instance)
      res.render("goggleinstance_detail", {
        title: `${results.name} + ${instance[0].lens.style}`,
        instance: instance[0],
        goggle: results,
      })
    }
  )
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