// Code feature dependency
const { v4: uuidv4 } = require("uuid");
const ProductModel = require("../models/product");
const fs = require("fs").promises;
const path = require("path");

// Core code
let inMemory = [];
let isMongo = false;

// Code feature (seed)

function createAppleProducts() {
  // Realistic Apple product list with example prices and short descriptions
  const products = [
    {
      name: "iPhone 14 Pro Max",
      price: 1099,
      color: "space-black",
      description:
        "6.7‑inch Super Retina XDR display, A16 Bionic chip, pro camera system.",
      imageUrl: "",
    },
    {
      name: "iPhone SE (3rd generation)",
      price: 429,
      color: "black",
      description:
        "Compact design with A15 Bionic, great value for everyday use.",
      imageUrl: "",
    },
    {
      name: "MacBook Pro 14-inch (M2 Pro)",
      price: 1999,
      color: "silver",
      description:
        "Powerful M2 Pro chip, Liquid Retina XDR display, up to 18‑hour battery life.",
    },
    {
      name: "MacBook Air 13-inch (M2)",
      price: 1199,
      color: "midnight",
      description:
        "Thin and light with M2 chip, silent fanless design and great battery life.",
    },
    {
      name: "iPad Pro 11-inch (M4)",
      price: 799,
      color: "silver",
      description:
        "M4 chip, Liquid Retina display with ProMotion, powerful for creative work.",
    },
    {
      name: "Apple Watch Series 9",
      price: 399,
      color: "starlight",
      description:
        "Faster S9 chip, more accurate sensors, and brighter display.",
    },
    {
      name: "AirPods Pro (2nd generation)",
      price: 249,
      color: "white",
      description:
        "Active Noise Cancellation, improved audio quality and longer battery.",
    },
    {
      name: "HomePod (2nd generation)",
      price: 299,
      color: "white",
      description:
        "High-fidelity audio with computational audio and Siri smart home control.",
    },
    {
      name: "iPhone 13",
      price: 699,
      color: "blue",
      description:
        "A great all-rounder with excellent battery life and dual-camera system.",
    },
    {
      name: "iPad (10th generation)",
      price: 449,
      color: "pink",
      description:
        "Updated design, larger display, and capable for school and home use.",
      imageUrl: "",
    },
  ];

  // attach UUID ids for in-memory use
  return products.map((p) => ({ id: uuidv4(), ...p }));
}

// Core code (init abstraction)

async function init(useMongo) {
  isMongo = !!useMongo;
  // seed in-memory array always
  inMemory = createAppleProducts();

  if (isMongo) {
    try {
      const count = await ProductModel.countDocuments();
      if (count === 0) {
        // seed mongodb with items mapped to schema (exclude in-memory id)
        const docs = inMemory.map(
          ({ name, price, color, description, imageUrl }) => ({
            name,
            price,
            color,
            description,
            imageUrl,
          }),
        );
        await ProductModel.insertMany(docs);
      }
    } catch (err) {
      // if anything goes wrong, fall back to in-memory
      isMongo = false;
    }
  }
}

// Helpers to adapt mongo documents to expected output (include id)
// Code feature (CRUD standby)
function toDTO(doc) {
  if (!doc) return null;
  if (doc.id) return doc; // in-memory
  return {
    id: doc._id.toString(),
    name: doc.name,
    price: doc.price,
    color: doc.color,
    description: doc.description || null,
    imageUrl: doc.imageUrl || "",
  };
}

async function getAll() {
  return [];
}

async function getById(id) {
  return null;
}

async function create(payload) {
  return null;
}

async function replace(id, payload) {
  return null;
}

async function patch(id, payload) {
  return null;
}

async function remove(id) {
  return null;
}

module.exports = {
  init,
  getAll,
  getById,
  create,
  replace,
  patch,
  remove,
  get isMongo() {
    return isMongo;
  },
};
