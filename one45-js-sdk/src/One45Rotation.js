'use strict';

import core from './core';
import rest from './rest';

function getById(rotation_id) {
  return rest.get('/api/v1/rotations/' + rotation_id);
}

function getBestGuessList(rotation_id) {
   return rest.get('/api/v1/rotations/' + rotation_id + '/bestguesslist');
}


export default {
  getById,
  getBestGuessList
};
