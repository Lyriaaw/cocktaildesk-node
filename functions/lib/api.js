"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = undefined;

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API_URL = "https://cocktaildesk-back.herokuapp.com";


var get = function get(uri) {
  return new Promise(function (r, re) {
    _axios2.default.get(API_URL + uri).then(r).catch(re);
  });
};

exports.get = get;