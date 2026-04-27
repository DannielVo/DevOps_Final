// Core code
const os = require("os");
const dataSource = require("../services/dataSource");

function meta() {
  return {
    hostname: os.hostname(),
    source: dataSource.isMongo ? "mongodb" : "in-memory",
  };
}
// Code feature, currently not implemented
async function list(req, res, next) {
  return res.status(501).json({ message: "Not implemented", ...meta() });
}

async function getOne(req, res, next) {
  return res.status(501).json({ message: "Not implemented", ...meta() });
}

async function create(req, res, next) {
  return res.status(501).json({ message: "Not implemented", ...meta() });
}

async function put(req, res, next) {
  return res.status(501).json({ message: "Not implemented", ...meta() });
}

async function patch(req, res, next) {
  return res.status(501).json({ message: "Not implemented", ...meta() });
}

async function remove(req, res, next) {
  return res.status(501).json({ message: "Not implemented", ...meta() });
}

module.exports = { list, getOne, create, put, patch, remove };
