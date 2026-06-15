const { MongoClient } = require('mongodb');
require('dotenv').config();

let _db;

const initDb = (callback) => {
  if (_db) return callback(null, _db);
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => callback(err));
};

const getDb = () => {
  if (!_db) {
    return null; // Retorna null en lugar de lanzar error
  }
  return _db;
};

module.exports = { initDb, getDb };