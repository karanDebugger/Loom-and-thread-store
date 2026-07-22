require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("../src/models/Product");

// =======================================
// MongoDB Connection
// =======================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

// =======================================
// Brands
// =======================================

const brands = [
  "Nike",
  "Adidas",
  "Puma",
  "Levi's",
  "Zara",
  "H&M",
  "Allen Solly",
  "Tommy Hilfiger",
  "Jack & Jones",
  "U.S. Polo Assn.",
];

// =======================================
// Men Products
// =======================================

const menProducts = [
  "Oversized T-Shirt",
  "Regular Fit T-Shirt",
  "Graphic T-Shirt",
  "Polo T-Shirt",
  "Henley T-Shirt",
  "Slim Fit Shirt",
  "Casual Shirt",
  "Formal Shirt",
  "Linen Shirt",
  "Checked Shirt",
  "Oversized Hoodie",
  "Zip Hoodie",
  "Sweatshirt",
  "Crewneck Sweatshirt",
  "Pullover Hoodie",
  "Slim Fit Jeans",
  "Regular Jeans",
  "Cargo Pants",
  "Joggers",
  "Chinos",
  "Bomber Jacket",
  "Denim Jacket",
  "Puffer Jacket",
  "Windbreaker",
  "Leather Jacket",
];

// =======================================
// Women Products
// =======================================

const womenProducts = [
  "Maxi Dress",
  "Bodycon Dress",
  "Floral Dress",
  "Summer Dress",
  "Party Dress",
  "Crop Top",
  "Oversized T-Shirt",
  "Tank Top",
  "Graphic Tee",
  "Casual Top",
  "High Waist Jeans",
  "Skinny Jeans",
  "Wide Leg Jeans",
  "Mom Fit Jeans",
  "Cargo Jeans",
  "Oversized Hoodie",
  "Zip Hoodie",
  "Sweatshirt",
  "Bomber Jacket",
  "Denim Jacket",
  "Leather Jacket",
  "Cardigan",
  "Blazer",
  "Winter Coat",
  "Puffer Jacket",
];

// =======================================
// Shoes
// =======================================

const shoeProducts = [
  "Running Shoes",
  "Lifestyle Sneakers",
  "Training Shoes",
  "Walking Shoes",
  "Basketball Shoes",
  "Tennis Shoes",
  "Slip-On Shoes",
  "Canvas Shoes",
  "High Top Sneakers",
  "Low Top Sneakers",
];

// =======================================
// Accessories
// =======================================

const accessoryProducts = [
  "Backpack",
  "Cap",
  "Wallet",
  "Watch",
  "Sunglasses",
  "Duffel Bag",
  "Crossbody Bag",
  "Belt",
  "Beanie",
  "Laptop Bag",
];

// =======================================
// Descriptions
// =======================================

const descriptions = [
  "Premium quality fabric with long-lasting durability.",
  "Designed for all-day comfort and everyday wear.",
  "Modern fit with breathable materials.",
  "Crafted using premium stitching and soft fabric.",
  "Perfect blend of comfort, fashion, and performance.",
  "Lightweight design suitable for every season.",
  "Built with premium materials for everyday use.",
  "Stylish look with exceptional comfort.",
  "Minimal design with premium finish.",
  "Ideal for casual, office, and weekend outfits.",
];

// =======================================
// Helper Functions
// =======================================

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDescription() {
  return descriptions[random(0, descriptions.length - 1)];
}

function randomRating() {
  return Number((3.8 + Math.random() * 1.2).toFixed(1));
}

function randomImage() {
  return `https://picsum.photos/600/800?random=${random(1,10000)}`;
}

const products = [];

// =======================================
// MEN PRODUCTS
// =======================================

brands.forEach((brand) => {
  menProducts.forEach((product) => {
    products.push({
      title: `${brand} ${product}`,
      description: randomDescription(),
      price: random(999, 6999),
      brand,
      category: "Men",
      stock: random(10, 150),
      images: [randomImage()],
      featured: Math.random() > 0.8,
      ratings: randomRating(),
      numReviews: random(10, 500),
    });
  });
});

// =======================================
// WOMEN PRODUCTS
// =======================================

brands.forEach((brand) => {
  womenProducts.forEach((product) => {
    products.push({
      title: `${brand} ${product}`,
      description: randomDescription(),
      price: random(999, 6999),
      brand,
      category: "Women",
      stock: random(10, 150),
      images: [randomImage()],
      featured: Math.random() > 0.8,
      ratings: randomRating(),
      numReviews: random(10, 500),
    });
  });
});

// =======================================
// SHOES
// =======================================

brands.forEach((brand) => {
  shoeProducts.forEach((product) => {
    products.push({
      title: `${brand} ${product}`,
      description: randomDescription(),
      price: random(2499, 14999),
      brand,
      category: "Shoes",
      stock: random(10, 120),
      images: [randomImage()],
      featured: Math.random() > 0.75,
      ratings: randomRating(),
      numReviews: random(20, 800),
    });
  });
});

// =======================================
// ACCESSORIES
// =======================================

brands.forEach((brand) => {
  accessoryProducts.forEach((product) => {
    products.push({
      title: `${brand} ${product}`,
      description: randomDescription(),
      price: random(499, 4999),
      brand,
      category: "Accessories",
      stock: random(10, 200),
      images: [randomImage()],
      featured: Math.random() > 0.85,
      ratings: randomRating(),
      numReviews: random(5, 400),
    });
  });
});

console.log("");
console.log("===================================");
console.log(`Generated ${products.length} Products`);
console.log("===================================");
console.log("");

// =======================================
// IMPORT PRODUCTS
// =======================================

const importProducts = async () => {
  try {
    console.log("");
    console.log("🚀 Starting Product Seeder...");
    console.log("");

    // Remove existing products
    const deleteResult = await Product.deleteMany();

    console.log(`🗑 Deleted ${deleteResult.deletedCount} existing products`);

    // Insert new products
    await Product.insertMany(products);

    console.log("");
    console.log("========================================");
    console.log(`✅ Successfully Imported ${products.length} Products`);
    console.log("========================================");
    console.log("");

    process.exit(0);
  } catch (error) {
    console.error("");
    console.error("❌ Product Import Failed");
    console.error(error);
    console.error("");

    process.exit(1);
  }
};

// =======================================
// DELETE PRODUCTS
// =======================================

const deleteProducts = async () => {
  try {
    const result = await Product.deleteMany();

    console.log("");
    console.log("========================================");
    console.log(`🗑 Successfully Deleted ${result.deletedCount} Products`);
    console.log("========================================");
    console.log("");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// =======================================
// RUN SEEDER
// =======================================

mongoose.connection.once("open", async () => {
  console.log("");
  console.log("========================================");
  console.log("🚀 MongoDB Connected");
  console.log("🌱 Production Seeder Started");
  console.log("========================================");
  console.log("");

  if (process.argv[2] === "-d") {
    await deleteProducts();
  } else {
    await importProducts();
  }
});

// =======================================
// SEEDER FINISHED
// =======================================

process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();

    console.log("");
    console.log("🔌 MongoDB Connection Closed");
    console.log("");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});

process.on("SIGTERM", async () => {
  try {
    await mongoose.connection.close();

    console.log("");
    console.log("🔌 MongoDB Connection Closed");
    console.log("");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});
