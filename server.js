"use strict";
const ut = require('./lib/util.js');
var arr = Array.prototype;
arr.loop = function(f = () => {}, i = 0, l = this.length) {
    --i;
    while (++i <= l) f(i);
};
arr.remove = function(i) {
    if (i !== this.length-1)
        this[i] = this[this.length-1];
    this.pop();
};
arr.shufflefilter = function(f) { // depends on case
    for (var i = -1, l = this.length; ++i < l;)
        if (!f(this[i], i, this))
            this[i--] = this[--l];
    this.length = l;
};
arr.noreturnfilter = function(f) { // for all
    var j = -1;
    this.loop((i) => {
        if (f(this[i], i, this))
            this[++j] = this[i];
    });
    this.length = j+1;
};
arr.usedLength = arr.length;
arr.resetUsedLength = () => { arr.usedLength = arr.length };
arr.noreturnfilterconstlength = function(f) { // needs testing
    var j = -1;
    this.loop((i) =>
        if (f(this[i], i, this))
            this[++j] = this[i];
    }, 0, this.usedLength);
    this.usedLength = j+1;
}
const gN = n => {
    var o = new Array(n);
    do { o[--n] = n } while (n);
    return o;
};
/*// General requires
require('google-closure-library');
goog.require('goog.structs.PriorityQueue');
goog.require('goog.structs.QuadTree');
// Import game settings.
const c = require('./config.json');*/
// Define IOs (AI)
/*function nearest(array, location, test = () => { return true; }) {
    let list = new goog.structs.PriorityQueue();
    let d;
    if (!array.length) {
        return undefined;
    }
    array.forEach(function(instance) {
        d = Math.pow(instance.x - location.x, 2) + Math.pow(instance.y - location.y, 2);
        if (test(instance, d)) {
            list.enqueue(d, instance);
        }
    });
    return list.dequeue();
}

class IO {
    constructor(body) {
        this.body = body;
        this.acceptsFromTop = true;
    }

    think() {
        return {
            target: null,
            goal: null,
            fire: null,
            main: null,
            alt: null,
            power: null,
        };
    }
}
*/
/***** ENTITIES *****/
// Define entities
//const grid = new hshg.HSHG();

/*** SERVER SETUP ***/
// Make a speed monitor

// Essential server requires
/*var http = require('http'),
    url = require('url'),
    WebSocket = require('ws'),
    fs = require('fs'),
    mockupJsonData = (() => {
        let mockupData = [];
        let writeData = JSON.stringify(mockupData);
        return writeData;
    })();*/

// Websocket behavior
/*const sockets = (() => {
    const protocol = require('./lib/fasttalk');
    let clients = [], players = [];
    return {
        broadcast: message => {
            clients.forEach(socket => {
                socket.talk('m', message);
            });
        },
        connect: (() => {
            // Define shared functions
            // Closing the socket
            // Build the returned function
            // This function initalizes the socket upon connection
            return (socket, req) => {
                // Get information about the new connection and verify it
                util.log('A client is trying to connect...');
                // Set it up
                socket.binaryType = 'arraybuffer';
                socket.key = '';
                socket.player = { camera: {}, };
                socket.timeout = (() => {
                    let mem = 0;
                    let timer = 0;
                    return {
                        set: val => { if (mem !== val) { mem = val; timer = util.time(); } },
                        check: time => { return timer && time - timer > c.maxHeartbeatInterval; },
                    };
                })();
                // Set up the status container
                socket.status = {
                    verified: false,
                    receiving: 0,
                    deceased: true,
                    requests: 0,
                    hasSpawned: false,
                    needsFullMap: true,
                    needsNewBroadcast: true,
                    lastHeartbeat: util.time(),
                };
                // Set up loops
                socket.loops = (() => {
                    let nextUpdateCall = null; // has to be started manually
                    let trafficMonitoring = setInterval(() => traffic(socket), 1500);
                    broadcast.subscribe(socket)
                    // Return the loop methods
                    return {
                        setUpdate: timeout => {
                            nextUpdateCall = timeout;
                        },
                        cancelUpdate: () => {
                            clearTimeout(nextUpdateCall);
                        },
                        terminate: () => {
                            clearTimeout(nextUpdateCall);
                            clearTimeout(trafficMonitoring);
                            broadcast.unsubscribe(socket)
                        },
                    };
                })();
                // Set up the camera
                socket.camera = {
                    x: undefined,
                    y: undefined,
                    vx: 0,
                    vy: 0,
                    lastUpdate: util.time(),
                    lastDowndate: undefined,
                    fov: 2000,
                };
                // Set up the viewer
                socket.makeView = () => { socket.view = eyes(socket); };
                socket.makeView();
                // Put the fundamental functions in the socket
                socket.kick = reason => kick(socket, reason);
                socket.talk = (...message) => {
                    if (socket.readyState === socket.OPEN) {
                        socket.send(protocol.encode(message), { binary: true, });
                    }
                };
                socket.lastWords = (...message) => {
                    if (socket.readyState === socket.OPEN) {
                        socket.send(protocol.encode(message), { binary: true, }, () => setTimeout(() => socket.terminate(), 1000));
                    }
                };
                socket.on('message', message => incoming(message, socket));
                socket.on('close', () => { socket.loops.terminate(); close(socket); });
                socket.on('error', e => { util.log('[ERROR]:'); util.error(e); });
                // Put the player functions in the socket
                socket.spawn = name => { return spawn(socket, name); };
                // And make an update
                socket.update = time => {
                    socket.loops.cancelUpdate();
                    socket.loops.setUpdate(setTimeout(() => { socket.view.gazeUpon(); }, time));
                };
                // Log it
                clients.push(socket);
                util.log('[INFO] New socket opened');
            };
        })(),
    };
})();*/

