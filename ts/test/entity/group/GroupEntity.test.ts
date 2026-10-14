

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


describe('GroupEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TURSO_PLATFORM_TEST_LIVE=TRUE.
  afterEach(liveDelay('TURSO_PLATFORM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TursoPlatformSDK.test()
    const ent = testsdk.Group()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TursoPlatformSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Group().list({"organization_slug":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TURSO_PLATFORM_TEST_LIVE
    for (const op of ['create', 'list', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'group.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"delete_protection":{"a":true,"h":"Delete Protection","n":"delete_protection","r":false,"sh":"The current status for delete protection.","t":"`$BOOLEAN`","key$":"delete_protection","index$":0},"extensions":{"a":true,"h":"Extensions","n":"extensions","r":false,"sh":"The extensions to enable for new databases created in this group.","t":"`$ANY`","union":{"branches":2,"count":1,"depth":0},"key$":"extensions","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"location":{"a":true,"h":"Location","n":"location","r":true,"sh":"The location key for the new group.","t":"`$STRING`","key$":"location","index$":3},"locations":{"a":true,"de":true,"h":"Locations","n":"locations","r":false,"sh":"An array of location keys the group is located.","t":"`$ARRAY`","key$":"locations","index$":4},"name":{"a":true,"h":"Name","n":"name","op":{"create":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The group name, unique across your organization.","t":"`$STRING`","key$":"name","index$":5},"primary":{"a":true,"h":"Primary","n":"primary","r":false,"sh":"The primary location key.","t":"`$STRING`","key$":"primary","index$":6},"uuid":{"a":true,"h":"Uuid","n":"uuid","r":false,"sh":"The group universal unique identifier (UUID).","t":"`$STRING`","key$":"uuid","index$":7},"version":{"a":true,"de":true,"h":"Version","n":"version","r":false,"sh":"The current libSQL server version the databases in that group are running.","t":"`$STRING`","key$":"version","index$":8}},"id":{"field":"id","name":"id"},"name":"group","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v3/organizations/{organizationId}/groups/{groupId}/restore","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"groupId","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_id","or":"organizationId","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/v3/organizations/{organizationId}/groups/{groupId}/restore","q":{"$action":"restore","exist":["id","organization_id"]},"r":{"param":{"groupId":"id","organizationId":"organization_id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v3"},{"lit":"organizations"},{"var":"organization_id"},{"lit":"groups"},{"var":"id"},{"lit":"restore"}],"t":{"req":"`reqdata`","res":"`body.group`"},"index$":0},{"a":true,"co":{"id":"POST /v1/organizations/{organizationSlug}/groups/{groupName}/auth/rotate","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"group_name","or":"groupName","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_slug","or":"organizationSlug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/v1/organizations/{organizationSlug}/groups/{groupName}/auth/rotate","q":{"$action":"rotate","exist":["group_name","organization_slug"]},"r":{"param":{"groupName":"group_name","organizationSlug":"organization_slug"}},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"organization_slug"},{"lit":"groups"},{"var":"group_name"},{"lit":"auth"},{"lit":"rotate"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"bf":["permissions"],"co":{"id":"POST /v1/organizations/{organizationSlug}/groups/{groupName}/auth/tokens","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"group_name","or":"groupName","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_slug","or":"organizationSlug","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"ex":"full-access","k":"query","n":"authorization","or":"authorization","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"never","k":"query","n":"expiration","or":"expiration","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/v1/organizations/{organizationSlug}/groups/{groupName}/auth/tokens","q":{"$action":"token","exist":["group_name","organization_slug"]},"r":{"param":{"groupName":"group_name","organizationSlug":"organization_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"organization_slug"},{"lit":"groups"},{"var":"group_name"},{"lit":"auth"},{"lit":"tokens"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"bf":["organization"],"co":{"id":"POST /v1/organizations/{organizationSlug}/groups/{groupName}/transfer","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"group_name","or":"groupName","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_slug","or":"organizationSlug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/v1/organizations/{organizationSlug}/groups/{groupName}/transfer","q":{"$action":"transfer","exist":["group_name","organization_slug"]},"r":{"param":{"groupName":"group_name","organizationSlug":"organization_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"organization_slug"},{"lit":"groups"},{"var":"group_name"},{"lit":"transfer"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"co":{"id":"POST /v1/organizations/{organizationSlug}/groups/{groupName}/unarchive","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"group_name","or":"groupName","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_slug","or":"organizationSlug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/v1/organizations/{organizationSlug}/groups/{groupName}/unarchive","q":{"$action":"unarchive","exist":["group_name","organization_slug"]},"r":{"param":{"groupName":"group_name","organizationSlug":"organization_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"organization_slug"},{"lit":"groups"},{"var":"group_name"},{"lit":"unarchive"}],"t":{"req":"`reqdata`","res":"`body.group`"},"index$":4},{"a":true,"co":{"id":"POST /v1/organizations/{organizationSlug}/groups/{groupName}/update","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"group_name","or":"groupName","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_slug","or":"organizationSlug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"POST","o":"/v1/organizations/{organizationSlug}/groups/{groupName}/update","q":{"$action":"update","exist":["group_name","organization_slug"]},"r":{"param":{"groupName":"group_name","organizationSlug":"organization_slug"}},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"organization_slug"},{"lit":"groups"},{"var":"group_name"},{"lit":"update"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":5},{"a":true,"bf":["extensions","location","name"],"co":{"id":"POST /v1/organizations/{organizationSlug}/groups","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_slug","or":"organizationSlug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/organizations/{organizationSlug}/groups","q":{"exist":["organization_slug"]},"r":{"param":{"organizationSlug":"organization_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"organization_slug"},{"lit":"groups"}],"t":{"req":"`reqdata`","res":"`body.group`"},"index$":6}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/organizations/{organizationSlug}/groups","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_slug","or":"organizationSlug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/organizations/{organizationSlug}/groups","q":{"exist":["organization_slug"]},"r":{"param":{"organizationSlug":"organization_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"organization_slug"},{"lit":"groups"}],"t":{"req":"`reqdata`","res":"`body.groups`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/organizations/{organizationSlug}/groups/{groupName}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"groupName","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_slug","or":"organizationSlug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/organizations/{organizationSlug}/groups/{groupName}","q":{"exist":["id","organization_slug"]},"r":{"param":{"groupName":"id","organizationSlug":"organization_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"organization_slug"},{"lit":"groups"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.group`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v1/organizations/{organizationSlug}/groups/{groupName}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"groupName","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_slug","or":"organizationSlug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/v1/organizations/{organizationSlug}/groups/{groupName}","q":{"exist":["id","organization_slug"]},"r":{"param":{"groupName":"id","organizationSlug":"organization_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"organization_slug"},{"lit":"groups"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.group`"},"index$":0}],"key$":"remove"}},"relations":{"ancestors":[["$.main.kit.entity.organization"],["$.main.kit.entity.organization"]]},"key$":"group","name__orig":"group","Name":"Group","name_":"group","name-":"group","NAME":"GROUP","index$":7}, {"active":true,"entity":"group","key$":"BasicGroupFlow","kind":"basic","name":"BasicGroupFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"group_ref01"},"m":{"organization_slug":"organization_slug01"},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{},"m":{"organization_slug":"organization_slug01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"group_ref01"}}]},{"a":true,"d":{},"i":{"ref":"group_ref01","srcdatavar":"group_ref01_data","suffix":"_dt0"},"m":{"id":"group01","organization_slug":"organization_slug01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-group_ref01"}}]},{"a":true,"d":{},"i":{"ref":"group_ref01","suffix":"_rm0"},"m":{"id":"group01","organization_slug":"organization_slug01"},"o":"remove","s":[],"v":[]},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{"organization_slug":"organization_slug01"},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"group_ref01"}}]}]}, 'Group', {"POST /v3/organizations/{organizationId}/groups/{groupId}/restore":{"protocol":"http","parameters":[{"name":"organizationId","in":"path","required":true,"schema":{"type":"string","format":"uuid"},"description":"The UUID of the organization. Retrieve it with the Retrieve Organization endpoint (the `id` field).","x-ref":"#/components/parameters/organizationId","index$":0},{"name":"groupId","in":"path","required":true,"schema":{"type":"string","format":"uuid"},"description":"The UUID of the group, as returned when listing deleted groups (the `uuid` field).","x-ref":"#/components/parameters/groupId","index$":1}]},"POST /v1/organizations/{organizationSlug}/groups/{groupName}/auth/rotate":{"protocol":"http","parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0},{"name":"groupName","in":"path","required":true,"schema":{"type":"string"},"description":"The name of the group.","x-ref":"#/components/parameters/groupName","index$":1}]},"POST /v1/organizations/{organizationSlug}/groups/{groupName}/auth/tokens":{"protocol":"http","requestBody":{"description":"Additional context such as claims required for the token.","required":false,"content":{"application/json":{"schema":{"type":"object","properties":{"permissions":{"type":"object","description":"The permissions for the token.","properties":{"read_attach":{"type":"object","description":"Read `ATTACH` permission for the token.","properties":{"databases":{}}}}}},"x-ref":"#/components/schemas/CreateTokenInput"}}}},"parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0},{"name":"groupName","in":"path","required":true,"schema":{"type":"string"},"description":"The name of the group.","x-ref":"#/components/parameters/groupName","index$":1},{"name":"expiration","in":"query","schema":{"type":"string","default":"never"},"description":"Expiration time for the token (e.g., 2w1d30m).","index$":2},{"name":"authorization","in":"query","schema":{"type":"string","default":"full-access","enum":["full-access","read-only"]},"description":"Authorization level for the token (full-access or read-only).","index$":3}]},"POST /v1/organizations/{organizationSlug}/groups/{groupName}/transfer":{"protocol":"http","requestBody":{"description":"Receiving Organization details.","required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"organization":{"type":"string","description":"The slug of the organization to transfer the group to."}}}}}},"parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0},{"name":"groupName","in":"path","required":true,"schema":{"type":"string"},"description":"The name of the group.","x-ref":"#/components/parameters/groupName","index$":1}]},"POST /v1/organizations/{organizationSlug}/groups/{groupName}/unarchive":{"protocol":"http","parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0},{"name":"groupName","in":"path","required":true,"schema":{"type":"string"},"description":"The name of the group.","x-ref":"#/components/parameters/groupName","index$":1}]},"POST /v1/organizations/{organizationSlug}/groups/{groupName}/update":{"protocol":"http","parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0},{"name":"groupName","in":"path","required":true,"schema":{"type":"string"},"description":"The name of the group.","x-ref":"#/components/parameters/groupName","index$":1}]},"POST /v1/organizations/{organizationSlug}/groups":{"protocol":"http","requestBody":{"description":"Group data to create a new group","required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"name":{"type":"string","description":"The name of the new group.","key$":"name"},"location":{"type":"string","description":"The location key for the new group.","key$":"location"},"extensions":{"oneOf":[{"type":"string","enum":["all"],"description":"Set to `all` to enable all extensions."},{"type":"array","items":{"type":"string","enum":[]},"description":"Array of extensions to enable."}],"description":"The extensions to enable for new databases created in this group. Users looking to enable vector extensions should instead use the native [libSQL vector datatype](/features/ai-and-embeddings).","x-ref":"#/components/schemas/Extensions","key$":"extensions"}},"required":["name","location"],"example":{"name":"new-group","location":"aws-us-east-1"},"x-ref":"#/components/schemas/NewGroup","index$":1}}}},"parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0}]},"GET /v1/organizations/{organizationSlug}/groups":{"protocol":"http","parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0}]},"GET /v1/organizations/{organizationSlug}/groups/{groupName}":{"protocol":"http","parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0},{"name":"groupName","in":"path","required":true,"schema":{"type":"string"},"description":"The name of the group.","x-ref":"#/components/parameters/groupName","index$":1}]},"DELETE /v1/organizations/{organizationSlug}/groups/{groupName}":{"protocol":"http","parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0},{"name":"groupName","in":"path","required":true,"schema":{"type":"string"},"description":"The name of the group.","x-ref":"#/components/parameters/groupName","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const group_ref01_ent = client.Group()
    let group_ref01_data = setup.data.new.group['group_ref01']
    group_ref01_data['organization_slug'] = setup.idmap['organization_slug01']

    group_ref01_data = (await group_ref01_ent.create(group_ref01_data)).data()
    assert(null != group_ref01_data.id)


    // LIST
    const group_ref01_match: any = {}
    group_ref01_match['organization_slug'] = setup.idmap['organization_slug01']

    const group_ref01_list = (await group_ref01_ent.list(group_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(group_ref01_list, { id: group_ref01_data.id })))


    // LOAD
    const group_ref01_match_dt0: any = {}
    group_ref01_match_dt0.id = group_ref01_data.id
    group_ref01_match_dt0['organization_slug'] = setup.idmap['organization_slug'] ?? setup.idmap['organization_slug01']
    const group_ref01_data_dt0 = (await group_ref01_ent.load(group_ref01_match_dt0)).data()
    assert(group_ref01_data_dt0.id === group_ref01_data.id)


    // REMOVE
    const group_ref01_match_rm0: any = { id: group_ref01_data.id }
    group_ref01_match_rm0['organization_slug'] = setup.idmap['organization_slug'] ?? setup.idmap['organization_slug01']
    await group_ref01_ent.remove(group_ref01_match_rm0)
  

    // LIST
    const group_ref01_match_rt0: any = {}
    group_ref01_match_rt0['organization_slug'] = setup.idmap['organization_slug01']

    const group_ref01_list_rt0 = (await group_ref01_ent.list(group_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(group_ref01_list_rt0, { id: group_ref01_data.id })))


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
      '../../../../.sdk/test/entity/group/GroupTestData.json')

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
    ['group01','group02','group03','organization01','organization02','organization03','organization_slug01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TURSO_PLATFORM_TEST_GROUP_ENTID': idmap,
    'TURSO_PLATFORM_TEST_LIVE': 'FALSE',
    'TURSO_PLATFORM_TEST_EXPLAIN': 'FALSE',
    'TURSO_PLATFORM_APIKEY': '',
  })

  idmap = env['TURSO_PLATFORM_TEST_GROUP_ENTID']

  const live = 'TRUE' === env.TURSO_PLATFORM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TURSO_PLATFORM_TEST_GROUP_ENTID']
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
  
