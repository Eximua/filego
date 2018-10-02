const level = require('level');
const configs = require('./configs');

const db = level(configs.levelDB.dbPath);

exports.default = db;