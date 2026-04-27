// ==========================
// Code sườn (Application bootstrap)
// ==========================

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const os = require("os");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;

// Code feature wiring (standby)

// const productRoutes = require('./routes/productRoutes');
// const uiRoutes = require('./routes/uiRoutes');
// const dataSource = require('./services/dataSource');

// app.use('/', uiRoutes);
// app.use('/products', productRoutes);

// CCore code (DB + server start)

async function start() {
  const mongoUri =
    process.env.MONGO_URI || "mongodb://localhost:27017/products_db";
  let usingMongo = false;

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 3000,
    });
    usingMongo = true;
  } catch (err) {
    usingMongo = false;
  }

  // Nếu feature bật lại thì gọi:
  // await dataSource.init(usingMongo);

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log(`Hostname: ${os.hostname()}`);
  });
}

start();

module.exports = app;
