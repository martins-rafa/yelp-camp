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
  for (let i = 0; i < 200; i++) {
    // generate a random number 1 - 1000
    const random1000 = Math.floor(Math.random() * 1000);
    const randomPrice = Math.floor(Math.random() * 20) + 10;

    // using the random number, get the information needed to create a campground
    const camp = new Campground({
      title: `${sample(descriptors)} ${sample(places)}`,
      price: randomPrice,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      author: "61e8759419bbf6f377605cc3",
      images: [
        {
          url: "https://res.cloudinary.com/rafadatabase/image/upload/v1643034800/YelpCamp/camptesting_uegwyg.jpg",
          filename: "YelpCamp/camptesting_uegwyg",
        },
        {
          url: "https://res.cloudinary.com/rafadatabase/image/upload/v1643034808/YelpCamp/camptesting2_l69pw2.jpg",
          filename: "YelpCamp/camptesting2_l69pw2",
        },
      ],
    });

    // Save camp to Database
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
