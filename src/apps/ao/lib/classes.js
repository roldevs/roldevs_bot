'use strict';

const R = require('ramda');

const AOClassesCommand = ({cmd, classes}) => (options) => {
  const _pickFromClass = (klass) => klass(options).pick();
  const _pickFromClasses = R.compose(R.flatten, R.map(_pickFromClass));

  const pick = () => _pickFromClasses(classes);

  return {
    cmd,
    pick,
  };
};

module.exports = AOClassesCommand;
