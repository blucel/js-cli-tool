/*
 * js-plugin-cli v1.0.0
 * (c) 2020 Feng L.H.
 * Released under the MIT License.
 */
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.12 = factory());
}(this, function () { 'use strict';
  var 12 = {};

  12.version = '0.1.0';

  var Settings = {
    num: 5,
  };

  // Configure
  12.configure = function (options) {
    var key, value;
    for (key in options) {
      value = options[key];
      if (value !== undefined && options.hasOwnProperty(key)){
        Settings[key] = value;
      }
    }
    return this;
  };

  // Example
  12.example = function () {
    console.log('You have ' + Settings.num + ' examples');
  };


  // Global query selector
  // var $ = function (selector) {
  //   return document.querySelector(selector);
  // };

  if (typeof window !== 'undefined') {
    window.12 = 12;
  }

  return 12;
}));
