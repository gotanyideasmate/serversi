/*

'use strict';

var cfg = require('../config.json');

exports.serverStartTime = Date.now();
// Get a better logging function
exports.time = () => {
    return Date.now() - exports.serverStartTime;
};

// create a custom timestamp format for log statements

exports.log = text => {
    console.log('[' + (exports.time()/1000).toFixed(3) + ']: ' + text);
};
exports.warn = text => {
    console.log('[' + (exports.time()/1000).toFixed(3) + ']: ' + '[WARNING] ' + text);
};
exports.error = text => {
    console.log(text);
};*/
