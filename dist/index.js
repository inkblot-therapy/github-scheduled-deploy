parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"7QCb":[function(require,module,exports) {
"use strict";var e=r(require("moment-timezone")),o=r(require("async-request")),t=require("actions-toolkit");function r(e){return e&&e.__esModule?e:{default:e}}async function i(e){return new Promise(o=>{setTimeout(o,e)})}t.Toolkit.run(async t=>{const r=process.env.MEDSTACK_WEBHOOK,a=(0,e.default)().tz("America/Toronto").valueOf(),n=(0,e.default)().tz("America/Toronto").endOf("day").add(2,"hours").valueOf()-a;try{if(!r)throw new Error("Webhoook is required.");console.log("Will deploy in milliseconds: ",n),await i(n);const e=await(0,o.default)(r,{method:"POST"});if(200!=e.statusCode)throw new Error(`[Deploy Failed] Returned ${e.status}`);console.log(e)}catch(s){t.log.fatal(s),t.exit.failure(s)}t.exit.success("Deploy was initiated.")});
},{}]},{},["7QCb"], null)