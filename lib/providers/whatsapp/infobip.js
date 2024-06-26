"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));
var _stringify = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/json/stringify"));
var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));
var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));
var _request = _interopRequireDefault(require("../../util/request"));
// Types
var WhatsappInfobipProvider = exports["default"] = /*#__PURE__*/function () {
  function WhatsappInfobipProvider(_ref) {
    var baseUrl = _ref.baseUrl,
      apiKey = _ref.apiKey;
    (0, _classCallCheck2["default"])(this, WhatsappInfobipProvider);
    (0, _defineProperty2["default"])(this, "id", 'whatsapp-infobip-provider');
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }
  return (0, _createClass2["default"])(WhatsappInfobipProvider, [{
    key: "send",
    value: function () {
      var _send = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request) {
        var _ref2, from, to, content, messageId, mediaType, callbackData, notifyUrl, payload, response, responseBody, messages, message, error, _error, _message;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!request.customize) {
                _context.next = 6;
                break;
              }
              _context.next = 3;
              return request.customize(this.id, request);
            case 3:
              _context.t0 = _context.sent;
              _context.next = 7;
              break;
            case 6:
              _context.t0 = request;
            case 7:
              _ref2 = _context.t0;
              from = _ref2.from;
              to = _ref2.to;
              content = _ref2.content;
              messageId = _ref2.messageId;
              mediaType = _ref2.mediaType;
              callbackData = _ref2.callbackData;
              notifyUrl = _ref2.notifyUrl;
              // Construct the payload
              payload = {
                from: from.replace('+', ''),
                to: to.replace('+', ''),
                messageId: messageId,
                callbackData: callbackData,
                notifyUrl: notifyUrl,
                content: content
              };
              _context.next = 18;
              return (0, _request["default"])("".concat(this.baseUrl, "/whatsapp/1/message/").concat(mediaType), {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: "App ".concat(this.apiKey),
                  'User-Agent': 'notifme-sdk/v1 (+https://github.com/notifme/notifme-sdk)'
                },
                body: (0, _stringify["default"])({
                  messages: [payload]
                }) // Ensure the payload is correctly wrapped
              });
            case 18:
              response = _context.sent;
              _context.next = 21;
              return response.json();
            case 21:
              responseBody = _context.sent;
              if (!response.ok) {
                _context.next = 33;
                break;
              }
              // Handle the potential array or single object response
              messages = (0, _isArray["default"])(responseBody.messages) ? responseBody.messages : [responseBody];
              message = messages[0];
              if (!['PENDING', 'DELIVERED'].includes(message.status.groupName)) {
                _context.next = 29;
                break;
              }
              return _context.abrupt("return", message.messageId);
            case 29:
              error = message.status;
              throw new Error((0, _keys["default"])(error).map(function (key) {
                return "".concat(key, ": ").concat(error[key]);
              }).join(', '));
            case 31:
              _context.next = 40;
              break;
            case 33:
              if (!(responseBody.requestError && responseBody.requestError.serviceException)) {
                _context.next = 39;
                break;
              }
              _error = responseBody.requestError.serviceException;
              _message = (0, _keys["default"])(_error).map(function (key) {
                return "".concat(key, ": ").concat(_error[key]);
              }).join(', ');
              throw new Error(_message);
            case 39:
              throw new Error((0, _stringify["default"])(responseBody));
            case 40:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function send(_x) {
        return _send.apply(this, arguments);
      }
      return send;
    }()
  }]);
}();