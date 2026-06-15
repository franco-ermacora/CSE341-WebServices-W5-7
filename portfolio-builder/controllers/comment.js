const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const db = mongodb.getDb();
    if (!db) return res.status(200).json([]);
    const result = await db.db('portfolio_db').collection('comments').find().toArray();
    res.status(200).json(result);
  } catch (err) { res.status(500).json(err); }
};

const createComment = async (req, res) => {
  if (!req.body.text || !req.body.author) return res.status(400).json({ message: 'Text y author son obligatorios' });
  try {
    const comment = { text: req.body.text, author: req.body.author };
    const response = await mongodb.getDb().db('portfolio_db').collection('comments').insertOne(comment);
    res.status(201).json(response);
  } catch (err) { res.status(500).json(err); }
};

const updateComment = async (req, res) => {
  // Validación para evitar campos vacíos
  if (!req.body.text || !req.body.author) {
    return res.status(400).json({ message: 'No puedes dejar campos vacíos.' });
  }

  try {
    const commentId = new ObjectId(req.params.id);
    const comment = { text: req.body.text, author: req.body.author };
    const response = await mongodb.getDb().db('portfolio_db').collection('comments').replaceOne({ _id: commentId }, comment);
    
    response.modifiedCount > 0 ? res.status(204).send() : res.status(404).json('No encontrado');
  } catch (err) { res.status(500).json(err); }
};

const deleteComment = async (req, res) => {
  try {
    const commentId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('portfolio_db').collection('comments').deleteOne({ _id: commentId });
    response.deletedCount > 0 ? res.status(200).json('Eliminado') : res.status(404).json('No encontrado');
  } catch (err) { res.status(500).json(err); }
};

module.exports = { getAll, createComment, updateComment, deleteComment };