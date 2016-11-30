'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _client = require('../client.js');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var CREDENTIALS = ['1a24494b53b5b68817febe1266615b8917c9a5cc', '2ee3a6e464ba2fde41ea8161e2b814ccc1f09b3b']; // TEST
var FIXTURES = [_path2.default.join(__dirname, 'fixtures/form.pdf'), _path2.default.join(__dirname, 'fixtures/form-2.pdf')];
var client = new (Function.prototype.bind.apply(_client2.default, [null].concat(CREDENTIALS)))();

(0, _tape2.default)('Client#constructor', function (t) {
  t.equal(client.key, '1a24494b53b5b68817febe1266615b8917c9a5cc');
  t.equal(client.secret, '2ee3a6e464ba2fde41ea8161e2b814ccc1f09b3b');
  t.equal(_typeof(client._request), 'function');
  t.equal(_typeof(client.Fax), 'object');
  t.end();
});

(0, _tape2.default)('throttling', function () {
  var _ref = _asyncToGenerator(function* (t) {
    try {
      var ress = yield Promise.all([client.Fax.send({
        to: '+13034404585',
        file: FIXTURES[0]
      }), client.Fax.send({
        to: '+13034404585',
        file: FIXTURES[1]
      })]);
      t.equal(ress[0].body.success, true);
      t.equal(ress[1].body.success, true);
    } catch (e) {
      console.log(e);
      t.equal(false, true);
    }
    t.end();
  });

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

(0, _tape2.default)('Client.Fax.send', function () {
  var _ref2 = _asyncToGenerator(function* (t) {
    t.equal(_typeof(client.Fax.send), 'function');
    var res = yield client.Fax.send({
      to: '+13034404585',
      file: FIXTURES[0]
    });
    t.equal(res.body.success, true);
    t.end();
  });

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());

(0, _tape2.default)('Client.Fax.send multiple', function () {
  var _ref3 = _asyncToGenerator(function* (t) {
    t.equal(_typeof(client.Fax.send), 'function');
    var res = yield client.Fax.send({
      to: '+13034404585',
      file: [FIXTURES[0], FIXTURES[1]]
    });
    t.equal(res.body.success, true);
    t.end();
  });

  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}());
//# sourceMappingURL=client.js.map