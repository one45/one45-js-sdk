'use strict';

import core from './core';
import auth from './auth';

const methods = {
  GET: 'GET', POST: 'POST', PUT: 'PUT', PATCH: 'PATCH', DELETE: 'DELETE',
  OPTIONS: 'OPTIONS', LINK: 'LINK', HEAD: 'HEAD'
};

const withPayload = [ methods.POST, methods.PUT, methods.PATCH, methods.DELETE ];

// TODO: add custom headers support
function request(url, method, opts={}) {
  // add query params to URL if there are any
  url = core.get('SERVER_URL') + url + ((opts.params instanceof Object) ? _serializeParams(opts.params) : '');

  method = method.toUpperCase();
  if (!methods[method]) {
    return console.error('Unsupported http method: ' + method);
  }

  let makePromise = () => new Promise((resolve, reject) => {
    let req = new XMLHttpRequest(),
    token = core.get('ACCESS_TOKEN');

    req.open(method, url, true);

    // add access token to params if one is set
    if (token) { req.setRequestHeader('Authorization', 'Bearer ' + token); }

    // resolve with response if status code indicates success,
    // otherwise reject with error
    // TODO: handle non-JSON response bodies
    req.onload = () => {
      if(req.status >= 200 && req.status < 300){
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
      }};

    // reject with error on network errors
    req.onerror = () => reject(new Error('Network Error'));

    // send the request, including data if method is PUT, PATCH, or POST
    if ((withPayload.indexOf(method) >= 0) && (opts.data instanceof Object)) {
      req.setRequestHeader("Content-Type", "application/json");
      req.send(JSON.stringify(opts.data));
    } else {
      req.send();
    }
  });

  // catch any 401 errors, try to regenerate token and retry (once max)
  return makePromise().then(response => response, err =>
      (err.status != 401) ? Promise.reject(err)
        : auth.regenerateToken().then(() => makePromise())
  );
}

request.get   = (url, params={}) => request(url, methods.GET,    { params });
request.del   = (url, data={})   => request(url, methods.DELETE, { data });
request.post  = (url, data={})   => request(url, methods.POST,   { data });
request.patch = (url, data={})   => request(url, methods.PATCH,  { data });
request.put   = (url, data={})   => request(url, methods.PUT,    { data });


function _serializeParams(params) {
  let str = [];

  for(let prop in params) {
    if (params.hasOwnProperty(prop)) {
      let key = prop,
          value = params[prop];
        
      if(typeof value !== "undefined")
      {
        if (value instanceof Array || value instanceof Object) {
          str = str.concat(_serializeObject(key, value));
        } else {
          str.push(key + "=" + encodeURIComponent(value));
        }
      }
    }
  }

  return (str.length > 0) ? ('?' + str.join("&")) : '';
}

// export serialization fn for testing
request._serializeParams = _serializeParams;

function _serializeObject(name, object) {
  let str_arr = [];
  for(let prop in object) {
    if (object.hasOwnProperty(prop)) {
      let key = prop,
          value = object[prop];
      //recursively add object and arrays into parameters
      if(value instanceof Array || value instanceof Object)
      {
        let param_name = name + '[' + key + ']';
        str_arr = str_arr.concat(_serializeObject(param_name, value));
      }
      else {
        if(typeof value !== "undefined" && value !== null) {
          str_arr.push(name + '[' + key + ']=' + encodeURIComponent(value));
        }
        else {
          str_arr.push(name + '[' + key + ']=');
        }
      }
    }
  }
  return str_arr;
}

function _createHttpError(req) {
  let err = new Error(req.statusText);
  err.status = req.status;
  try {
    err.response = JSON.parse(req.response);
  } catch (e) {
    err.response = req.response;
  }
  return err;
}

export default request;
