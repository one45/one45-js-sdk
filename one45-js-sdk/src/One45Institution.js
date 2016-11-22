'use strict';

import core from './core';
import rest from './rest';

function getCurrentInstitution() {
  return rest.get('/public/api/v1/institution')
  .then(res => {
    core.set('INSTITUTION', res);
    return res;
  });
}

function getPreferences(params) {
  return rest.get('/api/v1/institution/preferences', params);
}


export default {
  getCurrentInstitution,
  getPreferences
};
