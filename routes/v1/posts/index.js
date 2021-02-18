const { Router } = require('express');
const { requireAuthentication } = require('../../middlewares');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getPosts);
router.get('/:id', controller.getPost);
router.post('/', requireAuthentication, controller.createPost);
router.put('/:id', requireAuthentication, controller.updatePost);
router.delete('/:id', requireAuthentication, controller.removePost);

module.exports = router;
