#! /usr/bin/env node
require('dotenv').config();
console.log(process.env);

console.log(`populates the database provided...`)

// get arguments passed on command line
const userArgs = process.argv.slice(2);

const Goggle = require("./models/goggle")
const Brand = require("./models/brand")
const Category = require("./models/category")
const Tag = require("./models/tag")
const GoggleInstance = require("./models/goggleinstance")

const tags = [];
const brands = [];
const categories = [];
const goggles = [];
const goggleinstances = [];

const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

const mongoDB = process.env.MDBURL

main().catch((err) => console.log(err))

async function main() {
  console.log("Debug: about to connect")
  await mongoose.connect(mongoDB)
  console.log("Should be connected...?")
  await createTags()
  await createBrands()
  await createCategories()
  await createGoggles()
  await createGoggleInstances()
  console.log("Debug: closing mongoose connection")
  mongoose.connection.close()
}
async function tagCreate(name) {
  const tag = new Tag({ name: name })
  await tag.save()
  tags.push(tag)
  console.log(`Added tag: ${name}`)
}
async function brandCreate(name) {
  const brand = new Brand({ name: name })
  await brand.save()
  brands.push(brand)
  console.log(`Added brand: ${name}`)
}
async function categoryCreate(name) {
  const category = new Category({ title: name })
  await category.save()
  categories.push(category)
  console.log(`Added category: ${name}`)
}
async function goggleCreate(name, description, cost, brand, category, tag) {
  const goggleDetail = {
    name,
    description, 
    cost,
    brand,
    category,
  }
  if (tag != false) goggleDetail.tag = tag

  const goggle = new Goggle(goggleDetail)
  await goggle.save()
  goggles.push(goggle)
  console.log(`Goggle added: ${name}`)
}
async function goggleInstanceCreate(goggle, lens, quantity) {
  const goggleInstanceDetail = {
    goggle, 
    lens,
    quantity,
  }
  const goggleInstance = new GoggleInstance(goggleInstanceDetail)
  await goggleInstance.save();
  goggleinstances.push(goggleInstance)
  console.log(`Added goggle instance: ${lens.style}`)
}
async function createTags() {
  console.log("Adding tags")
  await Promise.all([
    tagCreate("Frameless"),
    tagCreate("Magnetic Lens"),
    tagCreate("HD Tech"),
    tagCreate("Responsive Fit")
  ])
}
async function createBrands() {
  console.log('Adding brands')
  await Promise.all([
    brandCreate("Giro"),
    brandCreate("Oakley"),
    brandCreate("Smith")
  ])
}
async function createCategories() {
  console.log("Adding categories")
  await Promise.all([
    categoryCreate("Youth"),
    categoryCreate("Slim"),
    categoryCreate("Medium"),
    categoryCreate("Wide")
  ])
}
async function createGoggles() {
  console.log("Adding goggles")
  await Promise.all([
    // needs content
    goggleCreate("Contact", "", 260, brands[0], categories[3], [tags[0], tags[1], tags[2]]),
    goggleCreate("Contour RS", "", 270, brands[0], categories[2], [tags[0], tags[1], tags[2]]),
    goggleCreate("Stomp", "", 65, brands[0], categories[0], false)
  ])
}
async function createGoggleInstances() {
  console.log("Adding goggle instances")
  await Promise.all([
    goggleInstanceCreate(goggles[0], {style: "Vivid Ember and Vivid Infared", details: "With two lenses included, you're covered for mixed sun/cloud conditions along with overcast/storm conditions"}, 42),
    goggleInstanceCreate(goggles[0], {style: "Vivid Pink and Vivid Apex", details: "With two lenses included, you're covered for mixed sun/cloud conditions along with overcast/storm conditions"}, 27),
    goggleInstanceCreate(goggles[0], {style: "Vivid Smoke and Vivid Infared", details: "With two lenses included, you're covered for full sun conditions along with overcast/storm conditions"}, 19),
    goggleInstanceCreate(goggles[1], {style: "Vivid Royal and Vivid Infared", details: "With two lenses included, you're covered for mixed sun/cloud conditions along with overcast/storm conditions"}, 38),
    goggleInstanceCreate(goggles[1], {style: "Vivid Onyx and Vivid Infared", details: "With two lenses included, you're covered for full sun conditions along with overcast/storm conditions"}, 22),
    goggleInstanceCreate(goggles[1], {style: "Vivid Emerald and Vivid Apex", details: "With two lenses included, you're covered for mixed sun/cloud conditions along with overcast/storm conditions"}, 26),
    goggleInstanceCreate(goggles[2], {style: "Grey Cobalt", details: "Optimal for mixed sun/cloud conditions"}, 12),
    goggleInstanceCreate(goggles[2], {style: "Amber Rose", details: "Optimal for overcast/stormy conditions"}, 16),
    goggleInstanceCreate(goggles[2], {style: "Amber Scarlet", details: "Optimal for mixed sun/cloud and mostly cloudy conditions"}, 31),
  ])
}
