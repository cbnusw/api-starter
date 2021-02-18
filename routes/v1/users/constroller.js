const { UserInfo } = require('../../../models');
const { createResponse } = require('../../utils/response');

const getMembers = async (req, res, next) => {
  try {
    const data = await UserInfo.search(req.query);
    res.json(createResponse(res, data));
  } catch (err) {
    next(err);
  }
};

exports.getMembers = getMembers;