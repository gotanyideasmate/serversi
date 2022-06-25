"use strict";
exports.do = (l = 0, f = () => {}) => {
    var i = -1;
    while (++i < l)
        f(i);
};
exports.loop = (i = 0, l = -1, f = () => {}) => {
    --i;
    while (++i <= l) f(i);
};
exports.genN = (n, x, f = () => undefined) => {
    var o = new Array(n);
    while (n--)
        o[n] = f() || i || n;
    return o;
};
