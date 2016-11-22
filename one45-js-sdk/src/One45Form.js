'use strict';

import core from './core';
import rest from './rest';

function getById(form_id) {
  return rest.get('/api/v1/forms/' + form_id);
}

function getQuestions(form_id) {
   return rest.get('/api/v1/forms/' + form_id + '/questions');
}


export default {
  getById,
  getQuestions
};
