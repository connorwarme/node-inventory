#! /usr/bin/env node
require('dotenv').config();
console.log(process.env);

console.log(`populates the database provided...`)

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
    goggleCreate("Contact", "The breakthrough design of the Contact™ goggle makes it easy to adapt instantly to changing weather and light conditions. The Snapshot Magnetic Lens Interchange System sets a standard in fast, accurate and secure lens interchange by utilizing a shutter button-release and locking mechanism. Meanwhile, self-locating magnets guide and hold the lens securely into place in this sleek, semi- frameless design. The Contact goggle also offers an outstanding field of view and includes two premium VIVID lenses with Optics by ZEISS®.", 260, brands[0], categories[3], [tags[0], tags[1], tags[2]]),
    goggleCreate("Contour RS", "With a new toric lens shape that's slightly smaller than the original Contour, the Contour RS goggle hits all the marks. The new shape, combined with Expansion View Technology+ and VIVID lenses, allows you to see all the features on the mountain with clarity, so you can spot takeoffs and landings with ease, while the quick-change magnetic-assisted lens system means more time riding and less time fussing with gear. Top that off with the EVAK vent system so you don't have to worry about fogging, and a bonus low-light VIVID infrared lens with Optics by ZEISS®, and you're more than ready to shred in all conditions.", 270, brands[0], categories[2], [tags[0], tags[1], tags[2]]),
    goggleCreate("Stomp", "The new Stomp™ youth goggle is ready for pre-teens who are ready to spot and stomp their first landings with optimal vision and style. With a large-size youth frame, the kids (who aren't kids anymore, wink wink) can enjoy a fit that's made for them with unparalleled vision, thanks to its Expansion View Technology. Vision stays totally clear with the anti-fog coating while all-day riding comfort is on-point with the Stomp's triple-layer face foam with soft microfleece that nests next to skin.", 65, brands[0], categories[0], false),
    goggleCreate("Daredevil", "You don't need to be daring or reckless to appreciate a full view of the run ahead. The Smith Daredevil goggles bring over-the-glass fit to kids' goggles. Our floating foam design eliminates eyeglass temple pressure for a distraction-free fit, and a semi-rimless design maintains a wide field of vision. Treat your aspiring freerider to enhanced depth perception and increased contrast for a true view of every wind lip, glade, and powder stash.", 55, brands[2], categories[0], false),
    goggleCreate("Showcase", "One size definitely does not fit all, especially in over-the-glass (OTG) goggles. The Smith Showcase OTG goggles are designed specifically for smaller adult faces looking for eyeglass compatibility. Their semi-rimless frame provides a wide field of view, while our ChromaPop™ lens tech brings enhanced contrast and color definition to every light condition. The whole idea behind wearing goggles is for the best vision possible. You might as well get the fit to match.", 120, brands[2], categories[1], [tags[2]]),
    goggleCreate("4D MAG", "Check your zippers and buckle your boots. It's time to drop in. The Smith 4D MAG™ brings our widest field of view and sharpest optics to give you the best possible read on the terrain, so you can nail your line every time. Add our quick and easy lens-change tech, and you've got the only goggle you need for all-conditions riding. Thanks to ChromaPop™, the 4D MAG™ drops you into a bigger, brighter, sharper world.", 320, brands[2], createCategories[2], [tags[0], tags[1], tags[2]]),
    goggleCreate("Flight Path", "Developed in conjunction with Super-G World Champion Aleksander Kilde of Norway, Flight Path is Oakley’s next premier snow goggle that holds up to the high demands of the world’s best athletes for use on any mountain and under any conditions. The large size maximizes field-of-view at all angles, and the new Ridgelock EV lens construction leads to greater upward visibility, allowing for an unobstructed viewing area when in an aggressive skiing position.", 227, brands[1], categories[3], [tags[2], tags[3]]),
    goggleCreate("Fall Line", "In skiing and snowboarding, taking the Fall Line refers to the line down a mountain that is most directly downhill. Fusing the large ﬁeld of view from a rimless goggle, Fall Line is the latest addition to Oakley’s “LINE SERIES” of cylindrical style snow goggles. With a mid-sized ﬁt, Fall Line is optimized for a wide variety of faces and is engineered to ﬁt perfectly with most helmets. Designed with Oakley’s Ridgelock Technology, changing lenses is quick and easy while still allowing for a complete lens seal to prevent harsh conditions from penetrating into your goggle.", 216, brands[1], categories[2], [tags[0], tags[2]]),
    goggleCreate("Line Miner", "The Line Miner goggle was created with the purpose of providing the ultimate in peripheral vision, with a cylindrical-style design. We were able to pull the goggle in closer to your face than ever before, allowing for incredible downward and side-to-side periphery. With a large-sized ﬁt, Line Miner is optimized for a wide variety of faces and is engineered to ﬁt perfectly with most helmets.", 161, brands[1], categories[2], [tags[2], tags[3]]),
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
    goggleInstanceCreate(goggles[3], {style: "Ignitor Mirror", details: "Optimal in mixed sun/cloud and mostly sunny conditions"}, 24),
    goggleInstanceCreate(goggles[3], {style: "Blue Sensor Mirror", details: "Optimal in mostly cloudy and overcast/stormy conditions"}, 38),
    goggleInstanceCreate(goggles[3], {style: "Clear", details: "Optimal in overcast/stormy conditions"}, 13),
    goggleInstanceCreate(goggles[4], {style: "Rose Gold", details: "Optimal in mixed sun/cloud and mostly cloudy conditions"}, 64),
    goggleInstanceCreate(goggles[4], {style: "Everyday Green", details: "Optimal in mixed sun/cloud conditions"}, 42),
    goggleInstanceCreate(goggles[4], {style: "Storm Rose", details: "Optimal in mostly cloudy and overcast/stormy conditions"}, 51),
    goggleInstanceCreate(goggles[5], {style: "Everyday Red and Storm Yellow", details: "With two lenses included, you're covered for mixed sun/cloud conditions along with overcast/stormy conditions"}, 48),
    goggleInstanceCreate(goggles[5], {style: "Sun Black and Blue Sensor Mirror", details: "With two lenses included, you're covered for full sun conditions along with overcast/stormy conditions"}, 37),
    goggleInstanceCreate(goggles[5], {style: "Red Mirror and Storm Rose Flash", details: "With two lenses included, you're covered for mixed sun/cloud conditions along with overcast/stormy conditions"}, 59),
    goggleInstanceCreate(goggles[6], {style: "Sapphire Iridium", details: "Optimal in sunny and mixed sun/cloud conditions"}, 71),
    goggleInstanceCreate(goggles[6], {style: "Torch Iridium", details: "Optimal in sunny and mixed sun/cloud conditions"}, 61),
    goggleInstanceCreate(goggles[6], {style: "Hi Pink Iridium", details: "Optimal in mostly cloudy and overcast/stormy conditions"}, 21),
    goggleInstanceCreate(goggles[7], {style: "Black Iridium", details: "Optimal in full sun and mixed sun/cloud conditions"}, 43),
    goggleInstanceCreate(goggles[7], {style: "Rose", details: "Optimal in mixed sun/cloud and overcast/stormy conditions"}, 63),
    goggleInstanceCreate(goggles[7], {style: "Jade Iridium", details: "Optimal in sunny and mixed sun/cloud conditions"}, 18),
    goggleInstanceCreate(goggles[8], {style: "Persimmon", details: "Optimal in overcast/stormy conditions"}, 64),
    goggleInstanceCreate(goggles[8], {style: "Sapphire Iridium", details: "Optimal in sunny and mixed sun/cloud conditions"}, 47),
    goggleInstanceCreate(goggles[8], {style: "Gold Iridium", details: "Optimal in sunny and mixed sun/cloud conditions"}, 32),
  ])
}
