const { Router } = require('express');
const { join } = require('path');
const { readdirSync, statSync } = require('fs');
const { API_VERSIONS } = require('../env');
const { debug } = require('../utils/logger');

const versions = (API_VERSIONS || 'v1').split(',').map(v => v.trim());

const router = Router();

versions.forEach(v => {
  const r = Router();
  const baseDir = join(__dirname, v);

  readdirSync(baseDir)
    .filter(dir => statSync(join(baseDir, dir)).isDirectory())
    .forEach(dir => {
      debug(`Loading API -> /${v}/${dir} API`)
      r.use(`/${dir}`, require(join(baseDir, dir)));
    });

  router.use(`/${v}`, r);
});

module.exports = router;
