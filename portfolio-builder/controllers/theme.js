const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db('portfolio_db').collection('themes').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) { res.status(500).json(err); }
};

const createTheme = async (req, res) => {
  // Validación de campos obligatorios
  if (!req.body.name || !req.body.primaryColor) {
    return res.status(400).json({ message: 'Name y primaryColor son obligatorios.' });
  }

  try {
    const theme = { 
      name: req.body.name, 
      primaryColor: req.body.primaryColor, 
      fontFamily: req.body.fontFamily 
    };
    const response = await mongodb.getDb().db('portfolio_db').collection('themes').insertOne(theme);
    res.status(201).json(response);
  } catch (err) { res.status(500).json(err); }
};

const updateTheme = async (req, res) => {
  // Validación para el update
  if (!req.body.name || !req.body.primaryColor) {
    return res.status(400).json({ message: 'No puedes actualizar a valores vacíos.' });
  }

  try {
    const themeId = new ObjectId(req.params.id);
    const theme = { 
      name: req.body.name, 
      primaryColor: req.body.primaryColor, 
      fontFamily: req.body.fontFamily 
    };
    const response = await mongodb.getDb().db('portfolio_db').collection('themes').replaceOne({ _id: themeId }, theme);
    
    response.modifiedCount > 0 ? res.status(204).send() : res.status(404).json('No se encontró el tema para actualizar');
  } catch (err) { res.status(500).json(err); }
};

const deleteTheme = async (req, res) => {
  try {
    const themeId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('portfolio_db').collection('themes').deleteOne({ _id: themeId });
    
    response.deletedCount > 0 ? res.status(200).json('Eliminado correctamente') : res.status(404).json('Tema no encontrado');
  } catch (err) { res.status(500).json(err); }
};

module.exports = { getAll, createTheme, updateTheme, deleteTheme };