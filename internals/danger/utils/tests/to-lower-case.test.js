const { lowerCaseAll } = require('../utils');

describe('lowerCaseAll', () => {
  describe('When we provide an array of strings', () => {
    const text1 = 'TEXT1';
    const text2 = 'Text2';

    it('Should return the list with all values lower cased', () => {
      expect(lowerCaseAll([text1, text2])).toEqual([text1.toLowerCase(), text2.toLowerCase()]);
    });
  });

  describe('When we provide an array of strings', () => {
    const text1 = 'TEXT1';
    const text2 = 'Text2';

    it('Should return the list with all values lower cased', () => {
      expect(lowerCaseAll([text1, text2])).toEqual([text1.toLowerCase(), text2.toLowerCase()]);
    });
  });
});
