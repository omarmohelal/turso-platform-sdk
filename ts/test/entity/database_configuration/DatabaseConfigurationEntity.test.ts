

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


describe('DatabaseConfigurationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TURSO_PLATFORM_TEST_LIVE=TRUE.
  afterEach(liveDelay('TURSO_PLATFORM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TursoPlatformSDK.test()
    const ent = testsdk.DatabaseConfiguration()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TursoPlatformSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DatabaseConfiguration().list({"database_name":1,"organization_slug":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TURSO_PLATFORM_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'database_configuration.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"allow_attach":{"a":true,"de":true,"h":"Allow Attach","n":"allow_attach","r":false,"sh":"Allow or disallow attaching databases to the current database.","t":"`$BOOLEAN`","key$":"allow_attach","index$":0},"allowed_aws_vpc_ids":{"a":true,"h":"Allowed Aws Vpc Ids","n":"allowed_aws_vpc_ids","r":false,"sh":"List of allowed AWS VPC endpoint IDs.","t":"`$ARRAY`","key$":"allowed_aws_vpc_ids","index$":1},"allowed_ips":{"a":true,"h":"Allowed Ips","n":"allowed_ips","r":false,"sh":"List of allowed IP addresses and CIDR blocks.","t":"`$ARRAY`","key$":"allowed_ips","index$":2},"block_reads":{"a":true,"h":"Block Reads","n":"block_reads","r":false,"sh":"The current status for blocked reads.","t":"`$BOOLEAN`","key$":"block_reads","index$":3},"block_writes":{"a":true,"h":"Block Writes","n":"block_writes","r":false,"sh":"The current status for blocked writes.","t":"`$BOOLEAN`","key$":"block_writes","index$":4},"delete_protection":{"a":true,"h":"Delete Protection","n":"delete_protection","r":false,"sh":"Prevent the database from being deleted.","t":"`$BOOLEAN`","key$":"delete_protection","index$":5},"size_limit":{"a":true,"h":"Size Limit","n":"size_limit","r":false,"sh":"The maximum size of the database in bytes.","t":"`$STRING`","key$":"size_limit","index$":6}},"name":"database_configuration","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/organizations/{organizationSlug}/databases/{databaseName}/configuration","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"database_name","or":"databaseName","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_slug","or":"organizationSlug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/v1/organizations/{organizationSlug}/databases/{databaseName}/configuration","q":{"exist":["database_name","organization_slug"]},"r":{"param":{"databaseName":"database_name","organizationSlug":"organization_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"organization_slug"},{"lit":"databases"},{"var":"database_name"},{"lit":"configuration"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"update":{"input":"data","name":"update","points":[{"a":true,"bf":["allow_attach","allowed_aws_vpc_ids","allowed_ips","block_reads","block_writes","delete_protection","size_limit"],"co":{"id":"PATCH /v1/organizations/{organizationSlug}/databases/{databaseName}/configuration","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"database_name","or":"databaseName","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"organization_slug","or":"organizationSlug","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"PATCH","o":"/v1/organizations/{organizationSlug}/databases/{databaseName}/configuration","q":{"exist":["database_name","organization_slug"]},"r":{"param":{"databaseName":"database_name","organizationSlug":"organization_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"organization_slug"},{"lit":"databases"},{"var":"database_name"},{"lit":"configuration"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.organization","$.main.kit.entity.database"]]},"key$":"database_configuration","name__orig":"database_configuration","Name":"DatabaseConfiguration","name_":"database_configuration","name-":"database-configuration","NAME":"DATABASE_CONFIGURATION","index$":3}, {"active":true,"entity":"database_configuration","key$":"BasicDatabaseConfigurationFlow","kind":"basic","name":"BasicDatabaseConfigurationFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"database_name":"database_name01","organization_slug":"organization_slug01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"database_configuration_ref01"}}]},{"a":false,"d":{"organization_slug":"organization_slug01"},"i":{"ref":"database_configuration_ref01","srcdatavar":"database_configuration_ref01_data","suffix":"_up0","textfield":"size_limit"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-database_configuration_ref01"}}],"v":[],"unreachable":true}]}, 'DatabaseConfiguration', {"GET /v1/organizations/{organizationSlug}/databases/{databaseName}/configuration":{"protocol":"http","parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0},{"name":"databaseName","in":"path","required":true,"schema":{"type":"string"},"description":"The name of the database.","x-ref":"#/components/parameters/databaseName","index$":1}]},"PATCH /v1/organizations/{organizationSlug}/databases/{databaseName}/configuration":{"protocol":"http","requestBody":{"description":"The configuration to be applied to the chosen database.","required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"size_limit":{"type":"string","description":"The maximum size of the database in bytes. Values with units are also accepted, e.g. 1mb, 256mb, 1gb.","key$":"size_limit"},"allow_attach":{"type":"boolean","description":"Allow or disallow attaching databases to the current database.","deprecated":true,"key$":"allow_attach"},"block_reads":{"type":"boolean","description":"Block all database reads.","example":false,"key$":"block_reads"},"block_writes":{"type":"boolean","description":"Block all database writes.","example":false,"key$":"block_writes"},"delete_protection":{"type":"boolean","description":"Prevent the database from being deleted.","example":true,"key$":"delete_protection"},"allowed_ips":{"type":"array","items":{"type":"string"},"description":"List of allowed IP addresses and CIDR blocks. Only connections from these sources are accepted. Pass an empty array to clear the list. Omit to leave unchanged.","example":["203.0.113.7","10.0.0.0/8"],"key$":"allowed_ips"},"allowed_aws_vpc_ids":{"type":"array","items":{"type":"string"},"description":"List of allowed AWS VPC endpoint IDs (vpce-...). Only connections arriving through these endpoints are accepted. Pass an empty array to clear the list. Omit to leave unchanged.","example":["vpce-0fe6c8807461bba49"],"key$":"allowed_aws_vpc_ids"}},"x-ref":"#/components/schemas/DatabaseConfigurationInput","index$":1}}}},"parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0},{"name":"databaseName","in":"path","required":true,"schema":{"type":"string"},"description":"The name of the database.","x-ref":"#/components/parameters/databaseName","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let database_configuration_ref01_data = Object.values(setup.data.existing.database_configuration)[0] as any

    // LIST
    const database_configuration_ref01_ent = client.DatabaseConfiguration()
    const database_configuration_ref01_match: any = {}
    database_configuration_ref01_match['database_name'] = setup.idmap['database_name01']
    database_configuration_ref01_match['organization_slug'] = setup.idmap['organization_slug01']

    const database_configuration_ref01_list = (await database_configuration_ref01_ent.list(database_configuration_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/database_configuration/DatabaseConfigurationTestData.json')

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
    ['database_configuration01','database_configuration02','database_configuration03','organization01','organization02','organization03','database01','database02','database03','database_name01','organization_slug01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TURSO_PLATFORM_TEST_DATABASE_CONFIGURATION_ENTID': idmap,
    'TURSO_PLATFORM_TEST_LIVE': 'FALSE',
    'TURSO_PLATFORM_TEST_EXPLAIN': 'FALSE',
    'TURSO_PLATFORM_APIKEY': '',
  })

  idmap = env['TURSO_PLATFORM_TEST_DATABASE_CONFIGURATION_ENTID']

  const live = 'TRUE' === env.TURSO_PLATFORM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TURSO_PLATFORM_TEST_DATABASE_CONFIGURATION_ENTID']
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
  
