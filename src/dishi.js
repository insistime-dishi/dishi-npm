'use strict';

// dishi
var _ucenter 	= require('./service/dishi-ucenter.js');
var _crud		= require('./service/dishi-crud.js');
var _done       = require('./service/dishi-done.js');

// ucenter
exports.login 		= _ucenter.login;
exports.sendCode	= _ucenter.sendCode;
exports.register	= _ucenter.register;

// crud
exports.list 	= _crud.list;
exports.add 	= _crud.add;
exports.update	= _crud.update;
exports.del 	= _crud.del;

// done
exports.done    = _done.done;