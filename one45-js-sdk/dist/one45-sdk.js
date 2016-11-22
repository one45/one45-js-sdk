(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _rest = require('./rest');

var _rest2 = _interopRequireDefault(_rest);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _One45User = require('./One45User');

var _One45User2 = _interopRequireDefault(_One45User);

var _One45Form = require('./One45Form');

var _One45Form2 = _interopRequireDefault(_One45Form);

var _One45Institution = require('./One45Institution');

var _One45Institution2 = _interopRequireDefault(_One45Institution);

var _One45Rotation = require('./One45Rotation');

var _One45Rotation2 = _interopRequireDefault(_One45Rotation);

/**
 * Wrapper class for all of one45 services and configuration
 */

var One45 = (function () {
  function One45() {
    _classCallCheck(this, One45);

    this.Core = _core2['default'];
    this.Rest = _rest2['default'];
    this.Auth = _auth2['default'];
    this.User = _One45User2['default'];
    this.Form = _One45Form2['default'];
    this.Institution = _One45Institution2['default'];
    this.Rotation = _One45Rotation2['default'];
  }

  /**
   * @param serverUrl - base url end point for making api requests
   * @param clientKey - application key
   * @param config - key value array of parameters that can be set ie. CURRENT_USER, REFRESH_TOKEN, ACCESS_TOKEN
   */

  _createClass(One45, [{
    key: 'initialize',
    value: function initialize() {
      var serverUrl = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

      var _this = this;

      var clientKey = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
      var configs = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      this.Core.set('SERVER_URL', serverUrl);
      this.Core.set('CLIENT_KEY', clientKey);

      if (configs instanceof Object) {
        for (var key in configs) {
          this.Core.set(key, configs[key]);
        }
      }

      return this.Rest.get('/public/api/v1/application', { client_key: this.Core.get('CLIENT_KEY') }).then(function (resp) {
        _this.Core.set('APPLICATION', resp);
        return _this.Institution.getCurrentInstitution();
      });
    }
  }]);

  return One45;
})();

exports['default'] = One45;
module.exports = exports['default'];

},{"./One45Form":2,"./One45Institution":3,"./One45Rotation":4,"./One45User":5,"./auth":6,"./core":8,"./rest":10}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _rest = require('./rest');

var _rest2 = _interopRequireDefault(_rest);

function getById(form_id) {
  return _rest2['default'].get('/api/v1/forms/' + form_id);
}

function getQuestions(form_id) {
  return _rest2['default'].get('/api/v1/forms/' + form_id + '/questions');
}

exports['default'] = {
  getById: getById,
  getQuestions: getQuestions
};
module.exports = exports['default'];

},{"./core":8,"./rest":10}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _rest = require('./rest');

var _rest2 = _interopRequireDefault(_rest);

function getCurrentInstitution() {
  return _rest2['default'].get('/public/api/v1/institution').then(function (res) {
    _core2['default'].set('INSTITUTION', res);
    return res;
  });
}

function getPreferences(params) {
  return _rest2['default'].get('/api/v1/institution/preferences', params);
}

exports['default'] = {
  getCurrentInstitution: getCurrentInstitution,
  getPreferences: getPreferences
};
module.exports = exports['default'];

},{"./core":8,"./rest":10}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _rest = require('./rest');

var _rest2 = _interopRequireDefault(_rest);

function getById(rotation_id) {
  return _rest2['default'].get('/api/v1/rotations/' + rotation_id);
}

function getBestGuessList(rotation_id) {
  return _rest2['default'].get('/api/v1/rotations/' + rotation_id + '/bestguesslist');
}

exports['default'] = {
  getById: getById,
  getBestGuessList: getBestGuessList
};
module.exports = exports['default'];

},{"./core":8,"./rest":10}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _rest = require('./rest');

var _rest2 = _interopRequireDefault(_rest);

function login(username, password, mode) {
  return _rest2['default'].post('/public/api/v1/token/login', {
    username: username,
    password: password,
    client_key: _core2['default'].get('CLIENT_KEY'),
    mode: mode
  }).then(function (res) {
    _core2['default'].set('ACCESS_TOKEN', res.access_token);
    _core2['default'].set('REFRESH_TOKEN', res.refresh_token);
    _core2['default'].set('CURRENT_USER', res.user);
    return res;
  });
}

/**
 * Todo : Should return promise and invalidate token using invalidate api
 */
function logout() {
  _rest2['default'].del('/public/api/v1/token/invalidate', { "access_token": _core2['default'].get('ACCESS_TOKEN') });

  _core2['default'].set('ACCESS_TOKEN', null);
  _core2['default'].set('REFRESH_TOKEN', null);
  _core2['default'].set('CURRENT_USER', null);
}

function getCurrentUser() {
  return _core2['default'].get('CURRENT_USER');
}

function getTodos(params) {
  return _rest2['default'].get('/api/v1/user/todos', params);
}

function getEvaluationById(id) {
  return _rest2['default'].get('/api/v1/user/evaluations/' + id);
}

function saveAnswer(evaluation_id, question_id, values) {
  var url = '/api/v1/user/evaluations/' + evaluation_id + '/question/' + question_id + '/answer';
  return _rest2['default'].put(url, values);
}

function patchEvaluation(evaluation_id, values) {
  var url = '/api/v1/user/evaluations/' + evaluation_id;
  return _rest2['default'].patch(url, values);
}

function distributeEvaluation(evaluation_id, evaluator_ids, target_ids) {
  var url = '/api/v1/user/evaluations/' + evaluation_id + '/distribute';
  return _rest2['default'].post(url, { 'evaluator_ids': evaluator_ids, 'target_ids': target_ids });
}

function getAHDEvents(params) {
  var url = '/api/v1/user/events/ahd';
  return _rest2['default'].get(url, params);
}

function getCurriculumEvents(params) {
  var url = '/api/v1/user/events/curriculum';
  return _rest2['default'].get(url, params);
}

function getRotationEvents(params) {
  var url = '/api/v1/user/events/rotation';
  return _rest2['default'].get(url, params);
}

function getCalendarUrls() {
  var url = '/api/v1/user/events/calendar';
  return _rest2['default'].get(url);
}

exports['default'] = {
  login: login,
  logout: logout,
  getCurrentUser: getCurrentUser,
  getTodos: getTodos,
  getEvaluationById: getEvaluationById,
  saveAnswer: saveAnswer,
  patchEvaluation: patchEvaluation,
  distributeEvaluation: distributeEvaluation,
  getAHDEvents: getAHDEvents,
  getCurriculumEvents: getCurriculumEvents,
  getRotationEvents: getRotationEvents,
  getCalendarUrls: getCalendarUrls
};
module.exports = exports['default'];

},{"./core":8,"./rest":10}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _rest = require('./rest');

