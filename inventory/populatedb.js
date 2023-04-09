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

