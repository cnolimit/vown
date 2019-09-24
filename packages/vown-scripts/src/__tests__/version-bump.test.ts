import { exec } from 'child_process'

describe('Testinng - Running version bump', () => {
  it('Should fail if the wrong package provided', done => {
    exec('ls ../', (err, _) => {
      if (err) throw err
      done()
    })
  })
})
