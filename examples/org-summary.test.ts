import { test } from 'node:test'
import assert from 'node:assert/strict'

import { TursoPlatformSDK } from '../ts/dist/TursoPlatformSDK.js'
import { summarizeOrganization } from './org-summary.ts'

// TursoPlatformSDK.test() swaps HTTP for an in-memory store seeded per entity.
// Records carry organization_slug because the mock filters some lists by it.
function offlineClient() {
  return TursoPlatformSDK.test({
    entity: {
      user: { me: { username: 'omar' } },
      database: {
        d1: { Name: 'app-main', group: 'default', regions: ['fra', 'ams'], primaryRegion: 'fra', organization_slug: 'acme' },
        d2: { Name: 'app-preview', group: 'default', regions: ['fra'], primaryRegion: 'fra', organization_slug: 'acme' },
      },
      group: {
        g1: { name: 'default', locations: ['fra', 'ams'], primary: 'fra', organization_slug: 'acme' },
      },
    },
  })
}

test('summarises the token owner, databases and groups', async () => {
  const summary = await summarizeOrganization(offlineClient(), 'acme')

  assert.deepEqual(summary, {
    organization: 'acme',
    user: 'omar',
    databases: [
      { name: 'app-main', group: 'default', primaryRegion: 'fra', regions: ['fra', 'ams'] },
      { name: 'app-preview', group: 'default', primaryRegion: 'fra', regions: ['fra'] },
    ],
    groups: [{ name: 'default', primary: 'fra', locations: ['fra', 'ams'] }],
  })
})

test('sorts databases by name so the output is stable', async () => {
  const client = TursoPlatformSDK.test({
    entity: {
      user: { me: { username: 'omar' } },
      database: {
        d1: { Name: 'zeta', group: 'default', regions: [] },
        d2: { Name: 'alpha', group: 'default', regions: [] },
      },
      group: {},
    },
  })

  const summary = await summarizeOrganization(client, 'acme')

  assert.deepEqual(summary.databases.map((d) => d.name), ['alpha', 'zeta'])
})
