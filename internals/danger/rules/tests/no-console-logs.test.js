jest.mock('fs')

const fs = require('fs')
const { noConsoleLogs, ERROR_MESSAGE } = require('../noConsoleLogs')
const { fileWithLogs, fileWithoutLogs } = require('./fixtures')

describe('noConsoleLog', () => {
  describe('When console log found', () => {
    fs.readFileSync.mockReturnValue(fileWithLogs)

    const filePath = '/test/path'
    const ruleArguments = { callback: jest.fn(), modified: [filePath], created: [] }

    it('Should trigger callback', () => {
      noConsoleLogs(ruleArguments)
      expect(ruleArguments.callback).toHaveBeenCalled()
    })

    it('Should display the correct error message', () => {
      noConsoleLogs(ruleArguments)
      expect(ruleArguments.callback).toHaveBeenCalledWith(`${ERROR_MESSAGE} (${filePath})`)
    })
  })

  describe('When console log not found', () => {
    const filePath = '/test/path'
    const ruleArguments = { callback: jest.fn(), modified: [filePath], created: [] }

    it('Should not trigger callback', () => {
      fs.readFileSync.mockReturnValueOnce(fileWithoutLogs)
      noConsoleLogs(ruleArguments)
      expect(ruleArguments.callback).not.toHaveBeenCalled()
    })
  })
})
