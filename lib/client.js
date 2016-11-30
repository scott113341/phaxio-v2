'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _constants = require('./constants.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = function () {
  function Client(apiKey, apiSecret) {
    _classCallCheck(this, Client);

    this.key = apiKey;
    this.secret = apiSecret;
    this._request = minWait(this.__request.bind(this), 2000);
  }

  _createClass(Client, [{
    key: '__request',
    value: function () {
      var _ref = _asyncToGenerator(function* (path) {
        var _this = this;

        var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';

        return function () {
          return _superagent2.default[method.toLowerCase()](_constants.BASE_URL + path).auth(_this.key, _this.secret);
        };
      });

      function __request(_x2) {
        return _ref.apply(this, arguments);
      }

      return __request;
    }()
  }, {
    key: 'Fax',
    get: function get() {
      var _this2 = this;

      return {
        send: function () {
          var _ref3 = _asyncToGenerator(function* (_ref2) {
            var file = _ref2.file,
                body = _objectWithoutProperties(_ref2, ['file']);

            var req = (yield _this2._request('/faxes', 'POST'))();
            req.field(body);
            if (Array.isArray(file)) file.forEach(function (f) {
              return req.attach('file[]', f);
            });else req.attach('file', file);
            return req;
          });

          function send(_x3) {
            return _ref3.apply(this, arguments);
          }

          return send;
        }()
      };
    }
  }]);

  return Client;
}();

exports.default = Client;


function pause() {
  var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
}

function minWait(fn, between) {
  var last = 0;

  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var now = Date.now();
    var wait = Math.max(0, between - now + last);
    last = now + wait;
    return pause(wait).then(function () {
      return fn.apply(undefined, args);
    });
  };
}
//# sourceMappingURL=client.js.map