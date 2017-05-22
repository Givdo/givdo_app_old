import { Config } from 'config';

export function urlFor(path) {
  path = path.replace(/^\//, '');

  return `${Config.api.host}/${Config.api.version}/${path}`;
}
