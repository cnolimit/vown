import { addMinutesToMS } from '..'

describe('Testing addMinutesToMS function', () => {
  it('Should add 3 minutes to the time', () => {
    const ms = 1567354000000
    const date = new Date(ms)
    const minutes = 60
    const newMS = addMinutesToMS(minutes, date.getTime())
    const diff = (new Date(newMS).getTime() - date.getTime()) / 60000

    expect(diff).toBe(minutes)
  })
})
