
export const toEntityItem = (collection, item) => {
  collection[item.id] = item;
  return collection;
}
