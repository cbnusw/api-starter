const { Post } = require('../../../models');
const { createResponse } = require('../../utils/response');
const { POST_NOT_FOUND } = require('../../../errors');

exports.getPosts = getPosts;
exports.getPost = getPost;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.removePost = removePost;

async function getPosts(req, res, next) {
  try {
    const data = await Post.search(req.query);
    res.json(createResponse(res, data));
  } catch (e) {
    next(e);
  }
}

async function getPost(req, res, next) {
  const { id } = req.params;

  try {
    const doc = await Post.findById(id);
    if (!doc) return next(POST_NOT_FOUND);
    res.json(createResponse(res, doc));
  } catch (e) {
    next(e);
  }

}

async function createPost(req, res, next) {
  const { body } = req;

  try {
    const doc = await Post.create(body);
    res.json(createResponse(res, doc));
  } catch (e) {
    next(e);
  }
}

async function updatePost(req, res, next) {
  const { body: $set, params: { id } } = req;

  try {
    const doc = await Post.findById(id);
    if (!doc) return next(POST_NOT_FOUND);
    await doc.updateOne({ $set });
    res.json(createResponse(res));
  } catch (e) {
    next(e);
  }
}

async function removePost(req, res, next) {
  const { id } = req.params;

  try {
    const doc = await Post.findById(id);
    if (!doc) return next(POST_NOT_FOUND);
    await doc.deleteOne();
    res.json(createResponse(res));
  } catch (e) {
    next(e);
  }
}
