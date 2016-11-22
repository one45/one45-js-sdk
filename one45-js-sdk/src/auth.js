'use strict';

import core from './core';
import rest from './rest';
import config from './config';

// try to get token using refresh token; if failed,
// fallback and try to get token by client credentials
function regenerateToken() {
  return generateTokenByRefreshToken().catch(err => {
     return generateTokenByClientCredentials();})
    .then((response) => {
    core.publish('one45.auth.token.update', response);
    return response;
  });
}
  
function generateTokenByRefreshToken() {
  let refreshToken = core.get('REFRESH_TOKEN');

  // immediately reject without attempting request if refresh token
  // is not set
  if (!refreshToken) {
    return Promise.reject(new Error('Refresh token is not set'));
  }

  return rest.post('/public/api/v1/token/refresh', {
    refresh_token: refreshToken
  }).then(res => {
    core.set('ACCESS_TOKEN', res.access_token);
    core.set('REFRESH_TOKEN', res.refresh_token);
    return res;
  });
}
  
function generateTokenByClientCredentials() {
  let clientKey = core.get('CLIENT_KEY'),
      clientSecret = core.get('CLIENT_SECRET');

  // immediately reject without attempting request if client key or secret
  // is not set
  if (!clientKey || !clientSecret) {
    return Promise.reject(new Error('Client key or secret is not set'));
  }

  return rest.post('/public/api/v1/token/generate', {
    client_key: clientKey,
    client_secret: clientSecret
  }).then(res => {
    core.set('ACCESS_TOKEN', res.access_token);
    core.set('REFRESH_TOKEN', res.refresh_token);
    return res;
  });
}

export default {
  regenerateToken,
  generateTokenByRefreshToken,
  generateTokenByClientCredentials
};
