const fs = require('fs');

const ERROR_MESSAGE = '`console.*` log is present in';

/**
 * @description Will check each file to determine whether any console logs
 * have been left.
 */
const noConsoleLogs = ({ callback, created, modified }) => {
  const FILES = [...created, ...modified];

  FILES.forEach((file) => {
    const content = fs.readFileSync(file).toString();

    if (content.includes('console.')) {
      callback(`${ERROR_MESSAGE} (${file})`);
    }
  });
};

module.exports = {
  noConsoleLogs,
  ERROR_MESSAGE,
};
