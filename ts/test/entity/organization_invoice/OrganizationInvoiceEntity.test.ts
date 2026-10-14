

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


describe('OrganizationInvoiceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TURSO_PLATFORM_TEST_LIVE=TRUE.
  afterEach(liveDelay('TURSO_PLATFORM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TursoPlatformSDK.test()
    const ent = testsdk.OrganizationInvoice()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = TursoPlatformSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.OrganizationInvoice().list({"organization_slug":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TURSO_PLATFORM_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'organization_invoice.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"amount_due":{"a":true,"h":"Amount Due","n":"amount_due","r":false,"sh":"The formatted price in USD for the invoice.","t":"`$STRING`","key$":"amount_due","index$":0},"due_date":{"a":true,"h":"Due Date","n":"due_date","r":false,"sh":"The due date for the invoice.","t":"`$STRING`","key$":"due_date","index$":1},"invoice_number":{"a":true,"h":"Invoice Number","n":"invoice_number","r":false,"sh":"The unique ID for the invoice.","t":"`$STRING`","key$":"invoice_number","index$":2},"invoice_pdf":{"a":true,"h":"Invoice Pdf","n":"invoice_pdf","r":false,"sh":"The link to the invoice PDF you can download.","t":"`$STRING`","key$":"invoice_pdf","index$":3},"paid_at":{"a":true,"h":"Paid At","n":"paid_at","r":false,"sh":"The date the invoice was paid.","t":"`$STRING`","key$":"paid_at","index$":4},"payment_failed_at":{"a":true,"h":"Payment Failed At","n":"payment_failed_at","r":false,"sh":"The date the invoice payment last failed.","t":"`$STRING`","key$":"payment_failed_at","index$":5}},"name":"organization_invoice","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v1/organizations/{organizationSlug}/invoices","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"organization_slug","or":"organizationSlug","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v1/organizations/{organizationSlug}/invoices","q":{"exist":["organization_slug"]},"r":{"param":{"organizationSlug":"organization_slug"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"v1"},{"lit":"organizations"},{"var":"organization_slug"},{"lit":"invoices"}],"t":{"req":"`reqdata`","res":"`body.invoices`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.organization"]]},"key$":"organization_invoice","name__orig":"organization_invoice","Name":"OrganizationInvoice","name_":"organization_invoice","name-":"organization-invoice","NAME":"ORGANIZATION_INVOICE","index$":14}, {"active":true,"entity":"organization_invoice","key$":"BasicOrganizationInvoiceFlow","kind":"basic","name":"BasicOrganizationInvoiceFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"organization_slug":"organization_slug01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"organization_invoice_ref01"}}]}]}, 'OrganizationInvoice', {"GET /v1/organizations/{organizationSlug}/invoices":{"protocol":"http","parameters":[{"in":"path","name":"organizationSlug","required":true,"schema":{"type":"string"},"description":"The slug of the organization or user account.","x-ref":"#/components/parameters/organizationSlug","index$":0},{"name":"type","in":"query","schema":{"type":"string","enum":["all","upcoming","issued"]},"description":"The type of invoice to retrieve.","index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let organization_invoice_ref01_data = Object.values(setup.data.existing.organization_invoice)[0] as any

    // LIST
    const organization_invoice_ref01_ent = client.OrganizationInvoice()
    const organization_invoice_ref01_match: any = {}
    organization_invoice_ref01_match['organization_slug'] = setup.idmap['organization_slug01']

    const organization_invoice_ref01_list = (await organization_invoice_ref01_ent.list(organization_invoice_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/organization_invoice/OrganizationInvoiceTestData.json')

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
    ['organization_invoice01','organization_invoice02','organization_invoice03','organization01','organization02','organization03','organization_slug01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TURSO_PLATFORM_TEST_ORGANIZATION_INVOICE_ENTID': idmap,
    'TURSO_PLATFORM_TEST_LIVE': 'FALSE',
    'TURSO_PLATFORM_TEST_EXPLAIN': 'FALSE',
    'TURSO_PLATFORM_APIKEY': '',
  })

  idmap = env['TURSO_PLATFORM_TEST_ORGANIZATION_INVOICE_ENTID']

  const live = 'TRUE' === env.TURSO_PLATFORM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TURSO_PLATFORM_TEST_ORGANIZATION_INVOICE_ENTID']
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
  
