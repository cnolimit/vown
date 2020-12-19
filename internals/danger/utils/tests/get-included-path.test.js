const { getIncludedPaths } = require('..');

const paths = [
  'Dockerfile',
  'internals/danger/index.js',
  'internals/danger/rules/index.js',
  'internals/danger/rules/noConsoleLogs.js',
  'app/craft/components/ActionsEditor/tests/ActionEditor.test.tsx',
  'app/craft/components/ActionsEditor/tests/ActionsEditor.test.tsx',
  'app/craft/components/ActionsEditor/tests/NoAction.test.tsx',
];

const includedPaths = ['app'];

const expectedPaths = [
  'app/craft/components/ActionsEditor/tests/ActionEditor.test.tsx',
  'app/craft/components/ActionsEditor/tests/ActionsEditor.test.tsx',
  'app/craft/components/ActionsEditor/tests/NoAction.test.tsx',
];

describe('Utils', () => {
  it('Should return array with included paths', () => {
    expect(getIncludedPaths(paths, includedPaths)).toEqual(expectedPaths);
  });

  it('Should not be case sensitive', () => {
    expect(getIncludedPaths(paths, ['ApP'])).toEqual(expectedPaths);
  });

  it('Should include all file name matches', () => {
    const filePaths = ['jsconfig.json', 'app/jsconfig.json'];
    const newPaths = [...paths, ...filePaths];

    expect(getIncludedPaths(newPaths, ['jsconfig.json'])).toEqual(filePaths);
  });
  it('Should include only nested file', () => {
    const newPaths = [...paths, 'jsconfig.json', 'app/dashboard/jsconfig.json'];

    expect(getIncludedPaths(newPaths, ['dashboard/jsconfig.json'])).toEqual([
      'app/dashboard/jsconfig.json',
    ]);
  });
  it('Should return all paths when there are no filter paths', () => {
    expect(getIncludedPaths(paths, [])).toEqual(paths);
  });
});
