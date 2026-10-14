

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


describe('GroupConfigurationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TURSO_PLATFORM_TEST_LIVE=TRUE.
  afterEach(liveDelay('TURSO_PLATFORM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TursoPlatformSDK.test()
    const ent = testsdk.GroupConfiguration()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TursoPlatformSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.GroupConfiguration().load({"group_name":1,"organization_id":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TURSO_PLATFORM_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'group_configuration.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"delete_protection":{"a":true,"h":"Delete Protection","n":"delete_protection","r":false,"sh":"Prevent the group from being deleted.","t":"`$BOOLEAN`","key$":"delete_protection","index$":0}},"name":"group_configuration","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/organizations/{organizationSlug}/groups/{groupName}/configuration","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"group_name","or":"groupName","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organizationSlug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/organizations/{organizationSlug}/groups/{groupName}/configuration","q":{"exist":["group_name","organization_id"]},"r":{"param":{"groupName":"group_name","organizationSlug":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"groups"},{"var":"group_name"},{"lit":"configuration"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["delete_protection"],"co":{"id":"PATCH /v1/organizations/{organizationSlug}/groups/{groupName}/configuration","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"group_name","or":"groupName","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organizationSlug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/v1/organizations/{organizationSlug}/groups/{groupName}/configuration","q":{"exist":["group_name","organization_id"]},"r":{"param":{"groupName":"group_name","organizationSlug":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"groups"},{"var":"group_name"},{"lit":"configuration"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.group"]]},"key$":"group_configuration","name__orig":"group_configuration","Name":"GroupConfiguration","name_":"group_configuration","name-":"group-configuration","NAME":"GROUP_CONFIGURATION","index$":8}, {"active":true,"entity":"group_configuration","key$":"BasicGroupConfigurationFlow","kind":"basic","name":"BasicGroupConfigurationFlow","param":{},"step":[{"a":false,"d":{"organization_id":"organization01"},"i":{"ref":"group_configuration_ref01","srcdatavar":"group_configuration_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-group_configuration_ref01"}}],"v":[],"unreachable":true},{"a":false,"d":{},"i":{"ref":"group_configuration_ref01","srcdatavar":"group_configuration_ref01_data","suffix":"_dt0"},"m":{"id":"group_configuration01","organization_id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-group_configuration_ref01"}}],"unreachable":true}]}, 'GroupConfiguration', {"GET /v1/organizations/{organizationSlug}/groups/{groupName}/configuration":{"protocol":"http","parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0},{"name":"groupName","in":"path","required":true,"schema":{"type":"string"},"description":"The name of the group.","x-ref":"#/components/parameters/groupName","index$":1}]},"PATCH /v1/organizations/{organizationSlug}/groups/{groupName}/configuration":{"protocol":"http","requestBody":{"description":"The configuration to be applied to the chosen group.","required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"delete_protection":{"type":"boolean","description":"Prevent the group from being deleted.","example":true,"key$":"delete_protection"}},"x-ref":"#/components/schemas/GroupConfigurationInput","index$":1}}}},"parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0},{"name":"groupName","in":"path","required":true,"schema":{"type":"string"},"description":"The name of the group.","x-ref":"#/components/parameters/groupName","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let group_configuration_ref01_data = Object.values(setup.data.existing.group_configuration)[0] as any

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
      '../../../../.sdk/test/entity/group_configuration/GroupConfigurationTestData.json')

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
    ['group_configuration01','group_configuration02','group_configuration03','organization01','organization02','organization03','group01','group02','group03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TURSO_PLATFORM_TEST_GROUP_CONFIGURATION_ENTID': idmap,
    'TURSO_PLATFORM_TEST_LIVE': 'FALSE',
    'TURSO_PLATFORM_TEST_EXPLAIN': 'FALSE',
    'TURSO_PLATFORM_APIKEY': '',
  })

  idmap = env['TURSO_PLATFORM_TEST_GROUP_CONFIGURATION_ENTID']

  const live = 'TRUE' === env.TURSO_PLATFORM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TURSO_PLATFORM_TEST_GROUP_CONFIGURATION_ENTID']
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
  
