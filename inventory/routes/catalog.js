const express = require("express")
const router = express.Router()

// require controller modules
const brand_controller = require("../controllers/brandController")
const category_controller = require("../controllers/categoryController")
const goggle_controller = require("../controllers/goggleController")
const goggleinstance_controller = require("../controllers/goggleInstanceController")
const tag_controller = require("../controllers/tagController")
const brand = require("../models/brand")

// GOGGLE routes

// GET catalog home page
router.get("/", goggle_controller.index);

// GET request to create a goggle
router.get("/goggle/create", goggle_controller.goggle_create_get)

// POST request to create goggle
router.post("/goggle/create", goggle_controller.goggle_create_post)

// GET request to delete goggle
router.get("/goggle/:id/delete", goggle_controller.goggle_delete_get)

// POST request to delete goggle
router.post("/goggle/:id/delete", goggle_controller.goggle_delete_post)

// GET request to update goggle
router.get("/goggle/:id/update", goggle_controller.goggle_update_get)

// POST request to update goggle
router.post("/goggle/:id/update", goggle_controller.goggle_update_post)

// GET request for specific goggle
router.get("/goggle/:id", goggle_controller.goggle_detail)

// GET request for list of goggles
router.get("/goggles", goggle_controller.goggle_list)

// BRAND routes

// GET request to create brand
router.get("/brand/create", brand_controller.brand_create_get)

// POST request to create brand
router.post("/brand/create", brand_controller.brand_create_post)

// GET request to delete brand
router.get("/brand/:id/delete", brand_controller.brand_delete_get)

// POST request to delete brand
router.post("/brand/:id/delete", brand_controller.brand_delete_post)

// GET request to update brand
router.get("/brand/:id/update", brand_controller.brand_update_get)

// POST request to update brand
router.post("/brand/:id/update", brand_controller.brand_update_post)

// GET request for brand details
router.get("/brand/:id", brand_controller.brand_detail)

// GET request for brand list
router.get("/brands", brand_controller.brand_list)

// CATEGORIES routes

// GET request for create category
router.get("/category/create", category_controller.category_create_get)

// POST request for create category
router.post("/category/create", category_controller.category_create_post)

// GET request for delete category
router.get("/category/:id/delete", category_controller.category_delete_get)

// POST request for delete category
router.post("/category/:id/delete", category_controller.category_delete_post)

// GET request for update category
router.get("/category/:id/update", category_controller.category_update_get)

// POST request for update category
router.post("/category/:id/update", category_controller.category_update_post)

// GET request for specific category
router.get("/category/:id", category_controller.category_detail)

// GET request for categories list
router.get("/categories", category_controller.category_list)

// TAG routes

// GET request for create tag
router.get("/tag/create", tag_controller.tag_create_get)

// POST request for create tag
router.post("/tag/create", tag_controller.tag_create_post)

// GET request for delete tag
router.get("/tag/:id/delete", tag_controller.tag_delete_get)

// POST request for delete tag
router.post("/tag/:id/delete", tag_controller.tag_delete_post)

// GET request for update tag
router.get("/tag/:id/update", tag_controller.tag_update_get)

// POST request for update tag
router.post("/tag/:id/update", tag_controller.tag_update_post)

// GET request for specific tag
router.get("/tag/:id", tag_controller.tag_detail)

// GET request for tag list
router.get("/tags", tag_controller.tag_list)

// GOGGLEINSTANCE routes

// GET request for create instance
router.get("/goggles/create", goggleinstance_controller.goggleinstance_create_get)

// POST request for create instance
router.post("/goggles/create", goggleinstance_controller.goggleinstance_create_post)

// GET request for delete instance
router.get("/goggles/:id/delete", goggleinstance_controller.goggleinstance_delete_get)

// POST request for delete instance
router.post("/goggles/:id/delete", goggleinstance_controller.goggleinstance_delete_post)

// GET request for update instance
router.get("/goggles/:id/update", goggleinstance_controller.goggleinstance_update_get)

// POST request for update instance
router.post("/goggles/:id/update", goggleinstance_controller.goggleinstance_update_post)

// GET request for specific instance
router.get("/goggles/:id", goggleinstance_controller.goggleinstance_detail)

// GET request for instance list
router.get("/goggleslist", goggleinstance_controller.goggleinstance_list)

module.exports = router;