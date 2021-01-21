const { basename } = require('path');

module.exports = filepath => {
  const filename = basename(filepath);
  return filename
    .replace(/\.schema\.js$/, '')
    .replace(/-/g, '');
}
