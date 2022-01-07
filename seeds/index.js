const mongoose = require("mongoose");

const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// get a random value from an array
const sample = (array) => array[Math.floor(Math.random() * array.length)];

// Generate random campgrounds
const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    // generate a random number 1 - 1000
    const random1000 = Math.floor(Math.random() * 1000);

    // using the random number, get the information needed to create a campground
    const camp = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
    });

    // Save camp to Database
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
