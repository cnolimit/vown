const { removeIgnoredPaths } = require('..');

const paths = [
  'Dockerfile',
  'internals/danger/index.js',
  'internals/danger/rules/index.js',
  'internals/danger/rules/noConsoleLogs.js',
  'app/craft/components/ActionsEditor/tests/ActionEditor.test.tsx',
  'app/craft/components/ActionsEditor/tests/ActionsEditor.test.tsx',
  'app/craft/components/ActionsEditor/tests/NoAction.test.tsx',
];

const ignorePaths = ['Dockerfile', 'internals'];

const expectedPaths = [
  'app/craft/components/ActionsEditor/tests/ActionEditor.test.tsx',
  'app/craft/components/ActionsEditor/tests/ActionsEditor.test.tsx',
  'app/craft/components/ActionsEditor/tests/NoAction.test.tsx',
];

describe('Utils', () => {
  it('Should return array with ignore paths removed', () => {
    expect(removeIgnoredPaths(paths, ignorePaths)).toEqual(expectedPaths);
  });

  it('Should not be case sensitive', () => {
    expect(removeIgnoredPaths(paths, ['DoCkerFile', 'InTernaLs'])).toEqual(expectedPaths);
  });

  it('Should remove all file name matches', () => {
    const newPaths = [...paths, 'jsconfig.json', 'app/dashboard/jsconfig.json'];

    expect(removeIgnoredPaths(newPaths, ['Dockerfile', 'internals', 'jsconfig.json'])).toEqual(
      expectedPaths,
    );
  });
  it('Should remove only nested file', () => {
    const newPaths = [...paths, 'jsconfig.json', 'app/dashboard/jsconfig.json'];

    expect(
      removeIgnoredPaths(newPaths, ['Dockerfile', 'internals', 'dashboard/jsconfig.json']),
    ).toEqual([...expectedPaths, 'jsconfig.json']);
  });

  it('Should return all paths when there are no filter paths', () => {
    expect(removeIgnoredPaths(paths, [])).toEqual(paths);
  });
});
