const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const db = mongodb.getDb();
    if (!db) return res.status(200).json([]);
    const result = await db.db('portfolio_db').collection('projects').find().toArray();
    res.status(200).json(result);
  } catch (err) { res.status(500).json(err); }
};

const createProject = async (req, res) => {
  if (!req.body.title || !req.body.description) return res.status(400).json({ message: 'Title y description son obligatorios' });
  try {
    const project = { title: req.body.title, description: req.body.description };
    const response = await mongodb.getDb().db('portfolio_db').collection('projects').insertOne(project);
    res.status(201).json(response);
  } catch (err) { res.status(500).json(err); }
};

const updateProject = async (req, res) => {
  // Validación para evitar campos vacíos
  if (!req.body.title || !req.body.description) {
    return res.status(400).json({ message: 'No puedes dejar campos vacíos.' });
  }

  try {
    const projectId = new ObjectId(req.params.id);
    const project = { title: req.body.title, description: req.body.description };
    const response = await mongodb.getDb().db('portfolio_db').collection('projects').replaceOne({ _id: projectId }, project);
    
    response.modifiedCount > 0 ? res.status(204).send() : res.status(404).json('No encontrado');
  } catch (err) { res.status(500).json(err); }
};

const deleteProject = async (req, res) => {
  try {
    const projectId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('portfolio_db').collection('projects').deleteOne({ _id: projectId });
    response.deletedCount > 0 ? res.status(200).json('Eliminado') : res.status(404).json('No encontrado');
  } catch (err) { res.status(500).json(err); }
};

module.exports = { getAll, createProject, updateProject, deleteProject };