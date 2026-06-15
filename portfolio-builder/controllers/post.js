const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const db = mongodb.getDb();
    if (!db) return res.status(200).json([]);
    const result = await db.db('portfolio_db').collection('posts').find().toArray();
    res.status(200).json(result);
  } catch (err) { res.status(500).json(err); }
};

const createPost = async (req, res) => {
  if (!req.body.title || !req.body.content) return res.status(400).json({ message: 'Title y content son obligatorios.' });
  try {
    const post = { title: req.body.title, content: req.body.content, userId: req.body.userId };
    const response = await mongodb.getDb().db('portfolio_db').collection('posts').insertOne(post);
    res.status(201).json(response);
  } catch (err) { res.status(500).json(err); }
};

const updatePost = async (req, res) => {
  try {
    const postId = new ObjectId(req.params.id);
    const post = { title: req.body.title, content: req.body.content, userId: req.body.userId };
    const response = await mongodb.getDb().db('portfolio_db').collection('posts').replaceOne({ _id: postId }, post);
    response.modifiedCount > 0 ? res.status(204).send() : res.status(404).json('No encontrado');
  } catch (err) { res.status(500).json(err); }
};

const deletePost = async (req, res) => {
  try {
    const postId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('portfolio_db').collection('posts').deleteOne({ _id: postId });
    response.deletedCount > 0 ? res.status(200).json('Eliminado') : res.status(404).json('No encontrado');
  } catch (err) { res.status(500).json(err); }
};

module.exports = { getAll, createPost, updatePost, deletePost };