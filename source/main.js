// ==== Code sườn ====
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const os = require("os");
const path = require("path");
const fs = require("fs");

// ==== Code feature (3 dòng này)====
const productRoutes = require("./routes/productRoutes");
const dataSource = require("./services/dataSource");
const uiRoutes = require("./routes/uiRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view engine and static
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// ==== Code feature ====
app.use("/", uiRoutes);
app.use("/products", productRoutes);

// ==== Code sườn ====
const PORT = process.env.PORT || 3000;

async function connectWithRetry(mongoUri) {
  const maxRetries = 10;
  const delay = 3000;

  for (let i = 1; i <= maxRetries; i++) {
    try {
      console.log(`Connecting to MongoDB (attempt ${i})...`);
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
      return true;
    } catch (err) {
      console.log("MongoDB connection failed: ", err.message);
      await new Promise((res) => setTimeout(res, delay));
    }
  }

  console.log("Fallback to in-memory DB");
  return false;
}

async function start() {
  // Đảm bảo thư mục uploads tồn tại
  const uploadsDir = path.join(__dirname, "public", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log(`Created uploads directory at ${uploadsDir}`);
  }

  // Try to connect to MongoDB once with 3s timeout
  const mongoUri =
    process.env.MONGO_URI || "mongodb://localhost:27017/products_db";
  // let usingMongo = false;
  // try {
  //   await mongoose.connect(mongoUri, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //     serverSelectionTimeoutMS: 3000,
  //   });
  //   usingMongo = true;
  //   console.log("Connected to MongoDB — using mongodb as data source.");
  // } catch (err) {
  //   usingMongo = false;
  //   console.log(
  //     "Failed to connect to MongoDB within 3s — falling back to in-memory database.",
  //   );
  // }

  const usingMongo = await connectWithRetry(mongoUri);

  await dataSource.init(usingMongo);

  app.listen(PORT, () => {
    console.log(
      `Server listening on port http://localhost:${PORT} — hostname: ${os.hostname()}`,
    );
    console.log(
      `Data source in use: ${dataSource.isMongo ? "mongodb" : "in-memory"}`,
    );
  });
}

start();

module.exports = app;
