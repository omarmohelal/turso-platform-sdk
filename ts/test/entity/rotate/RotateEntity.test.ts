

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


describe('RotateEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TURSO_PLATFORM_TEST_LIVE=TRUE.
  afterEach(liveDelay('TURSO_PLATFORM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TursoPlatformSDK.test()
    const ent = testsdk.Rotate()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TursoPlatformSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Rotate().create({"database_name":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TURSO_PLATFORM_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'rotate.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"rotate","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v1/organizations/{organizationSlug}/databases/{databaseName}/auth/rotate","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"database_name","or":"databaseName","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organizationSlug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/v1/organizations/{organizationSlug}/databases/{databaseName}/auth/rotate","q":{"exist":["database_name","organization_id"]},"r":{"param":{"databaseName":"database_name","organizationSlug":"organization_id"}},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"databases"},{"var":"database_name"},{"lit":"auth"},{"lit":"rotate"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"POST /v1/organizations/{organizationSlug}/groups/{groupName}/auth/rotate","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"group_name","or":"groupName","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organizationSlug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/v1/organizations/{organizationSlug}/groups/{groupName}/auth/rotate","q":{"exist":["group_name","organization_id"]},"r":{"param":{"groupName":"group_name","organizationSlug":"organization_id"}},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"groups"},{"var":"group_name"},{"lit":"auth"},{"lit":"rotate"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.database"],["$.main.kit.entity.organization","$.main.kit.entity.group"]]},"key$":"rotate","name__orig":"rotate","Name":"Rotate","name_":"rotate","name-":"rotate","NAME":"ROTATE","index$":18}, {"active":true,"entity":"rotate","key$":"BasicRotateFlow","kind":"basic","name":"BasicRotateFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"rotate_ref01"},"m":{"group_name":"group_name01","organization_id":"organization01"},"o":"create","s":[],"v":[]}]}, 'Rotate', {"POST /v1/organizations/{organizationSlug}/databases/{databaseName}/auth/rotate":{"protocol":"http","parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0},{"name":"databaseName","in":"path","required":true,"schema":{"type":"string"},"description":"The name of the database.","x-ref":"#/components/parameters/databaseName","index$":1}]},"POST /v1/organizations/{organizationSlug}/groups/{groupName}/auth/rotate":{"protocol":"http","parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0},{"name":"groupName","in":"path","required":true,"schema":{"type":"string"},"description":"The name of the group.","x-ref":"#/components/parameters/groupName","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const rotate_ref01_ent = client.Rotate()
    let rotate_ref01_data = setup.data.new.rotate['rotate_ref01']
    rotate_ref01_data['group_name'] = setup.idmap['group_name01']
    rotate_ref01_data['organization_id'] = setup.idmap['organization01']

    rotate_ref01_data = (await rotate_ref01_ent.create(rotate_ref01_data)).data()
    assert(null != rotate_ref01_data)


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
      '../../../../.sdk/test/entity/rotate/RotateTestData.json')

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
    ['rotate01','rotate02','rotate03','organization01','organization02','organization03','database01','database02','database03','group01','group02','group03','group_name01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TURSO_PLATFORM_TEST_ROTATE_ENTID': idmap,
    'TURSO_PLATFORM_TEST_LIVE': 'FALSE',
    'TURSO_PLATFORM_TEST_EXPLAIN': 'FALSE',
    'TURSO_PLATFORM_APIKEY': '',
  })

  idmap = env['TURSO_PLATFORM_TEST_ROTATE_ENTID']

  const live = 'TRUE' === env.TURSO_PLATFORM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TURSO_PLATFORM_TEST_ROTATE_ENTID']
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
  
