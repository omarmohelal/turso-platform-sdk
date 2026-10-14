
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TursoPlatformSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = TursoPlatformSDK.test()
    equal(testsdk instanceof TursoPlatformSDK, true,
      'TursoPlatformSDK.test() must return a client synchronously')
  })

})
