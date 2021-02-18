const { Router } = require('express');
const { requireRoles } = require('../../middlewares');
const controller = require('./constroller');

const router = Router();

router.get('/members', requireRoles('admin', 'operator'), controller.getMembers);

module.exports = router;
