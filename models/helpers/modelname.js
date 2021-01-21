const { basename } = require('path');

module.exports = filepath => {
    const filename = basename(filepath);
    return filename
        .replace(/\.schema\.js$/, '')
        .split('-')
        .map(chunk => chunk[0].toUpperCase() + chunk.substr(1))
        .join('');
};
