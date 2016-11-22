'use strict';

/**
 * Core class to manage state such as auth credentials, current users, publishing and subscribing events
 */
class CoreManager {

  constructor() {

    //state variables
    let keys = [
      'SERVER_URL', 'CLIENT_KEY', 'CLIENT_SECRET','APPLICATION','INSTITUTION',
      'ACCESS_TOKEN', 'REFRESH_TOKEN', 'CURRENT_USER'
    ];

    //events for publisher/subscriber
    this.events = {};

    this.keys = keys;
    keys.forEach(key => this[key] = null);
  }

  /**
   * @param key
   * @returns {null}
   */
  get(key) {
    return this.isValid(key) ? this[key] : null;
  }

  /**
   * @param key
   * @param value
   */
  set(key, value) {
    if(this.isValid(key)) {
      this[key] = value;
    }
  }

  isValid(key) {
    return this.keys.indexOf(key) >= 0;
  }

  /**
   * Generate uuid()
   * @returns {string}
   */
  uuid() {
    function s(n) { return h((Math.random() * (1<<(n<<2)))^Date.now()).slice(-n); }
    function h(n) { return (n|0).toString(16); }
    return  [
      s(4) + s(4), s(4),
      '4' + s(3),                    // UUID version 4
      h(8|(Math.random()*4)) + s(3), // {8|9|A|B}xxx
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
  subscribe(event, func) {
    if (!this.events[event]) {
     this.events[event] = [];
    }
    let token = this.uuid();
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
  publish(event, args) {

    if (!this.events[event]) {
      return false;
    }

    let subscribers = this.events[event];
    setTimeout(function() {
      let len = subscribers ? subscribers.length : 0;
      while (len--) {
        subscribers[len].func(args);
      }
    }, 0);
    return true;
  }

  unsubscribe(token) {
    for (let event in this.events) {
      if (this.events[event]) {
        for (var i = 0, j = this.events[event].length; i < j; i++) {
          if (this.events[event][i].token === token) {
            this.events[event].splice(i, 1);
            return token;
          }
        }
      }
    }
    return false;
  }
}

let core;

export default (function getCore() {
  core = core || new CoreManager();
  return core;
})();