var _rest2 = _interopRequireDefault(_rest);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

// try to get token using refresh token; if failed,
// fallback and try to get token by client credentials
function regenerateToken() {
  return generateTokenByRefreshToken()['catch'](function (err) {
    return generateTokenByClientCredentials();
  }).then(function (response) {
    _core2['default'].publish('one45.auth.token.update', response);
    return response;
  });
}

function generateTokenByRefreshToken() {
  var refreshToken = _core2['default'].get('REFRESH_TOKEN');

  // immediately reject without attempting request if refresh token
  // is not set
  if (!refreshToken) {
    return Promise.reject(new Error('Refresh token is not set'));
  }

  return _rest2['default'].post('/public/api/v1/token/refresh', {
    refresh_token: refreshToken
  }).then(function (res) {
    _core2['default'].set('ACCESS_TOKEN', res.access_token);
    _core2['default'].set('REFRESH_TOKEN', res.refresh_token);
    return res;
  });
}

function generateTokenByClientCredentials() {
  var clientKey = _core2['default'].get('CLIENT_KEY'),
      clientSecret = _core2['default'].get('CLIENT_SECRET');

  // immediately reject without attempting request if client key or secret
  // is not set
  if (!clientKey || !clientSecret) {
    return Promise.reject(new Error('Client key or secret is not set'));
  }

  return _rest2['default'].post('/public/api/v1/token/generate', {
    client_key: clientKey,
    client_secret: clientSecret
  }).then(function (res) {
    _core2['default'].set('ACCESS_TOKEN', res.access_token);
    _core2['default'].set('REFRESH_TOKEN', res.refresh_token);
    return res;
  });
}

exports['default'] = {
  regenerateToken: regenerateToken,
  generateTokenByRefreshToken: generateTokenByRefreshToken,
  generateTokenByClientCredentials: generateTokenByClientCredentials
};
module.exports = exports['default'];

},{"./config":7,"./core":8,"./rest":10}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  tokenPath: '/public/api/v1/token/refresh'
};
module.exports = exports['default'];

},{}],8:[function(require,module,exports){
'use strict';

/**
 * Core class to manage state such as auth credentials, current users, publishing and subscribing events
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var CoreManager = (function () {
  function CoreManager() {
    var _this = this;

    _classCallCheck(this, CoreManager);

    //state variables
    var keys = ['SERVER_URL', 'CLIENT_KEY', 'CLIENT_SECRET', 'APPLICATION', 'INSTITUTION', 'ACCESS_TOKEN', 'REFRESH_TOKEN', 'CURRENT_USER'];

    //events for publisher/subscriber
    this.events = {};

    this.keys = keys;
    keys.forEach(function (key) {
      return _this[key] = null;
    });
  }

  /**
   * @param key
   * @returns {null}
   */

  _createClass(CoreManager, [{
    key: 'get',
    value: function get(key) {
      return this.isValid(key) ? this[key] : null;
    }

    /**
     * @param key
     * @param value
     */
  }, {
    key: 'set',
    value: function set(key, value) {
      if (this.isValid(key)) {
        this[key] = value;
      }
    }
  }, {
    key: 'isValid',
    value: function isValid(key) {
      return this.keys.indexOf(key) >= 0;
    }

    /**
     * Generate uuid()
     * @returns {string}
     */
  }, {
    key: 'uuid',
    value: function uuid() {
      function s(n) {
        return h(Math.random() * (1 << (n << 2)) ^ Date.now()).slice(-n);
      }
      function h(n) {
        return (n | 0).toString(16);
      }
      return [s(4) + s(4), s(4), '4' + s(3), // UUID version 4
      h(8 | Math.random() * 4) + s(3), // {8|9|A|B}xxx
      // s(4) + s(4) + s(4),
      Date.now().toString(16).slice(-10) + s(2) // Use timestamp to avoid collisions
      ].join('-');
    }

    /**
     *
     * @param event
     * @param func
     * @returns {boolean}
     */
  }, {
    key: 'subscribe',
    value: function subscribe(event, func) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      var token = this.uuid();
      this.events[event].push({
        token: token,
        func: func
      });
      return token;
    }

    /**
     * @param event
     * @param args
     */
  }, {
    key: 'publish',
    value: function publish(event, args) {

      if (!this.events[event]) {
        return false;
      }

      var subscribers = this.events[event];
      setTimeout(function () {
        var len = subscribers ? subscribers.length : 0;
        while (len--) {
          subscribers[len].func(args);
        }
      }, 0);
      return true;
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(token) {
      for (var _event in this.events) {
        if (this.events[_event]) {
          for (var i = 0, j = this.events[_event].length; i < j; i++) {
            if (this.events[_event][i].token === token) {
              this.events[_event].splice(i, 1);
              return token;
            }
          }
        }
      }
      return false;
    }
  }]);

  return CoreManager;
})();

var core = undefined;

exports['default'] = (function getCore() {
  core = core || new CoreManager();
  return core;
})();

module.exports = exports['default'];

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _One45 = require('./One45');

var _One452 = _interopRequireDefault(_One45);

exports["default"] = _One452["default"];

if (window) {
	window.One45 = _One452["default"];
}
module.exports = exports["default"];

},{"./One45":1}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var methods = {
  GET: 'GET', POST: 'POST', PUT: 'PUT', PATCH: 'PATCH', DELETE: 'DELETE',
  OPTIONS: 'OPTIONS', LINK: 'LINK', HEAD: 'HEAD'
};

var withPayload = [methods.POST, methods.PUT, methods.PATCH, methods.DELETE];

// TODO: add custom headers support
function request(url, method) {
  var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  // add query params to URL if there are any
  url = _core2['default'].get('SERVER_URL') + url + (opts.params instanceof Object ? _serializeParams(opts.params) : '');

  method = method.toUpperCase();
  if (!methods[method]) {
    return console.error('Unsupported http method: ' + method);
  }

  var makePromise = function makePromise() {
    return new Promise(function (resolve, reject) {
      var req = new XMLHttpRequest(),
          token = _core2['default'].get('ACCESS_TOKEN');

      req.open(method, url, true);

      // add access token to params if one is set
      if (token) {
        req.setRequestHeader('Authorization', 'Bearer ' + token);
      }

      // resolve with response if status code indicates success,
      // otherwise reject with error
      // TODO: handle non-JSON response bodies
      req.onload = function () {
        if (req.status >= 200 && req.status < 300) {
          if (req.response.length > 0) {
            try {
              resolve(JSON.parse(req.response));
            } catch (e) {
              reject(_createHttpError(req));
            }
          } else {
            resolve(null);
          }
        } else {
          reject(_createHttpError(req));
        }
      };

      // reject with error on network errors
      req.onerror = function () {
        return reject(new Error('Network Error'));
      };

      // send the request, including data if method is PUT, PATCH, or POST
      if (withPayload.indexOf(method) >= 0 && opts.data instanceof Object) {
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(opts.data));
      } else {
        req.send();
      }
    });
  };

  // catch any 401 errors, try to regenerate token and retry (once max)
  return makePromise().then(function (response) {
    return response;
  }, function (err) {
    return err.status != 401 ? Promise.reject(err) : _auth2['default'].regenerateToken().then(function () {
      return makePromise();
    });
  });
}

