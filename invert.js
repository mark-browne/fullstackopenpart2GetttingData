var invertTree = function (root) {
  console.log(root);
  if (root == undefined || root.length == 0) return root;
  for (i = 1; i <= root.length - 1; i = i + 2) {
    console.log(i, root[i], root[i + 1]);
    temp = root[i];
    root[i] = root[i + 1];
    root[i + 1] = temp;
  }
  return root;
};

root = [4,2,7,1,3,6,9]


console.log(invertTree(root));
