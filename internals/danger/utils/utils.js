/**
 * @description Will take an Array of strings and lower case each one
 * then return a new array with the strings lower cased
 *
 * @param {array} strings - Array of string we want to lower case
 *
 * @returns {array} - Array of lower cased strings
 */
const lowerCaseAll = (strings) => strings.map((string) => string.toLowerCase());

/**
 * @description Will take a list of paths and a list of paths to filter through
 * and will either include or exclude dependant on the 'remove' boolean value
 *
 * @param {array} paths - Array of file paths
 * @param {array} filterList - Array of paths to filter
 * @param {boolean} shouldRemove - Boolean to determine if we should include/exclude the items in the list
 *
 * @returns {array} - Array of flittered file paths
 */
const handlePaths = (paths, filterList, shouldRemove) => {
  if (!filterList.length) return paths;

  const filteredPaths = paths.filter((_file) => {
    /**
     * Attempt to find a match within the filterList
     */
    const foundPath = filterList.find((_path) => {
      const [file, path] = lowerCaseAll([_file, _path]);
      return file.includes(path);
    });

    /**
     * When shouldRemove set we need to remove the file when
     * we find a matching path or keep if we don't.
     */
    if (shouldRemove) {
      return !foundPath;
    }

    /**
     * We return the result of a match by default, all matches
     * will filter into the final resulting array.
     */
    return foundPath;
  });

  return filteredPaths;
};

module.exports = {
  lowerCaseAll,
  getIncludedPaths: handlePaths,
  removeIgnoredPaths: (filePaths, removeList) => handlePaths(filePaths, removeList, true),
};
