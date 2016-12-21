import 'angular';

OAuthRepository.$inject = ['config', 'repository'];

function OAuthRepository(config, Repository) {
  return Repository({
    callback: {
      auth: false,
      method: 'POST',
      url: config.api + '/oauth/{{provider}}/callback',
    },
    profile: {
      method: 'GET',
      url: config.api + '/user'
    }
  });
}

export default OAuthRepository;
