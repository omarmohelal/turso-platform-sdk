

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


describe('DatabaseStatEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TURSO_PLATFORM_TEST_LIVE=TRUE.
  afterEach(liveDelay('TURSO_PLATFORM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TursoPlatformSDK.test()
    const ent = testsdk.DatabaseStat()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TursoPlatformSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DatabaseStat().list({"database_name":1,"organization_slug":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TURSO_PLATFORM_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'database_stat.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"query":{"a":true,"h":"Query","n":"query","r":false,"sh":"A string representing the SQL query executed.","t":"`$STRING`","key$":"query","index$":0},"rows_read":{"a":true,"h":"Rows Read","n":"rows_read","r":false,"sh":"An integer indicating the number of rows read by the query, which reflects the volume of data the query processed from the database.","t":"`$INTEGER`","key$":"rows_read","index$":1},"rows_written":{"a":true,"h":"Rows Written","n":"rows_written","r":false,"sh":"An integer indicating the number of rows written (inserted, updated, or deleted) by the query, which reflects the impact of the query on the database data.","t":"`$INTEGER`","key$":"rows_written","index$":2}},"name":"database_stat","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/organizations/{organizationSlug}/databases/{databaseName}/stats","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"database_name","or":"databaseName","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_slug","or":"organizationSlug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/organizations/{organizationSlug}/databases/{databaseName}/stats","q":{"exist":["database_name","organization_slug"]},"r":{"param":{"databaseName":"database_name","organizationSlug":"organization_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"organization_slug"},{"lit":"databases"},{"var":"database_name"},{"lit":"stats"}],"t":{"req":"`reqdata`","res":"`body.top_queries`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.database"]]},"key$":"database_stat","name__orig":"database_stat","Name":"DatabaseStat","name_":"database_stat","name-":"database-stat","NAME":"DATABASE_STAT","index$":4}, {"active":true,"entity":"database_stat","key$":"BasicDatabaseStatFlow","kind":"basic","name":"BasicDatabaseStatFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"database_name":"database_name01","organization_slug":"organization_slug01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"database_stat_ref01"}}]}]}, 'DatabaseStat', {"GET /v1/organizations/{organizationSlug}/databases/{databaseName}/stats":{"protocol":"http","parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0},{"name":"databaseName","in":"path","required":true,"schema":{"type":"string"},"description":"The name of the database.","x-ref":"#/components/parameters/databaseName","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let database_stat_ref01_data = Object.values(setup.data.existing.database_stat)[0] as any

    // LIST
    const database_stat_ref01_ent = client.DatabaseStat()
    const database_stat_ref01_match: any = {}
    database_stat_ref01_match['database_name'] = setup.idmap['database_name01']
    database_stat_ref01_match['organization_slug'] = setup.idmap['organization_slug01']

    const database_stat_ref01_list = (await database_stat_ref01_ent.list(database_stat_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/database_stat/DatabaseStatTestData.json')

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
    ['database_stat01','database_stat02','database_stat03','organization01','organization02','organization03','database01','database02','database03','database_name01','organization_slug01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TURSO_PLATFORM_TEST_DATABASE_STAT_ENTID': idmap,
    'TURSO_PLATFORM_TEST_LIVE': 'FALSE',
    'TURSO_PLATFORM_TEST_EXPLAIN': 'FALSE',
    'TURSO_PLATFORM_APIKEY': '',
  })

  idmap = env['TURSO_PLATFORM_TEST_DATABASE_STAT_ENTID']

  const live = 'TRUE' === env.TURSO_PLATFORM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TURSO_PLATFORM_TEST_DATABASE_STAT_ENTID']
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
  
