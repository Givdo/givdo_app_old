'use strict';

module.exports = {
  debug: false,
  api: 'https://givdo-prod.herokuapp.com/api/v1',
  facebookConfig: {
    version: 'v2.5',
    appID: '536213639869188',
    scopes: [
      'email',
      'user_friend',
      'user_about_me'
    ],
  }
};