request.get = function (url) {
  var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  return request(url, methods.GET, { params: params });
};
request.del = function (url) {
  var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  return request(url, methods.DELETE, { data: data });
};
request.post = function (url) {
  var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  return request(url, methods.POST, { data: data });
};
request.patch = function (url) {
  var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  return request(url, methods.PATCH, { data: data });
};
request.put = function (url) {
  var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  return request(url, methods.PUT, { data: data });
};

function _serializeParams(params) {
  var str = [];

  for (var prop in params) {
    if (params.hasOwnProperty(prop)) {
      var key = prop,
          value = params[prop];

      if (typeof value !== "undefined") {
        if (value instanceof Array || value instanceof Object) {
          str = str.concat(_serializeObject(key, value));
        } else {
          str.push(key + "=" + encodeURIComponent(value));
        }
      }
    }
  }

  return str.length > 0 ? '?' + str.join("&") : '';
}

// export serialization fn for testing
request._serializeParams = _serializeParams;

function _serializeObject(name, object) {
  var str_arr = [];
  for (var prop in object) {
    if (object.hasOwnProperty(prop)) {
      var key = prop,
          value = object[prop];
      //recursively add object and arrays into parameters
      if (value instanceof Array || value instanceof Object) {
        var param_name = name + '[' + key + ']';
        str_arr = str_arr.concat(_serializeObject(param_name, value));
      } else {
        if (typeof value !== "undefined" && value !== null) {
          str_arr.push(name + '[' + key + ']=' + encodeURIComponent(value));
        } else {
          str_arr.push(name + '[' + key + ']=');
        }
      }
    }
  }
  return str_arr;
}

function _createHttpError(req) {
  var err = new Error(req.statusText);
  err.status = req.status;
  try {
    err.response = JSON.parse(req.response);
  } catch (e) {
    err.response = req.response;
  }
  return err;
}

