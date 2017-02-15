import 'angular';

DeviceRepository.$inject = ['config', 'repository'];

function DeviceRepository(config, Repository) {
  return Repository({
    register: { url: '/devices' },
  });
}

export default DeviceRepository;
