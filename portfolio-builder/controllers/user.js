const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('portfolio_db').collection('users').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) { res.status(500).json(err); }
};

const createUser = async (req, res) => {
  if (!req.body.username || !req.body.email) {
    return res.status(400).json({ message: 'Username y email son obligatorios.' });
  }

  try {
    // Añadimos el campo themeId opcional
    const user = { 
      username: req.body.username, 
      email: req.body.email, 
      bio: req.body.bio,
      themeId: req.body.themeId || null // Si no envía tema, queda como null
    };
    const response = await mongodb.getDb().db('portfolio_db').collection('users').insertOne(user);
    res.status(201).json(response);
  } catch (err) { res.status(500).json(err); }
};

const updateUser = async (req, res) => {
  if (!req.body.username || !req.body.email) {
    return res.status(400).json({ message: 'No puedes dejar campos vacíos.' });
  }

  try {
    const userId = new ObjectId(req.params.id);
    const user = { 
      username: req.body.username, 
      email: req.body.email, 
      bio: req.body.bio,
      themeId: req.body.themeId 
    };
    const response = await mongodb.getDb().db('portfolio_db').collection('users').replaceOne({ _id: userId }, user);
    
    response.modifiedCount > 0 ? res.status(204).send() : res.status(404).json('No se encontró el usuario');
  } catch (err) { res.status(500).json(err); }
};


const deleteUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('portfolio_db').collection('users').deleteOne({ _id: userId });
    
    response.deletedCount > 0 ? res.status(200).json('Eliminado') : res.status(404).json('Usuario no encontrado');
  } catch (err) { res.status(500).json(err); }
};

module.exports = { getAll, createUser, updateUser, deleteUser };