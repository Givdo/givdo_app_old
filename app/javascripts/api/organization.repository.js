import 'angular';

OrganizationRepository.$inject = ['config', 'repository'];

function OrganizationRepository(config, Repository) {
  return Repository({
    query: { url: config.api + '/organizations' },
  });
}

export default OrganizationRepository;
