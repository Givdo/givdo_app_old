import * as _ from 'lodash';

export const toMostRecentFirst = (collection) => {
  return _.sortBy(collection, (o: any) => -Date.parse(o.createAt));
}
