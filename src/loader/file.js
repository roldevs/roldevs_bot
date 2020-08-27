'use strict';

const glob = require('glob');
const path = require('path');

const LoaderFile = () => {
  const _requirePath = (file) => require(path.resolve(file));
  const load = (pathName) => glob.sync(pathName).map(_requirePath);

  return {
    load,
  };
};

module.exports = LoaderFile;
