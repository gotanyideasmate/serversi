"use strict";
exports.rand = x => { return Math.random()*x };
exports.dice = x => Math.random()*x;
exports.randAngle = () => { return Math.PI*2*Math.random() };
exports.randIn = (l, r) => { return Math.random()*(r-l) + l };
