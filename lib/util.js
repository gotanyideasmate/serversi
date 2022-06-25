"use strict";
exports.do = (t = 0, f = () => {}) => {
    do { f(t) } while (--t);
};
exports.loop = (i = 0, l = -1, f = () => {}) => {
    --i;
    while (++i <= l) f(i);
};
exports.genN = n => {
    var o = new Array(n);
    do { o[--n] = n } while (n);
    return o;
};
