

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


describe('OrganizationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TURSO_PLATFORM_TEST_LIVE=TRUE.
  afterEach(liveDelay('TURSO_PLATFORM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TursoPlatformSDK.test()
    const ent = testsdk.Organization()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('organization hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of TursoPlatformSDK.test(offline).Organization().stream('list')) { }
    }, /offline/)

    for await (const _item of TursoPlatformSDK.test(offline).Organization()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = TursoPlatformSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Organization().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of TursoPlatformSDK.test().Organization().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new TursoPlatformSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Organization().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Organization().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TursoPlatformSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Organization().list({"blocked_reads":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TURSO_PLATFORM_TEST_LIVE
    for (const op of ['list', 'update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'organization.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"blocked_reads":{"a":true,"h":"Blocked Reads","n":"blocked_reads","r":false,"sh":"Returns the current status for blocked reads.","t":"`$BOOLEAN`","key$":"blocked_reads","index$":0},"blocked_writes":{"a":true,"h":"Blocked Writes","n":"blocked_writes","r":false,"sh":"Returns the current status for blocked writes.","t":"`$BOOLEAN`","key$":"blocked_writes","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The organization name.","t":"`$STRING`","key$":"name","index$":3},"overages":{"a":true,"h":"Overages","n":"overages","r":false,"sh":"The name of the organization.","t":"`$BOOLEAN`","key$":"overages","index$":4},"plan_id":{"a":true,"h":"Plan Id","n":"plan_id","r":false,"sh":"The pricing plan identifier this organization is subscribed to.","t":"`$STRING`","key$":"plan_id","index$":5},"plan_timeline":{"a":true,"h":"Plan Timeline","n":"plan_timeline","r":false,"sh":"The billing cycle for the paid plan, if any.","t":"`$STRING`","key$":"plan_timeline","index$":6},"platform":{"a":true,"h":"Platform","n":"platform","r":false,"sh":"The external platform this organization is managed by.","t":"`$STRING`","key$":"platform","index$":7},"require_mfa":{"a":true,"h":"Require Mfa","n":"require_mfa","r":false,"sh":"Whether all members of the organization are required to have multi-factor authentication enabled.","t":"`$BOOLEAN`","key$":"require_mfa","index$":8},"restore_enabled":{"a":true,"h":"Restore Enabled","n":"restore_enabled","r":false,"sh":"Whether deleted database and group recovery is enabled for the organization.","t":"`$BOOLEAN`","key$":"restore_enabled","index$":9},"slug":{"a":true,"h":"Slug","n":"slug","r":false,"sh":"The organization slug.","t":"`$STRING`","key$":"slug","index$":10},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"The type of account this organization is.","t":"`$STRING`","key$":"type","index$":11}},"id":{"field":"id","name":"id"},"name":"organization","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["email","role","username"],"co":{"id":"POST /v2/organizations/{organizationSlug}/invites","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_slug","or":"organizationSlug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v2/organizations/{organizationSlug}/invites","q":{"$action":"invite","exist":["organization_slug"]},"r":{"param":{"organizationSlug":"organization_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v2"},{"lit":"organizations"},{"var":"organization_slug"},{"lit":"invites"}],"t":{"req":"`reqdata`","res":"`body.invited`"},"index$":0},{"a":true,"bf":["role","username"],"co":{"id":"POST /v1/organizations/{organizationSlug}/members","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_slug","or":"organizationSlug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"POST","o":"/v1/organizations/{organizationSlug}/members","q":{"$action":"member","exist":["organization_slug"]},"r":{"param":{"organizationSlug":"organization_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"organization_slug"},{"lit":"members"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/organizations","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/v1/organizations","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"organizations"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v1/organizations/{organizationSlug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"organizationSlug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/organizations/{organizationSlug}","q":{"exist":["id"]},"r":{"param":{"organizationSlug":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.organization`"},"index$":0}],"key$":"load"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["overages","require_mfa","restore_enabled"],"co":{"id":"PATCH /v1/organizations/{organizationSlug}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"organizationSlug","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"PATCH","o":"/v1/organizations/{organizationSlug}","q":{"exist":["id"]},"r":{"param":{"organizationSlug":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.organization`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"organization","name__orig":"organization","Name":"Organization","name_":"organization","name-":"organization","NAME":"ORGANIZATION","index$":13}, {"active":true,"entity":"organization","key$":"BasicOrganizationFlow","kind":"basic","name":"BasicOrganizationFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"organization_ref01"},"m":{"organization_slug":"organization_slug01"},"o":"create","s":[],"v":[],"unreachable":true},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"organization_ref01"}}]},{"a":true,"d":{},"i":{"ref":"organization_ref01","srcdatavar":"organization_ref01_data","suffix":"_up0","textfield":"name"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-organization_ref01"}}],"v":[]},{"a":true,"d":{},"i":{"ref":"organization_ref01","srcdatavar":"organization_ref01_data","suffix":"_dt0"},"m":{"id":"organization01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-organization_ref01"}}]}]}, 'Organization', {"POST /v2/organizations/{organizationSlug}/invites":{"protocol":"http","requestBody":{"description":"The user you want to invite to join Turso, and your organization. Provide exactly one of email or username.","required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"email":{"type":"string","description":"The email of the user you want to invite. Exactly one of email or username must be provided."},"username":{"type":"string","description":"The username of an existing Turso user you want to invite. Exactly one of email or username must be provided."},"role":{"type":"string","enum":["admin","member","viewer"],"description":"The role given to the user.","default":"member"}}}}}},"parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0}]},"POST /v1/organizations/{organizationSlug}/members":{"protocol":"http","requestBody":{"description":"The member you want to add.","required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"username":{"type":"string","description":"The username of an existing Turso user."},"role":{"type":"string","enum":["admin","member","viewer"],"description":"The role given to the user.","default":"member"}},"required":["email"]}}}},"parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0}]},"GET /v1/organizations":{"protocol":"http","parameters":[]},"GET /v1/organizations/{organizationSlug}":{"protocol":"http","parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0}]},"PATCH /v1/organizations/{organizationSlug}":{"protocol":"http","requestBody":{"description":"The updated organization details.","required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"overages":{"type":"boolean","description":"Enable or disable overages for the organization.","key$":"overages"},"require_mfa":{"type":"boolean","description":"Require all members of the organization to have multi-factor authentication enabled. The requesting user must have MFA enabled on their own account before enabling this requirement.","key$":"require_mfa"},"restore_enabled":{"type":"boolean","description":"Enable or disable deleted database and group recovery for the organization. Must be updated separately from other organization settings. Requires an admin or owner.","key$":"restore_enabled"}},"index$":1}}}},"parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let organization_ref01_data = Object.values(setup.data.existing.organization)[0] as any

    // LIST
    const organization_ref01_ent = client.Organization()
    const organization_ref01_match: any = {}

    const organization_ref01_list = (await organization_ref01_ent.list(organization_ref01_match)).map((e: any) => e.data())


    // UPDATE
    const organization_ref01_data_up0: any = {}
    organization_ref01_data_up0.id = organization_ref01_data.id

    const organization_ref01_markdef_up0 = { name: 'name', value: 'Mark01-organization_ref01_' + setup.now }
    ;(organization_ref01_data_up0 as any)[organization_ref01_markdef_up0.name] = organization_ref01_markdef_up0.value

    const organization_ref01_resdata_up0 = (await organization_ref01_ent.update(organization_ref01_data_up0)).data()
    assert(organization_ref01_resdata_up0.id === organization_ref01_data_up0.id)

    assert((organization_ref01_resdata_up0 as any)[organization_ref01_markdef_up0.name] === organization_ref01_markdef_up0.value)


    // LOAD
    const organization_ref01_match_dt0: any = {}
    organization_ref01_match_dt0.id = organization_ref01_data.id
    const organization_ref01_data_dt0 = (await organization_ref01_ent.load(organization_ref01_match_dt0)).data()
    assert(organization_ref01_data_dt0.id === organization_ref01_data.id)


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
      '../../../../.sdk/test/entity/organization/OrganizationTestData.json')

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
    ['organization01','organization02','organization03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TURSO_PLATFORM_TEST_ORGANIZATION_ENTID': idmap,
    'TURSO_PLATFORM_TEST_LIVE': 'FALSE',
    'TURSO_PLATFORM_TEST_EXPLAIN': 'FALSE',
    'TURSO_PLATFORM_APIKEY': '',
  })

  idmap = env['TURSO_PLATFORM_TEST_ORGANIZATION_ENTID']

  const live = 'TRUE' === env.TURSO_PLATFORM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TURSO_PLATFORM_TEST_ORGANIZATION_ENTID']
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
  
