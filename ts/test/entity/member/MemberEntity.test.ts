

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


describe('MemberEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TURSO_PLATFORM_TEST_LIVE=TRUE.
  afterEach(liveDelay('TURSO_PLATFORM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TursoPlatformSDK.test()
    const ent = testsdk.Member()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TursoPlatformSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Member().list({"organization_slug":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TURSO_PLATFORM_TEST_LIVE
    for (const op of ['list', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'member.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"email":{"a":true,"h":"Email","n":"email","r":false,"sh":"The email for the member.","t":"`$STRING`","key$":"email","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"role":{"a":true,"h":"Role","n":"role","op":{"update":{"req":true,"type":"`$STRING`"}},"r":false,"sh":"The role assigned to the member.","t":"`$STRING`","key$":"role","index$":2},"username":{"a":true,"h":"Username","n":"username","r":false,"sh":"The username for the member.","t":"`$STRING`","key$":"username","index$":3}},"id":{"field":"id","name":"id"},"name":"member","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/organizations/{organizationSlug}/members","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_slug","or":"organizationSlug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/organizations/{organizationSlug}/members","q":{"exist":["organization_slug"]},"r":{"param":{"organizationSlug":"organization_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"organization_slug"},{"lit":"members"}],"t":{"req":"`reqdata`","res":"`body.members`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/organizations/{organizationSlug}/members/{username}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"username","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_slug","or":"organizationSlug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/organizations/{organizationSlug}/members/{username}","q":{"exist":["id","organization_slug"]},"r":{"param":{"organizationSlug":"organization_slug","username":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"organization_slug"},{"lit":"members"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.member`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v1/organizations/{organizationSlug}/members/{username}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"username","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_slug","or":"organizationSlug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/v1/organizations/{organizationSlug}/members/{username}","q":{"exist":["id","organization_slug"]},"r":{"param":{"organizationSlug":"organization_slug","username":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"organization_slug"},{"lit":"members"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["role"],"co":{"id":"PATCH /v1/organizations/{organizationSlug}/members/{username}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"username","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_slug","or":"organizationSlug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/v1/organizations/{organizationSlug}/members/{username}","q":{"exist":["id","organization_slug"]},"r":{"param":{"organizationSlug":"organization_slug","username":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"organization_slug"},{"lit":"members"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.member`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"member","name__orig":"member","Name":"Member","name_":"member","name-":"member","NAME":"MEMBER","index$":12}, {"active":true,"entity":"member","key$":"BasicMemberFlow","kind":"basic","name":"BasicMemberFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_slug":"organization_slug01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"member_ref01"}}]},{"a":true,"d":{"organization_slug":"organization_slug01"},"i":{"ref":"member_ref01","srcdatavar":"member_ref01_data","suffix":"_up0","textfield":"email"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-member_ref01"}}],"v":[]},{"a":true,"d":{},"i":{"ref":"member_ref01","srcdatavar":"member_ref01_data","suffix":"_dt0"},"m":{"id":"member01","organization_slug":"organization_slug01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-member_ref01"}}]}]}, 'Member', {"GET /v1/organizations/{organizationSlug}/members":{"protocol":"http","parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0}]},"GET /v1/organizations/{organizationSlug}/members/{username}":{"protocol":"http","parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0},{"name":"username","in":"path","required":true,"schema":{"type":"string"},"description":"The username of a Turso user or organization member.","x-ref":"#/components/parameters/username","index$":1}]},"DELETE /v1/organizations/{organizationSlug}/members/{username}":{"protocol":"http","parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0},{"name":"username","in":"path","required":true,"schema":{"type":"string"},"description":"The username of a Turso user or organization member.","x-ref":"#/components/parameters/username","index$":1}]},"PATCH /v1/organizations/{organizationSlug}/members/{username}":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"role":{"type":"string","enum":["admin","member","viewer"],"description":"The new role to assign to the member.","key$":"role"}},"required":["role"],"index$":1}}}},"parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0},{"name":"username","in":"path","required":true,"schema":{"type":"string"},"description":"The username of a Turso user or organization member.","x-ref":"#/components/parameters/username","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let member_ref01_data = Object.values(setup.data.existing.member)[0] as any

    // LIST
    const member_ref01_ent = client.Member()
    const member_ref01_match: any = {}
    member_ref01_match['organization_slug'] = setup.idmap['organization_slug01']

    const member_ref01_list = (await member_ref01_ent.list(member_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const member_ref01_data_up0: any = {}
    member_ref01_data_up0.id = member_ref01_data.id
    member_ref01_data_up0['organization_slug'] = setup.idmap['organization_slug'] ?? setup.idmap['organization_slug01']

    const member_ref01_markdef_up0 = { name: 'email', value: 'Mark01-member_ref01_' + setup.now }
    ;(member_ref01_data_up0 as any)[member_ref01_markdef_up0.name] = member_ref01_markdef_up0.value

    const member_ref01_resdata_up0 = (await member_ref01_ent.update(member_ref01_data_up0)).data()
    assert(member_ref01_resdata_up0.id === member_ref01_data_up0.id)

    assert((member_ref01_resdata_up0 as any)[member_ref01_markdef_up0.name] === member_ref01_markdef_up0.value)


    // LOAD
    const member_ref01_match_dt0: any = {}
    member_ref01_match_dt0.id = member_ref01_data.id
    member_ref01_match_dt0['organization_slug'] = setup.idmap['organization_slug'] ?? setup.idmap['organization_slug01']
    const member_ref01_data_dt0 = (await member_ref01_ent.load(member_ref01_match_dt0)).data()
    assert(member_ref01_data_dt0.id === member_ref01_data.id)


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
      '../../../../.sdk/test/entity/member/MemberTestData.json')

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
    ['member01','member02','member03','organization01','organization02','organization03','organization_slug01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TURSO_PLATFORM_TEST_MEMBER_ENTID': idmap,
    'TURSO_PLATFORM_TEST_LIVE': 'FALSE',
    'TURSO_PLATFORM_TEST_EXPLAIN': 'FALSE',
    'TURSO_PLATFORM_APIKEY': '',
  })

  idmap = env['TURSO_PLATFORM_TEST_MEMBER_ENTID']

  const live = 'TRUE' === env.TURSO_PLATFORM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TURSO_PLATFORM_TEST_MEMBER_ENTID']
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
  
