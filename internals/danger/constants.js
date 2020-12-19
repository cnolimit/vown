/**
 * @description An array of all the files we want to ignore
 * from the included list
 */
const IGNORE_LIST = ['__tests__', '/.', 'tsconfig.json']

/**
 * @description An array of all the files we want to include
 */
const INCLUDE_LIST = ['packages']

module.exports = { IGNORE_LIST, INCLUDE_LIST }
