//An anlehnung zu Beitrag aus https://stackoverflow.com/questions/18017869/build-tree-array-from-flat-array-in-javascript
const buildTreeArray = (list, idKey, parentIdKey) => {
  let map = {},
    node,
    nodeIds,
    roots = [],
    i;

  if (list) {
    for (i = 0; i < list.length; i += 1) {
      map[list[i][idKey]] = i; // initialize the map
      list[i]["children"] = []; // initialize the children
      list[i]["childrenIds"] = []; // initialize the childrenIds
    }

    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      nodeIds = [list[i][idKey]];
      nodeIds.push(...list[i].childrenIds);
      if (node[parentIdKey]) {
        list[map[node[parentIdKey]]].children.push(node);
        list[map[node[parentIdKey]]].childrenIds.push(...nodeIds);
      } else {
        roots.push(node);
      }
    }
  }
  return roots;
};

export default buildTreeArray;
