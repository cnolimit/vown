const { danger, fail, warn } = require('danger')
const { warnings, fails } = require('./internals/danger')
const { getIncludedPaths, removeIgnoredPaths } = require('./internals/danger/utils')
const { INCLUDE_LIST, IGNORE_LIST } = require('./internals/danger/constants')

const MODIFIED_FILES = removeIgnoredPaths(
  getIncludedPaths(danger.git.modified_files, INCLUDE_LIST),
  IGNORE_LIST
)
const CREATED_FILES = removeIgnoredPaths(
  getIncludedPaths(danger.git.created_files, INCLUDE_LIST),
  IGNORE_LIST
)

const getArguments = callback => ({
  callback,
  modified: MODIFIED_FILES,
  created: CREATED_FILES,
  pr: danger.github.pr,
})

warnings.forEach(rule => rule(getArguments(warn)))
fails.forEach(rule => rule(getArguments(fail)))
