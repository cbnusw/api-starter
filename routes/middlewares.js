const axios = require('axios');
const e = require('express');
const { AUTH_APP_HOST } = require('../env');
const { FORBIDDEN } = require('../errors');


const authenticate = async (req, res, next) => {
  const accessToken = req.headers['x-access-token'];
  if (!accessToken) {
    delete req.user;
    return next();
  }

  try {
    const headers = { 'x-access-token': accessToken };
    const response = await axios.get(`${AUTH_APP_HOST}/valid`, { headers });
    const { data } = response.data;
    req.user = data;
  } catch (e) {
    delete req.user;
  }

  next();
}

const requireAuthentication = async (req, res, next) => {
  const headers = {};
  const accessToken = req.headers['x-access-token'];
  if (accessToken) headers['x-access-token'] = accessToken;

  try {
    const response = await axios.get(`${AUTH_APP_HOST}/valid`, { headers });
    const { data } = response.data;
    req.user = data;
    next();
  } catch (e) {
    next(e.response && e.response.data || e);
  }
}

const requireRoles = (...roles) => [
  requireAuthentication,
  (req, res, next) => roles.includes(req.user.role) ? next() : next(FORBIDEEN)
]

exports.requireAuthentication = requireAuthentication;
exports.requireRoles = requireRoles;