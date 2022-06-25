"use strict";
exports.rand = x => Math.random()*x;
exports.dice = x =>  ~~(Math.random()*x);
exports.randAngle = (x = Math.PI*2) => Math.random()*x;
exports.randIn = (l, r) => Math.random()*(r-l+1) + l;
