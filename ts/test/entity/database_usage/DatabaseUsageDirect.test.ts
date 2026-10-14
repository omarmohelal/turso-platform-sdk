

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'


import { TursoPlatformSDK } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  maybeSkipControl,
  skipIfMissingIds,
  liveMiss,
  liveEmpty,
  describeLive,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('DatabaseUsageDirect', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TURSO_PLATFORM_TEST_LIVE=TRUE.
  afterEach(liveDelay('TURSO_PLATFORM_TEST_LIVE'))

  test('direct-exists', async () => {
    const sdk = new TursoPlatformSDK({
      base: 'http://localhost:8080',
      system: { fetch: async () => ({}) }
    })
    assert('function' === typeof sdk.direct)
    assert('function' === typeof sdk.prepare)
  })


  test('direct-load-database_usage', async (t: any) => {
    if (liveScenariosActive()) { t.skip('Covered by live operation scenarios'); return }
    const setup = directSetup({ id: 'direct01' })
    if (maybeSkipControl(t, 'direct', 'direct-load-database_usage', setup.live)) return
    if (skipIfMissingIds(t, setup, ["database_name01","organization_slug01"], LIVE_STRICT)) return
    const { client, calls } = setup

    const params: any = {}
    const query: any = {}
    if (setup.live) {
      params.database_name = setup.idmap['database_name01']
      params.organization_slug = setup.idmap['organization_slug01']
    } else {
      params.database_name = 'direct01'
      params.organization_slug = 'direct02'
    }

    const result: any = await client.direct({
      path: 'v1/organizations/{organization_slug}/databases/{database_name}/usage',
      method: 'GET',
      params,
      query,
    })

    if (setup.live) {
      if (!result.ok || result.status < 200 || result.status >= 300) {
        return void liveMiss(t, LIVE_STRICT, 'Live load failed: ' + describeLive(result))
      }
      if (!(null != result.data)) {
        return void liveMiss(t, LIVE_STRICT, 'Live load returned no data: ' + describeLive(result))
      }
    } else {
      assert(result.ok === true)
      assert(result.status === 200)
      assert(null != result.data)
      assert(result.data.id === 'direct01')
      assert(calls.length === 1)
      assert(calls[0].init.method === 'GET')
      assert(calls[0].url.includes('direct01'))
      assert(calls[0].url.includes('direct02'))
    }
  })

})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function liveScenariosActive() { return false && process.env.TURSO_PLATFORM_TEST_LIVE === 'TRUE' }
function directSetup(mockres?: any) {
  const calls: any[] = []

  const env = envOverride({
    'TURSO_PLATFORM_TEST_DATABASE_USAGE_ENTID': {},
    'TURSO_PLATFORM_TEST_LIVE': 'FALSE',
    'TURSO_PLATFORM_APIKEY': '',
  })

  const live = 'TRUE' === env.TURSO_PLATFORM_TEST_LIVE

  if (live) {
    const transport = createLiveTransport()
    // Merged so the generated fields win: sdk-test-control.json's
    // test.client.options adds to the live client, it does not redirect it.
    const client = new TursoPlatformSDK(
      Object.assign({}, liveClientOptions(), { system: { fetch: transport.fetch },
      apikey: env.TURSO_PLATFORM_APIKEY,
      }))

    let idmap: any = env['TURSO_PLATFORM_TEST_DATABASE_USAGE_ENTID']
    if ('string' === typeof idmap && idmap.startsWith('{')) {
      idmap = JSON.parse(idmap)
    }

    return { client, calls, live, idmap, transport }
  }

  const mockFetch = async (url: string, init: any) => {
    calls.push({ url, init })
    return {
      status: 200,
      statusText: 'OK',
      headers: {},
      json: async () => (null != mockres ? mockres : { id: 'direct01' }),
    }
  }

  const client = new TursoPlatformSDK({
    base: 'http://localhost:8080',
    system: { fetch: mockFetch },
  })

  return { client, calls, live, idmap: {} as any }
}

// direct() returns the raw response body. List endpoints often wrap the
// array in an envelope (e.g. { data: [...] }, { entities: [...] },
// { pagination, data: [...] }). The test transforms the raw body to
// extract the first array — either the body itself or the first array
// property of an envelope object.
function unwrapListData(data: any): any[] | null {
  if (Array.isArray(data)) return data
  if (data && 'object' === typeof data) {
    for (const v of Object.values(data)) {
      if (Array.isArray(v)) return v as any[]
    }
  }
  return null
}
  
