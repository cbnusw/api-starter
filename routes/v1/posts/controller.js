const { Post } = require('../../../models');
const { createResponse } = require('../../utils/response');
const { POST_NOT_FOUND, FORBIDDEN } = require('../../../errors');

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
    const doc = await Post.findById(id).populate({ path: 'writer', select: 'name -_id' });
    if (!doc) return next(POST_NOT_FOUND);
    res.json(createResponse(res, doc));
  } catch (e) {
    next(e);
  }

}

async function createPost(req, res, next) {
  const { body, user } = req;

  body.writer = user.info;

  try {
    const doc = await Post.create(body);
    res.json(createResponse(res, doc));
  } catch (e) {
    next(e);
  }
}

async function updatePost(req, res, next) {
  const { body: $set, params: { id }, user } = req;

  try {
    const doc = await Post.findById(id);
    if (!doc) return next(POST_NOT_FOUND);
    if (String(doc.writer) !== String(user.info)) return next(FORBIDDEN);
    await doc.updateOne({ $set });
    res.json(createResponse(res));
  } catch (e) {
    next(e);
  }
}

async function removePost(req, res, next) {
  const { params: { id }, user } = req;

  try {
    const doc = await Post.findById(id);
    if (!doc) return next(POST_NOT_FOUND);
    if (String(doc.writer) !== String(user.info)) return next(FORBIDDEN);
    await doc.deleteOne();
    res.json(createResponse(res));
  } catch (e) {
    next(e);
  }
}
