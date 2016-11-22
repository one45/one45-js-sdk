'use strict';

import core from './core';
import rest from './rest';

function login(username, password, mode) {
  return rest.post('/public/api/v1/token/login', {
    username,
    password,
    client_key: core.get('CLIENT_KEY'),
    mode
  }).then(res => {
    core.set('ACCESS_TOKEN', res.access_token);
    core.set('REFRESH_TOKEN', res.refresh_token);
    core.set('CURRENT_USER', res.user);
    return res;
  });
}

/**
 * Todo : Should return promise and invalidate token using invalidate api
 */
function logout() {
    rest.del('/public/api/v1/token/invalidate' ,{"access_token": core.get('ACCESS_TOKEN')});

    core.set('ACCESS_TOKEN', null);
    core.set('REFRESH_TOKEN', null);
    core.set('CURRENT_USER', null);
}

function getCurrentUser() {
  return core.get('CURRENT_USER');
}

function getTodos(params) {
  return rest.get('/api/v1/user/todos', params);
}

function getEvaluationById(id) {
  return rest.get('/api/v1/user/evaluations/' + id);
}

function saveAnswer(evaluation_id, question_id, values) {
  let url = '/api/v1/user/evaluations/' + evaluation_id + '/question/' + question_id + '/answer';
  return rest.put(url, values);
}

function patchEvaluation(evaluation_id, values) {
  let url = '/api/v1/user/evaluations/' + evaluation_id;
  return rest.patch(url, values);
}

function distributeEvaluation(evaluation_id, evaluator_ids, target_ids) {
  let url = '/api/v1/user/evaluations/' + evaluation_id + '/distribute';
  return rest.post(url, {'evaluator_ids': evaluator_ids, 'target_ids': target_ids});
}

function getAHDEvents(params) {
  let url = '/api/v1/user/events/ahd';
  return rest.get(url, params);
}

function getCurriculumEvents(params) {
  let url = '/api/v1/user/events/curriculum';
  return rest.get(url, params);
}

function getRotationEvents(params) {
  let url = '/api/v1/user/events/rotation';
  return rest.get(url, params);
}

function getCalendarUrls() {
  let url = '/api/v1/user/events/calendar';
  return rest.get(url);
}


export default {
  login,
  logout,
  getCurrentUser,
  getTodos,
  getEvaluationById,
  saveAnswer,
  patchEvaluation,
  distributeEvaluation,
  getAHDEvents,
  getCurriculumEvents,
  getRotationEvents,
  getCalendarUrls
};
