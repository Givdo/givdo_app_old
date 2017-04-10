export default {
  debug: true,
  api: 'http://192.168.0.14:3000/api/v1',
  // api: {
  //   version: 'v1',
  //   host: 'http://localhost:3000/api/v1'
  // },
  facebook: {
    version: 'v2.5',
    appID: '558889160934969',
    scopes: [
      'email',
      'user_friend',
      'user_about_me'
    ],
  }
};
