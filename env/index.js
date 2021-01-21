require('dotenv').config();

const { env } = process;

module.exports = {
  IS_DEV: env.NODE_ENV === 'development',
  ...env,
};
