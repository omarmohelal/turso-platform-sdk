

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


describe('DeletedGroupEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TURSO_PLATFORM_TEST_LIVE=TRUE.
  afterEach(liveDelay('TURSO_PLATFORM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TursoPlatformSDK.test()
    const ent = testsdk.DeletedGroup()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TursoPlatformSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DeletedGroup().list({"organization_id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TURSO_PLATFORM_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'deleted_group.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cascade_databases":{"a":true,"h":"Cascade Databases","n":"cascade_databases","r":false,"sh":"The number of member databases that restoring the group would bring back with it.","t":"`$INTEGER`","key$":"cascade_databases","index$":0},"deleted_at":{"a":true,"fo":"date-time","h":"Deleted At","n":"deleted_at","r":false,"sh":"When the group was deleted.","t":"`$STRING`","key$":"deleted_at","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The group name.","t":"`$STRING`","key$":"name","index$":2},"uuid":{"a":true,"fo":"uuid","h":"Uuid","n":"uuid","r":false,"sh":"The group UUID.","t":"`$STRING`","key$":"uuid","index$":3}},"name":"deleted_group","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v3/organizations/{organizationId}/deleted-groups","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_id","or":"organizationId","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"cursor","or":"cursor","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":100,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/v3/organizations/{organizationId}/deleted-groups","q":{"exist":["organization_id"]},"r":{"param":{"organizationId":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v3"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"deleted-groups"}],"t":{"req":"`reqdata`","res":"`body.groups`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"deleted_group","name__orig":"deleted_group","Name":"DeletedGroup","name_":"deleted_group","name-":"deleted-group","NAME":"DELETED_GROUP","index$":6}, {"active":true,"entity":"deleted_group","key$":"BasicDeletedGroupFlow","kind":"basic","name":"BasicDeletedGroupFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_id":"organization01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"deleted_group_ref01"}}]}]}, 'DeletedGroup', {"GET /v3/organizations/{organizationId}/deleted-groups":{"protocol":"http","parameters":[{"name":"organizationId","in":"path","required":true,"schema":{"type":"string","format":"uuid"},"description":"The UUID of the organization. Retrieve it with the Retrieve Organization endpoint (the `id` field).","x-ref":"#/components/parameters/organizationId","index$":0},{"name":"limit","in":"query","schema":{"type":"integer","default":100},"description":"Page size, from 1 to 1000.","index$":1},{"name":"cursor","in":"query","schema":{"type":"string"},"description":"Opaque pagination cursor from the previous page's `pagination.next`.","index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let deleted_group_ref01_data = Object.values(setup.data.existing.deleted_group)[0] as any

    // LIST
    const deleted_group_ref01_ent = client.DeletedGroup()
    const deleted_group_ref01_match: any = {}
    deleted_group_ref01_match['organization_id'] = setup.idmap['organization01']

    const deleted_group_ref01_list = (await deleted_group_ref01_ent.list(deleted_group_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/deleted_group/DeletedGroupTestData.json')

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
    ['deleted_group01','deleted_group02','deleted_group03','organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TURSO_PLATFORM_TEST_DELETED_GROUP_ENTID': idmap,
    'TURSO_PLATFORM_TEST_LIVE': 'FALSE',
    'TURSO_PLATFORM_TEST_EXPLAIN': 'FALSE',
    'TURSO_PLATFORM_APIKEY': '',
  })

  idmap = env['TURSO_PLATFORM_TEST_DELETED_GROUP_ENTID']

  const live = 'TRUE' === env.TURSO_PLATFORM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TURSO_PLATFORM_TEST_DELETED_GROUP_ENTID']
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
  
