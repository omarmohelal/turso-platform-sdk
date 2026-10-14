

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { TursoPlatformSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('DatabaseUsageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TURSO_PLATFORM_TEST_LIVE=TRUE.
  afterEach(liveDelay('TURSO_PLATFORM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TursoPlatformSDK.test()
    const ent = testsdk.DatabaseUsage()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TursoPlatformSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DatabaseUsage().load({"database_name":1,"organization_slug":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TURSO_PLATFORM_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'database_usage.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"instances":{"a":true,"h":"Instances","n":"instances","r":false,"sh":"The usage objects for instances of the current database.","t":"`$ARRAY`","key$":"instances","index$":0},"total":{"a":true,"h":"Total","n":"total","r":false,"sh":"The total usage for the database.","t":"`$OBJECT`","key$":"total","index$":1},"uuid":{"a":true,"h":"Uuid","n":"uuid","r":false,"sh":"The database universal unique identifier (UUID).","t":"`$STRING`","key$":"uuid","index$":2}},"name":"database_usage","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/organizations/{organizationSlug}/databases/{databaseName}/usage","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"database_name","or":"databaseName","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_slug","or":"organizationSlug","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"from","or":"from","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"to","or":"to","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/organizations/{organizationSlug}/databases/{databaseName}/usage","q":{"exist":["database_name","organization_slug"]},"r":{"param":{"databaseName":"database_name","organizationSlug":"organization_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"organization_slug"},{"lit":"databases"},{"var":"database_name"},{"lit":"usage"}],"t":{"req":"`reqdata`","res":"`body.database`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.database"]]},"key$":"database_usage","name__orig":"database_usage","Name":"DatabaseUsage","name_":"database_usage","name-":"database-usage","NAME":"DATABASE_USAGE","index$":5}, {"active":true,"entity":"database_usage","key$":"BasicDatabaseUsageFlow","kind":"basic","name":"BasicDatabaseUsageFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"database_usage_ref01","srcdatavar":"database_usage_ref01_data","suffix":"_dt0"},"m":{"id":"database_usage01","organization_slug":"organization_slug01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-database_usage_ref01"}}],"unreachable":true}]}, 'DatabaseUsage', {"GET /v1/organizations/{organizationSlug}/databases/{databaseName}/usage":{"protocol":"http","parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0},{"name":"databaseName","in":"path","required":true,"schema":{"type":"string"},"description":"The name of the database.","x-ref":"#/components/parameters/databaseName","index$":1},{"name":"from","in":"query","schema":{"type":"string","format":"date-time"},"description":"The datetime to retrieve usage **from** in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. Defaults to the current calendar month if not provided. Example: `2023-01-01T00:00:00Z`","index$":2},{"name":"to","in":"query","schema":{"type":"string","format":"date-time"},"description":"The datetime to retrieve usage **to** in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. Defaults to the current calendar month if not provided. Example: `2023-02-01T00:00:00Z`","index$":3}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let database_usage_ref01_data = Object.values(setup.data.existing.database_usage)[0] as any

  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/database_usage/DatabaseUsageTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = TursoPlatformSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['database_usage01','database_usage02','database_usage03','organization01','organization02','organization03','database01','database02','database03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TURSO_PLATFORM_TEST_DATABASE_USAGE_ENTID': idmap,
    'TURSO_PLATFORM_TEST_LIVE': 'FALSE',
    'TURSO_PLATFORM_TEST_EXPLAIN': 'FALSE',
    'TURSO_PLATFORM_APIKEY': '',
  })

  idmap = env['TURSO_PLATFORM_TEST_DATABASE_USAGE_ENTID']

  const live = 'TRUE' === env.TURSO_PLATFORM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TURSO_PLATFORM_TEST_DATABASE_USAGE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new TursoPlatformSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.TURSO_PLATFORM_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.TURSO_PLATFORM_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
