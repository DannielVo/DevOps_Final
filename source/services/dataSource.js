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
  return [];
}

// Core code (init abstraction)

async function init(useMongo) {
  isMongo = !!useMongo;
  inMemory = [];
}

// Helpers to adapt mongo documents to expected output (include id)
// Code feature (CRUD standby)
function toDTO(doc) {
  return doc;
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
