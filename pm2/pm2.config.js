require('dotenv').config();

const INSTANCE = +(process.env.PM2_INSTANCE || 0) || undefined;
const EXEC_MODE = process.env.PM2_EXEC_MODE || undefined;

// PM2: https://pm2.keymetrics.io/
// PM2 Ecosystem File: https://pm2.keymetrics.io/docs/usage/application-declaration/
module.exports = {
  apps: [
    {
      name: 'api-server',
      script: 'index.js',
      instance: INSTANCE,
      exec_mode: EXEC_MODE
    }
  ]
};