/**** GAME SETUP ****/
// Define how the game lives
// The most important loop. Fast looping.
/*var gameloop = (() => {})();
// A less important loop. Runs at an actual 5Hz regardless of game speed.
var maintainloop = (() => {})();
// This is the checking loop. Runs at 1Hz.
var speedcheckloop = (() => {
    let fails = 0;
    // Return the function
    return () => {
        let activationtime = logs.activation.sum(),
            collidetime = logs.collide.sum(),
            movetime = logs.entities.sum(),
            playertime = logs.network.sum(),
            maptime = logs.minimap.sum(),
            physicstime = logs.physics.sum(),
            lifetime = logs.life.sum(),
            selfietime = logs.selfie.sum();
        let sum = logs.master.record();
        let loops = logs.loops.count(),
            active = logs.entities.count();
        global.fps = (1000/sum).toFixed(2);
        if (sum > 1000 / roomSpeed / 30) {
            //fails++;
            util.warn('~~ LOOPS: ' + loops + '. ENTITY #: ' + entities.length + '//' + Math.round(active/loops) + '. VIEW #: ' + views.length + '. BACKLOGGED :: ' + (sum * roomSpeed * 3).toFixed(3) + '%! ~~');
            util.warn('Total activation time: ' + activationtime);
            util.warn('Total collision time: ' + collidetime);
            util.warn('Total cycle time: ' + movetime);
            util.warn('Total player update time: ' + playertime);
            util.warn('Total lb+minimap processing time: ' + maptime);
            util.warn('Total entity physics calculation time: ' + physicstime);
            util.warn('Total entity life+thought cycle time: ' + lifetime);
            util.warn('Total entity selfie-taking time: ' + selfietime);
            util.warn('Total time: ' + (activationtime + collidetime + movetime + playertime + maptime + physicstime + lifetime + selfietime));
            if (fails > 60) {
                util.error("FAILURE!");
                process.exit(1);
            }
        } else {
            fails = 0;
        }
    };
})();*/

/** BUILD THE SERVERS **/
// Turn the server on
/*let server = http.createServer((req, res) => {
  let { pathname } = url.parse(req.url)
  switch (pathname) {
    case '/':
      res.writeHead(200)
      res.end(`<div>a</div>`)
    break
    case '/mockups.json':
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.writeHead(200)
      res.end(mockupJsonData)
    break
    default:
      res.writeHead(404)
      res.end()
  }
})*/

/*let websockets = (() => {
    // Configure the websocketserver
    let config = { server: server }
        server.listen(process.env.PORT || 8080, function httpListening() {
            util.log((new Date()) + ". Joint HTTP+Websocket server turned on, listening on port "+server.address().port + ".")
        })
    / *if (c.servesStatic) {
    } else {
        config.port = 8080;
        util.log((new Date()) + 'Websocket server turned on, listening on port ' + 8080 + '.');
    }* /
    // Build it
    return new WebSocket.Server(config)
})().on('connection', sockets.connect);*/

// Bring it to life
/*setInterval(gameloop, 30);
setInterval(maintainloop, 200);
setInterval(speedcheckloop, 1000);*/
