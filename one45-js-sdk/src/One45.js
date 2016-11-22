"use strict";

import core from './core';
import rest from './rest';
import auth from './auth';
import user from './One45User';
import form from './One45Form';
import institution from './One45Institution';
import rotation from './One45Rotation';

/**
 * Wrapper class for all of one45 services and configuration
 */
export default class One45 {

  constructor() {
    this.Core = core;
    this.Rest = rest;
    this.Auth = auth;
    this.User = user;
    this.Form = form;
    this.Institution = institution;
    this.Rotation = rotation;
  }

  /**
   * @param serverUrl - base url end point for making api requests
   * @param clientKey - application key
   * @param config - key value array of parameters that can be set ie. CURRENT_USER, REFRESH_TOKEN, ACCESS_TOKEN
   */
  initialize(serverUrl = '', clientKey = '', configs = null) {
    this.Core.set('SERVER_URL', serverUrl);
    this.Core.set('CLIENT_KEY', clientKey);

    if (configs instanceof Object) {
      for (let key in configs) {
        this.Core.set(key, configs[key]);
      }
    }
    
    return this.Rest.get('/public/api/v1/application', {client_key: this.Core.get('CLIENT_KEY')}).then(
      resp => {
        this.Core.set('APPLICATION', resp);
        return this.Institution.getCurrentInstitution();
        }
    );
  }
  
  

}