exports['default'] = request;
module.exports = exports['default'];

},{"./auth":6,"./core":8}]},{},[9])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvc2Vhbi9wcm9qZWN0cy9vbmU0NS1qcy1zZGsvc3JjL09uZTQ1LmpzIiwiL1VzZXJzL3NlYW4vcHJvamVjdHMvb25lNDUtanMtc2RrL3NyYy9PbmU0NUZvcm0uanMiLCIvVXNlcnMvc2Vhbi9wcm9qZWN0cy9vbmU0NS1qcy1zZGsvc3JjL09uZTQ1SW5zdGl0dXRpb24uanMiLCIvVXNlcnMvc2Vhbi9wcm9qZWN0cy9vbmU0NS1qcy1zZGsvc3JjL09uZTQ1Um90YXRpb24uanMiLCIvVXNlcnMvc2Vhbi9wcm9qZWN0cy9vbmU0NS1qcy1zZGsvc3JjL09uZTQ1VXNlci5qcyIsIi9Vc2Vycy9zZWFuL3Byb2plY3RzL29uZTQ1LWpzLXNkay9zcmMvYXV0aC5qcyIsIi9Vc2Vycy9zZWFuL3Byb2plY3RzL29uZTQ1LWpzLXNkay9zcmMvY29uZmlnLmpzIiwiL1VzZXJzL3NlYW4vcHJvamVjdHMvb25lNDUtanMtc2RrL3NyYy9jb3JlLmpzIiwiL1VzZXJzL3NlYW4vcHJvamVjdHMvb25lNDUtanMtc2RrL3NyYy9pbmRleC5qcyIsIi9Vc2Vycy9zZWFuL3Byb2plY3RzL29uZTQ1LWpzLXNkay9zcmMvcmVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7O29CQUVJLFFBQVE7Ozs7b0JBQ1IsUUFBUTs7OztvQkFDUixRQUFROzs7O3lCQUNSLGFBQWE7Ozs7eUJBQ2IsYUFBYTs7OztnQ0FDTixvQkFBb0I7Ozs7NkJBQ3ZCLGlCQUFpQjs7Ozs7Ozs7SUFLakIsS0FBSztBQUViLFdBRlEsS0FBSyxHQUVWOzBCQUZLLEtBQUs7O0FBR3RCLFFBQUksQ0FBQyxJQUFJLG9CQUFPLENBQUM7QUFDakIsUUFBSSxDQUFDLElBQUksb0JBQU8sQ0FBQztBQUNqQixRQUFJLENBQUMsSUFBSSxvQkFBTyxD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QUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7R0FDekMsQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUNWLE9BQUcsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQztHQUM3QjtBQUNELFNBQU8sR0FBRyxDQUFDO0NBQ1o7O3FCQUVjLE9BQU8iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBjb3JlIGZyb20gJy4vY29yZSc7XG5pbXBvcnQgcmVzdCBmcm9tICcuL3Jlc3QnO1xuaW1wb3J0IGF1dGggZnJvbSAnLi9hdXRoJztcbmltcG9ydCB1c2VyIGZyb20gJy4vT25lNDVVc2VyJztcbmltcG9ydCBmb3JtIGZyb20gJy4vT25lNDVGb3JtJztcbmltcG9ydCBpbnN0aXR1dGlvbiBmcm9tICcuL09uZTQ1SW5zdGl0dXRpb24nO1xuaW1wb3J0IHJvdGF0aW9uIGZyb20gJy4vT25lNDVSb3RhdGlvbic7XG5cbi8qKlxuICogV3JhcHBlciBjbGFzcyBmb3IgYWxsIG9mIG9uZTQ1IHNlcnZpY2VzIGFuZCBjb25maWd1cmF0aW9uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9uZTQ1IHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLkNvcmUgPSBjb3JlO1xuICAgIHRoaXMuUmVzdCA9IHJlc3Q7XG4gICAgdGhpcy5BdXRoID0gYXV0aDtcbiAgICB0aGlzLlVzZXIgPSB1c2VyO1xuICAgIHRoaXMuRm9ybSA9IGZvcm07XG4gICAgdGhpcy5JbnN0aXR1dGlvbiA9IGluc3RpdHV0aW9uO1xuICAgIHRoaXMuUm90YXRpb24gPSByb3RhdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gc2VydmVyVXJsIC0gYmFzZSB1cmwgZW5kIHBvaW50IGZvciBtYWtpbmcgYXBpIHJlcXVlc3RzXG4gICAqIEBwYXJhbSBjbGllbnRLZXkgLSBhcHBsaWNhdGlvbiBrZXlcbiAgICogQHBhcmFtIGNvbmZpZyAtIGtleSB2YWx1ZSBhcnJheSBvZiBwYXJhbWV0ZXJzIHRoYXQgY2FuIGJlIHNldCBpZS4gQ1VSUkVOVF9VU0VSLCBSRUZSRVNIX1RPS0VOLCBBQ0NFU1NfVE9LRU5cbiAgICovXG4gIGluaXRpYWxpemUoc2VydmVyVXJsID0gJycsIGNsaWVudEtleSA9ICcnLCBjb25maWdzID0gbnVsbCkge1xuICAgIHRoaXMuQ29yZS5zZXQoJ1NFUlZFUl9VUkwnLCBzZXJ2ZXJVcmwpO1xuICAgIHRoaXMuQ29yZS5zZXQoJ0NMSUVOVF9LRVknLCBjbGllbnRLZXkpO1xuXG4gICAgaWYgKGNvbmZpZ3MgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIGZvciAobGV0IGtleSBpbiBjb25maWdzKSB7XG4gICAgICAgIHRoaXMuQ29yZS5zZXQoa2V5LCBjb25maWdzW2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICByZXR1cm4gdGhpcy5SZXN0LmdldCgnL3B1YmxpYy9hcGkvdjEvYXBwbGljYXRpb24nLCB7Y2xpZW50X2tleTogdGhpcy5Db3JlLmdldCgnQ0xJRU5UX0tFWScpfSkudGhlbihcbiAgICAgIHJlc3AgPT4ge1xuICAgICAgICB0aGlzLkNvcmUuc2V0KCdBUFBMSUNBVElPTicsIHJlc3ApO1xuICAgICAgICByZXR1cm4gdGhpcy5JbnN0aXR1dGlvbi5nZXRDdXJyZW50SW5zdGl0dXRpb24oKTtcbiAgICAgICAgfVxuICAgICk7XG4gIH1cbiAgXG4gIFxuXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBjb3JlIGZyb20gJy4vY29yZSc7XG5pbXBvcnQgcmVzdCBmcm9tICcuL3Jlc3QnO1xuXG5mdW5jdGlvbiBnZXRCeUlkKGZvcm1faWQpIHtcbiAgcmV0dXJuIHJlc3QuZ2V0KCcvYXBpL3YxL2Zvcm1zLycgKyBmb3JtX2lkKTtcbn1cblxuZnVuY3Rpb24gZ2V0UXVlc3Rpb25zKGZvcm1faWQpIHtcbiAgIHJldHVybiByZXN0LmdldCgnL2FwaS92MS9mb3Jtcy8nICsgZm9ybV9pZCArICcvcXVlc3Rpb25zJyk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQge1xuICBnZXRCeUlkLFxuICBnZXRRdWVzdGlvbnNcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBjb3JlIGZyb20gJy4vY29yZSc7XG5pbXBvcnQgcmVzdCBmcm9tICcuL3Jlc3QnO1xuXG5mdW5jdGlvbiBnZXRDdXJyZW50SW5zdGl0dXRpb24oKSB7XG4gIHJldHVybiByZXN0LmdldCgnL3B1YmxpYy9hcGkvdjEvaW5zdGl0dXRpb24nKVxuICAudGhlbihyZXMgPT4ge1xuICAgIGNvcmUuc2V0KCdJTlNUSVRVVElPTicsIHJlcyk7XG4gICAgcmV0dXJuIHJlcztcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldFByZWZlcmVuY2VzKHBhcmFtcykge1xuICByZXR1cm4gcmVzdC5nZXQoJy9hcGkvdjEvaW5zdGl0dXRpb24vcHJlZmVyZW5jZXMnLCBwYXJhbXMpO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0Q3VycmVudEluc3RpdHV0aW9uLFxuICBnZXRQcmVmZXJlbmNlc1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGNvcmUgZnJvbSAnLi9jb3JlJztcbmltcG9ydCByZXN0IGZyb20gJy4vcmVzdCc7XG5cbmZ1bmN0aW9uIGdldEJ5SWQocm90YXRpb25faWQpIHtcbiAgcmV0dXJuIHJlc3QuZ2V0KCcvYXBpL3YxL3JvdGF0aW9ucy8nICsgcm90YXRpb25faWQpO1xufVxuXG5mdW5jdGlvbiBnZXRCZXN0R3Vlc3NMaXN0KHJvdGF0aW9uX2lkKSB7XG4gICByZXR1cm4gcmVzdC5nZXQoJy9hcGkvdjEvcm90YXRpb25zLycgKyByb3RhdGlvbl9pZCArICcvYmVzdGd1ZXNzbGlzdCcpO1xufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgZ2V0QnlJZCxcbiAgZ2V0QmVzdEd1ZXNzTGlzdFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGNvcmUgZnJvbSAnLi9jb3JlJztcbmltcG9ydCByZXN0IGZyb20gJy4vcmVzdCc7XG5cbmZ1bmN0aW9uIGxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZCwgbW9kZSkge1xuICByZXR1cm4gcmVzdC5wb3N0KCcvcHVibGljL2FwaS92MS90b2tlbi9sb2dpbicsIHtcbiAgICB1c2VybmFtZSxcbiAgICBwYXNzd29yZCxcbiAgICBjbGllbnRfa2V5OiBjb3JlLmdldCgnQ0xJRU5UX0tFWScpLFxuICAgIG1vZGVcbiAgfSkudGhlbihyZXMgPT4ge1xuICAgIGNvcmUuc2V0KCdBQ0NFU1NfVE9LRU4nLCByZXMuYWNjZXNzX3Rva2VuKTtcbiAgICBjb3JlLnNldCgnUkVGUkVTSF9UT0tFTicsIHJlcy5yZWZyZXNoX3Rva2VuKTtcbiAgICBjb3JlLnNldCgnQ1VSUkVOVF9VU0VSJywgcmVzLnVzZXIpO1xuICAgIHJldHVybiByZXM7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRvZG8gOiBTaG91bGQgcmV0dXJuIHByb21pc2UgYW5kIGludmFsaWRhdGUgdG9rZW4gdXNpbmcgaW52YWxpZGF0ZSBhcGlcbiAqL1xuZnVuY3Rpb24gbG9nb3V0KCkge1xuICAgIHJlc3QuZGVsKCcvcHVibGljL2FwaS92MS90b2tlbi9pbnZhbGlkYXRlJyAse1wiYWNjZXNzX3Rva2VuXCI6IGNvcmUuZ2V0KCdBQ0NFU1NfVE9LRU4nKX0pO1xuXG4gICAgY29yZS5zZXQoJ0FDQ0VTU19UT0tFTicsIG51bGwpO1xuICAgIGNvcmUuc2V0KCdSRUZSRVNIX1RPS0VOJywgbnVsbCk7XG4gICAgY29yZS5zZXQoJ0NVUlJFTlRfVVNFUicsIG51bGwpO1xufVxuXG5mdW5jdGlvbiBnZXRDdXJyZW50VXNlcigpIHtcbiAgcmV0dXJuIGNvcmUuZ2V0KCdDVVJSRU5UX1VTRVInKTtcbn1cblxuZnVuY3Rpb24gZ2V0VG9kb3MocGFyYW1zKSB7XG4gIHJldHVybiByZXN0LmdldCgnL2FwaS92MS91c2VyL3RvZG9zJywgcGFyYW1zKTtcbn1cblxuZnVuY3Rpb24gZ2V0RXZhbHVhdGlvbkJ5SWQoaWQpIHtcbiAgcmV0dXJuIHJlc3QuZ2V0KCcvYXBpL3YxL3VzZXIvZXZhbHVhdGlvbnMvJyArIGlkKTtcbn1cblxuZnVuY3Rpb24gc2F2ZUFuc3dlcihldmFsdWF0aW9uX2lkLCBxdWVzdGlvbl9pZCwgdmFsdWVzKSB7XG4gIGxldCB1cmwgPSAnL2FwaS92MS91c2VyL2V2YWx1YXRpb25zLycgKyBldmFsdWF0aW9uX2lkICsgJy9xdWVzdGlvbi8nICsgcXVlc3Rpb25faWQgKyAnL2Fuc3dlcic7XG4gIHJldHVybiByZXN0LnB1dCh1cmwsIHZhbHVlcyk7XG59XG5cbmZ1bmN0aW9uIHBhdGNoRXZhbHVhdGlvbihldmFsdWF0aW9uX2lkLCB2YWx1ZXMpIHtcbiAgbGV0IHVybCA9ICcvYXBpL3YxL3VzZXIvZXZhbHVhdGlvbnMvJyArIGV2YWx1YXRpb25faWQ7XG4gIHJldHVybiByZXN0LnBhdGNoKHVybCwgdmFsdWVzKTtcbn1cblxuZnVuY3Rpb24gZGlzdHJpYnV0ZUV2YWx1YXRpb24oZXZhbHVhdGlvbl9pZCwgZXZhbHVhdG9yX2lkcywgdGFyZ2V0X2lkcykge1xuICBsZXQgdXJsID0gJy9hcGkvdjEvdXNlci9ldmFsdWF0aW9ucy8nICsgZXZhbHVhdGlvbl9pZCArICcvZGlzdHJpYnV0ZSc7XG4gIHJldHVybiByZXN0LnBvc3QodXJsLCB7J2V2YWx1YXRvcl9pZHMnOiBldmFsdWF0b3JfaWRzLCAndGFyZ2V0X2lkcyc6IHRhcmdldF9pZHN9KTtcbn1cblxuZnVuY3Rpb24gZ2V0QUhERXZlbnRzKHBhcmFtcykge1xuICBsZXQgdXJsID0gJy9hcGkvdjEvdXNlci9ldmVudHMvYWhkJztcbiAgcmV0dXJuIHJlc3QuZ2V0KHVybCwgcGFyYW1zKTtcbn1cblxuZnVuY3Rpb24gZ2V0Q3VycmljdWx1bUV2ZW50cyhwYXJhbXMpIHtcbiAgbGV0IHVybCA9ICcvYXBpL3YxL3VzZXIvZXZlbnRzL2N1cnJpY3VsdW0nO1xuICByZXR1cm4gcmVzdC5nZXQodXJsLCBwYXJhbXMpO1xufVxuXG5mdW5jdGlvbiBnZXRSb3RhdGlvbkV2ZW50cyhwYXJhbXMpIHtcbiAgbGV0IHVybCA9ICcvYXBpL3YxL3VzZXIvZXZlbnRzL3JvdGF0aW9uJztcbiAgcmV0dXJuIHJlc3QuZ2V0KHVybCwgcGFyYW1zKTtcbn1cblxuZnVuY3Rpb24gZ2V0Q2FsZW5kYXJVcmxzKCkge1xuICBsZXQgdXJsID0gJy9hcGkvdjEvdXNlci9ldmVudHMvY2FsZW5kYXInO1xuICByZXR1cm4gcmVzdC5nZXQodXJsKTtcbn1cblxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGxvZ2luLFxuICBsb2dvdXQsXG4gIGdldEN1cnJlbnRVc2VyLFxuICBnZXRUb2RvcyxcbiAgZ2V0RXZhbHVhdGlvbkJ5SWQsXG4gIHNhdmVBbnN3ZXIsXG4gIHBhdGNoRXZhbHVhdGlvbixcbiAgZGlzdHJpYnV0ZUV2YWx1YXRpb24sXG4gIGdldEFIREV2ZW50cyxcbiAgZ2V0Q3VycmljdWx1bUV2ZW50cyxcbiAgZ2V0Um90YXRpb25FdmVudHMsXG4gIGdldENhbGVuZGFyVXJsc1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGNvcmUgZnJvbSAnLi9jb3JlJztcbmltcG9ydCByZXN0IGZyb20gJy4vcmVzdCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcblxuLy8gdHJ5IHRvIGdldCB0b2tlbiB1c2luZyByZWZyZXNoIHRva2VuOyBpZiBmYWlsZWQsXG4vLyBmYWxsYmFjayBhbmQgdHJ5IHRvIGdldCB0b2tlbiBieSBjbGllbnQgY3JlZGVudGlhbHNcbmZ1bmN0aW9uIHJlZ2VuZXJhdGVUb2tlbigpIHtcbiAgcmV0dXJuIGdlbmVyYXRlVG9rZW5CeVJlZnJlc2hUb2tlbigpLmNhdGNoKGVyciA9PiB7XG4gICAgIHJldHVybiBnZW5lcmF0ZVRva2VuQnlDbGllbnRDcmVkZW50aWFscygpO30pXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgY29yZS5wdWJsaXNoKCdvbmU0NS5hdXRoLnRva2VuLnVwZGF0ZScsIHJlc3BvbnNlKTtcbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0pO1xufVxuICBcbmZ1bmN0aW9uIGdlbmVyYXRlVG9rZW5CeVJlZnJlc2hUb2tlbigpIHtcbiAgbGV0IHJlZnJlc2hUb2tlbiA9IGNvcmUuZ2V0KCdSRUZSRVNIX1RPS0VOJyk7XG5cbiAgLy8gaW1tZWRpYXRlbHkgcmVqZWN0IHdpdGhvdXQgYXR0ZW1wdGluZyByZXF1ZXN0IGlmIHJlZnJlc2ggdG9rZW5cbiAgLy8gaXMgbm90IHNldFxuICBpZiAoIXJlZnJlc2hUb2tlbikge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ1JlZnJlc2ggdG9rZW4gaXMgbm90IHNldCcpKTtcbiAgfVxuXG4gIHJldHVybiByZXN0LnBvc3QoJy9wdWJsaWMvYXBpL3YxL3Rva2VuL3JlZnJlc2gnLCB7XG4gICAgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuXG4gIH0pLnRoZW4ocmVzID0+IHtcbiAgICBjb3JlLnNldCgnQUNDRVNTX1RPS0VOJywgcmVzLmFjY2Vzc190b2tlbik7XG4gICAgY29yZS5zZXQoJ1JFRlJFU0hfVE9LRU4nLCByZXMucmVmcmVzaF90b2tlbik7XG4gICAgcmV0dXJuIHJlcztcbiAgfSk7XG59XG4gIFxuZnVuY3Rpb24gZ2VuZXJhdGVUb2tlbkJ5Q2xpZW50Q3JlZGVudGlhbHMoKSB7XG4gIGxldCBjbGllbnRLZXkgPSBjb3JlLmdldCgnQ0xJRU5UX0tFWScpLFxuICAgICAgY2xpZW50U2VjcmV0ID0gY29yZS5nZXQoJ0NMSUVOVF9TRUNSRVQnKTtcblxuICAvLyBpbW1lZGlhdGVseSByZWplY3Qgd2l0aG91dCBhdHRlbXB0aW5nIHJlcXVlc3QgaWYgY2xpZW50IGtleSBvciBzZWNyZXRcbiAgLy8gaXMgbm90IHNldFxuICBpZiAoIWNsaWVudEtleSB8fCAhY2xpZW50U2VjcmV0KSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignQ2xpZW50IGtleSBvciBzZWNyZXQgaXMgbm90IHNldCcpKTtcbiAgfVxuXG4gIHJldHVybiByZXN0LnBvc3QoJy9wdWJsaWMvYXBpL3YxL3Rva2VuL2dlbmVyYXRlJywge1xuICAgIGNsaWVudF9rZXk6IGNsaWVudEtleSxcbiAgICBjbGllbnRfc2VjcmV0OiBjbGllbnRTZWNyZXRcbiAgfSkudGhlbihyZXMgPT4ge1xuICAgIGNvcmUuc2V0KCdBQ0NFU1NfVE9LRU4nLCByZXMuYWNjZXNzX3Rva2VuKTtcbiAgICBjb3JlLnNldCgnUkVGUkVTSF9UT0tFTicsIHJlcy5yZWZyZXNoX3Rva2VuKTtcbiAgICByZXR1cm4gcmVzO1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICByZWdlbmVyYXRlVG9rZW4sXG4gIGdlbmVyYXRlVG9rZW5CeVJlZnJlc2hUb2tlbixcbiAgZ2VuZXJhdGVUb2tlbkJ5Q2xpZW50Q3JlZGVudGlhbHNcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdG9rZW5QYXRoOiAnL3B1YmxpYy9hcGkvdjEvdG9rZW4vcmVmcmVzaCdcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ29yZSBjbGFzcyB0byBtYW5hZ2Ugc3RhdGUgc3VjaCBhcyBhdXRoIGNyZWRlbnRpYWxzLCBjdXJyZW50IHVzZXJzLCBwdWJsaXNoaW5nIGFuZCBzdWJzY3JpYmluZyBldmVudHNcbiAqL1xuY2xhc3MgQ29yZU1hbmFnZXIge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgLy9zdGF0ZSB2YXJpYWJsZXNcbiAgICBsZXQga2V5cyA9IFtcbiAgICAgICdTRVJWRVJfVVJMJywgJ0NMSUVOVF9LRVknLCAnQ0xJRU5UX1NFQ1JFVCcsJ0FQUExJQ0FUSU9OJywnSU5TVElUVVRJT04nLFxuICAgICAgJ0FDQ0VTU19UT0tFTicsICdSRUZSRVNIX1RPS0VOJywgJ0NVUlJFTlRfVVNFUidcbiAgICBdO1xuXG4gICAgLy9ldmVudHMgZm9yIHB1Ymxpc2hlci9zdWJzY3JpYmVyXG4gICAgdGhpcy5ldmVudHMgPSB7fTtcblxuICAgIHRoaXMua2V5cyA9IGtleXM7XG4gICAga2V5cy5mb3JFYWNoKGtleSA9PiB0aGlzW2tleV0gPSBudWxsKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ga2V5XG4gICAqIEByZXR1cm5zIHtudWxsfVxuICAgKi9cbiAgZ2V0KGtleSkge1xuICAgIHJldHVybiB0aGlzLmlzVmFsaWQoa2V5KSA/IHRoaXNba2V5XSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGtleVxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHNldChrZXksIHZhbHVlKSB7XG4gICAgaWYodGhpcy5pc1ZhbGlkKGtleSkpIHtcbiAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIGlzVmFsaWQoa2V5KSB7XG4gICAgcmV0dXJuIHRoaXMua2V5cy5pbmRleE9mKGtleSkgPj0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSB1dWlkKClcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHV1aWQoKSB7XG4gICAgZnVuY3Rpb24gcyhuKSB7IHJldHVybiBoKChNYXRoLnJhbmRvbSgpICogKDE8PChuPDwyKSkpXkRhdGUubm93KCkpLnNsaWNlKC1uKTsgfVxuICAgIGZ1bmN0aW9uIGgobikgeyByZXR1cm4gKG58MCkudG9TdHJpbmcoMTYpOyB9XG4gICAgcmV0dXJuICBbXG4gICAgICBzKDQpICsgcyg0KSwgcyg0KSxcbiAgICAgICc0JyArIHMoMyksICAgICAgICAgICAgICAgICAgICAvLyBVVUlEIHZlcnNpb24gNFxuICAgICAgaCg4fChNYXRoLnJhbmRvbSgpKjQpKSArIHMoMyksIC8vIHs4fDl8QXxCfXh4eFxuICAgICAgLy8gcyg0KSArIHMoNCkgKyBzKDQpLFxuICAgICAgRGF0ZS5ub3coKS50b1N0cmluZygxNikuc2xpY2UoLTEwKSArIHMoMikgLy8gVXNlIHRpbWVzdGFtcCB0byBhdm9pZCBjb2xsaXNpb25zXG4gICAgXS5qb2luKCctJyk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqIEBwYXJhbSBmdW5jXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgc3Vic2NyaWJlKGV2ZW50LCBmdW5jKSB7XG4gICAgaWYgKCF0aGlzLmV2ZW50c1tldmVudF0pIHtcbiAgICAgdGhpcy5ldmVudHNbZXZlbnRdID0gW107XG4gICAgfVxuICAgIGxldCB0b2tlbiA9IHRoaXMudXVpZCgpO1xuICAgIHRoaXMuZXZlbnRzW2V2ZW50XS5wdXNoKHtcbiAgICAgIHRva2VuOiB0b2tlbixcbiAgICAgIGZ1bmM6IGZ1bmNcbiAgICB9KTtcbiAgICByZXR1cm4gdG9rZW47XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqIEBwYXJhbSBhcmdzXG4gICAqL1xuICBwdWJsaXNoKGV2ZW50LCBhcmdzKSB7XG5cbiAgICBpZiAoIXRoaXMuZXZlbnRzW2V2ZW50XSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGxldCBzdWJzY3JpYmVycyA9IHRoaXMuZXZlbnRzW2V2ZW50XTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgbGV0IGxlbiA9IHN1YnNjcmliZXJzID8gc3Vic2NyaWJlcnMubGVuZ3RoIDogMDtcbiAgICAgIHdoaWxlIChsZW4tLSkge1xuICAgICAgICBzdWJzY3JpYmVyc1tsZW5dLmZ1bmMoYXJncyk7XG4gICAgICB9XG4gICAgfSwgMCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICB1bnN1YnNjcmliZSh0b2tlbikge1xuICAgIGZvciAobGV0IGV2ZW50IGluIHRoaXMuZXZlbnRzKSB7XG4gICAgICBpZiAodGhpcy5ldmVudHNbZXZlbnRdKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBqID0gdGhpcy5ldmVudHNbZXZlbnRdLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgICAgIGlmICh0aGlzLmV2ZW50c1tldmVudF1baV0udG9rZW4gPT09IHRva2VuKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudF0uc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxubGV0IGNvcmU7XG5cbmV4cG9ydCBkZWZhdWx0IChmdW5jdGlvbiBnZXRDb3JlKCkge1xuICBjb3JlID0gY29yZSB8fCBuZXcgQ29yZU1hbmFnZXIoKTtcbiAgcmV0dXJuIGNvcmU7XG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBPbmU0NSBmcm9tICcuL09uZTQ1JztcbmV4cG9ydCBkZWZhdWx0IE9uZTQ1O1xuXG5pZih3aW5kb3cpIHtcblx0d2luZG93Lk9uZTQ1ID0gT25lNDU7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBjb3JlIGZyb20gJy4vY29yZSc7XG5pbXBvcnQgYXV0aCBmcm9tICcuL2F1dGgnO1xuXG5jb25zdCBtZXRob2RzID0ge1xuICBHRVQ6ICdHRVQnLCBQT1NUOiAnUE9TVCcsIFBVVDogJ1BVVCcsIFBBVENIOiAnUEFUQ0gnLCBERUxFVEU6ICdERUxFVEUnLFxuICBPUFRJT05TOiAnT1BUSU9OUycsIExJTks6ICdMSU5LJywgSEVBRDogJ0hFQUQnXG59O1xuXG5jb25zdCB3aXRoUGF5bG9hZCA9IFsgbWV0aG9kcy5QT1NULCBtZXRob2RzLlBVVCwgbWV0aG9kcy5QQVRDSCwgbWV0aG9kcy5ERUxFVEUgXTtcblxuLy8gVE9ETzogYWRkIGN1c3RvbSBoZWFkZXJzIHN1cHBvcnRcbmZ1bmN0aW9uIHJlcXVlc3QodXJsLCBtZXRob2QsIG9wdHM9e30pIHtcbiAgLy8gYWRkIHF1ZXJ5IHBhcmFtcyB0byBVUkwgaWYgdGhlcmUgYXJlIGFueVxuICB1cmwgPSBjb3JlLmdldCgnU0VSVkVSX1VSTCcpICsgdXJsICsgKChvcHRzLnBhcmFtcyBpbnN0YW5jZW9mIE9iamVjdCkgPyBfc2VyaWFsaXplUGFyYW1zKG9wdHMucGFyYW1zKSA6ICcnKTtcblxuICBtZXRob2QgPSBtZXRob2QudG9VcHBlckNhc2UoKTtcbiAgaWYgKCFtZXRob2RzW21ldGhvZF0pIHtcbiAgICByZXR1cm4gY29uc29sZS5lcnJvcignVW5zdXBwb3J0ZWQgaHR0cCBtZXRob2Q6ICcgKyBtZXRob2QpO1xuICB9XG5cbiAgbGV0IG1ha2VQcm9taXNlID0gKCkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGxldCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSxcbiAgICB0b2tlbiA9IGNvcmUuZ2V0KCdBQ0NFU1NfVE9LRU4nKTtcblxuICAgIHJlcS5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcblxuICAgIC8vIGFkZCBhY2Nlc3MgdG9rZW4gdG8gcGFyYW1zIGlmIG9uZSBpcyBzZXRcbiAgICBpZiAodG9rZW4pIHsgcmVxLnNldFJlcXVlc3RIZWFkZXIoJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyICcgKyB0b2tlbik7IH1cblxuICAgIC8vIHJlc29sdmUgd2l0aCByZXNwb25zZSBpZiBzdGF0dXMgY29kZSBpbmRpY2F0ZXMgc3VjY2VzcyxcbiAgICAvLyBvdGhlcndpc2UgcmVqZWN0IHdpdGggZXJyb3JcbiAgICAvLyBUT0RPOiBoYW5kbGUgbm9uLUpTT04gcmVzcG9uc2UgYm9kaWVzXG4gICAgcmVxLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGlmKHJlcS5zdGF0dXMgPj0gMjAwICYmIHJlcS5zdGF0dXMgPCAzMDApe1xuICAgICAgICBpZiAocmVxLnJlc3BvbnNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzb2x2ZShKU09OLnBhcnNlKHJlcS5yZXNwb25zZSkpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJlamVjdChfY3JlYXRlSHR0cEVycm9yKHJlcSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3QoX2NyZWF0ZUh0dHBFcnJvcihyZXEpKTtcbiAgICAgIH19O1xuXG4gICAgLy8gcmVqZWN0IHdpdGggZXJyb3Igb24gbmV0d29yayBlcnJvcnNcbiAgICByZXEub25lcnJvciA9ICgpID0+IHJlamVjdChuZXcgRXJyb3IoJ05ldHdvcmsgRXJyb3InKSk7XG5cbiAgICAvLyBzZW5kIHRoZSByZXF1ZXN0LCBpbmNsdWRpbmcgZGF0YSBpZiBtZXRob2QgaXMgUFVULCBQQVRDSCwgb3IgUE9TVFxuICAgIGlmICgod2l0aFBheWxvYWQuaW5kZXhPZihtZXRob2QpID49IDApICYmIChvcHRzLmRhdGEgaW5zdGFuY2VvZiBPYmplY3QpKSB7XG4gICAgICByZXEuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgICByZXEuc2VuZChKU09OLnN0cmluZ2lmeShvcHRzLmRhdGEpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxLnNlbmQoKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGNhdGNoIGFueSA0MDEgZXJyb3JzLCB0cnkgdG8gcmVnZW5lcmF0ZSB0b2tlbiBhbmQgcmV0cnkgKG9uY2UgbWF4KVxuICByZXR1cm4gbWFrZVByb21pc2UoKS50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLCBlcnIgPT5cbiAgICAgIChlcnIuc3RhdHVzICE9IDQwMSkgPyBQcm9taXNlLnJlamVjdChlcnIpXG4gICAgICAgIDogYXV0aC5yZWdlbmVyYXRlVG9rZW4oKS50aGVuKCgpID0+IG1ha2VQcm9taXNlKCkpXG4gICk7XG59XG5cbnJlcXVlc3QuZ2V0ICAgPSAodXJsLCBwYXJhbXM9e30pID0+IHJlcXVlc3QodXJsLCBtZXRob2RzLkdFVCwgICAgeyBwYXJhbXMgfSk7XG5yZXF1ZXN0LmRlbCAgID0gKHVybCwgZGF0YT17fSkgICA9PiByZXF1ZXN0KHVybCwgbWV0aG9kcy5ERUxFVEUsIHsgZGF0YSB9KTtcbnJlcXVlc3QucG9zdCAgPSAodXJsLCBkYXRhPXt9KSAgID0+IHJlcXVlc3QodXJsLCBtZXRob2RzLlBPU1QsICAgeyBkYXRhIH0pO1xucmVxdWVzdC5wYXRjaCA9ICh1cmwsIGRhdGE9e30pICAgPT4gcmVxdWVzdCh1cmwsIG1ldGhvZHMuUEFUQ0gsICB7IGRhdGEgfSk7XG5yZXF1ZXN0LnB1dCAgID0gKHVybCwgZGF0YT17fSkgICA9PiByZXF1ZXN0KHVybCwgbWV0aG9kcy5QVVQsICAgIHsgZGF0YSB9KTtcblxuXG5mdW5jdGlvbiBfc2VyaWFsaXplUGFyYW1zKHBhcmFtcykge1xuICBsZXQgc3RyID0gW107XG5cbiAgZm9yKGxldCBwcm9wIGluIHBhcmFtcykge1xuICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgIGxldCBrZXkgPSBwcm9wLFxuICAgICAgICAgIHZhbHVlID0gcGFyYW1zW3Byb3BdO1xuICAgICAgICBcbiAgICAgIGlmKHR5cGVvZiB2YWx1ZSAhPT0gXCJ1bmRlZmluZWRcIilcbiAgICAgIHtcbiAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgfHwgdmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICBzdHIgPSBzdHIuY29uY2F0KF9zZXJpYWxpemVPYmplY3Qoa2V5LCB2YWx1ZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0ci5wdXNoKGtleSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gKHN0ci5sZW5ndGggPiAwKSA/ICgnPycgKyBzdHIuam9pbihcIiZcIikpIDogJyc7XG59XG5cbi8vIGV4cG9ydCBzZXJpYWxpemF0aW9uIGZuIGZvciB0ZXN0aW5nXG5yZXF1ZXN0Ll9zZXJpYWxpemVQYXJhbXMgPSBfc2VyaWFsaXplUGFyYW1zO1xuXG5mdW5jdGlvbiBfc2VyaWFsaXplT2JqZWN0KG5hbWUsIG9iamVjdCkge1xuICBsZXQgc3RyX2FyciA9IFtdO1xuICBmb3IobGV0IHByb3AgaW4gb2JqZWN0KSB7XG4gICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgbGV0IGtleSA9IHByb3AsXG4gICAgICAgICAgdmFsdWUgPSBvYmplY3RbcHJvcF07XG4gICAgICAvL3JlY3Vyc2l2ZWx5IGFkZCBvYmplY3QgYW5kIGFycmF5cyBpbnRvIHBhcmFtZXRlcnNcbiAgICAgIGlmKHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgfHwgdmFsdWUgaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgICB7XG4gICAgICAgIGxldCBwYXJhbV9uYW1lID0gbmFtZSArICdbJyArIGtleSArICddJztcbiAgICAgICAgc3RyX2FyciA9IHN0cl9hcnIuY29uY2F0KF9zZXJpYWxpemVPYmplY3QocGFyYW1fbmFtZSwgdmFsdWUpKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZih0eXBlb2YgdmFsdWUgIT09IFwidW5kZWZpbmVkXCIgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICBzdHJfYXJyLnB1c2gobmFtZSArICdbJyArIGtleSArICddPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzdHJfYXJyLnB1c2gobmFtZSArICdbJyArIGtleSArICddPScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBzdHJfYXJyO1xufVxuXG5mdW5jdGlvbiBfY3JlYXRlSHR0cEVycm9yKHJlcSkge1xuICBsZXQgZXJyID0gbmV3IEVycm9yKHJlcS5zdGF0dXNUZXh0KTtcbiAgZXJyLnN0YXR1cyA9IHJlcS5zdGF0dXM7XG4gIHRyeSB7XG4gICAgZXJyLnJlc3BvbnNlID0gSlNPTi5wYXJzZShyZXEucmVzcG9uc2UpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgZXJyLnJlc3BvbnNlID0gcmVxLnJlc3BvbnNlO1xuICB9XG4gIHJldHVybiBlcnI7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJlcXVlc3Q7XG4iXX0=
