"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('InstanceEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TURSO_PLATFORM_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TURSO_PLATFORM_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TursoPlatformSDK.test();
        const ent = testsdk.Instance();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TursoPlatformSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Instance().list({ "database_name": 1, "organization_slug": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TURSO_PLATFORM_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'instance.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "hostname": { "a": true, "h": "Hostname", "n": "hostname", "r": false, "sh": "The DNS hostname used for client libSQL and HTTP connections (specific to this instance only).", "t": "`$STRING`", "key$": "hostname", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 1 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "The name of the instance (location code).", "t": "`$STRING`", "key$": "name", "index$": 2 }, "region": { "a": true, "h": "Region", "n": "region", "r": false, "sh": "The location code for the region this instance is located.", "t": "`$STRING`", "key$": "region", "index$": 3 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "The type of database instance this, will be `primary` or `replica`.", "t": "`$STRING`", "key$": "type", "index$": 4 }, "uuid": { "a": true, "h": "Uuid", "n": "uuid", "r": false, "sh": "The instance universal unique identifier (UUID).", "t": "`$STRING`", "key$": "uuid", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "instance", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/organizations/{organizationSlug}/databases/{databaseName}/instances", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "database_name", "or": "databaseName", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_slug", "or": "organizationSlug", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v1/organizations/{organizationSlug}/databases/{databaseName}/instances", "q": { "exist": ["database_name", "organization_slug"] }, "r": { "param": { "databaseName": "database_name", "organizationSlug": "organization_slug" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_slug" }, { "lit": "databases" }, { "var": "database_name" }, { "lit": "instances" }], "t": { "req": "`reqdata`", "res": "`body.instances`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/organizations/{organizationSlug}/databases/{databaseName}/instances/{instanceName}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "database_name", "or": "databaseName", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "instanceName", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_slug", "or": "organizationSlug", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v1/organizations/{organizationSlug}/databases/{databaseName}/instances/{instanceName}", "q": { "exist": ["database_name", "id", "organization_slug"] }, "r": { "param": { "databaseName": "database_name", "instanceName": "id", "organizationSlug": "organization_slug" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_slug" }, { "lit": "databases" }, { "var": "database_name" }, { "lit": "instances" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.instance`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.database"]] }, "key$": "instance", "name__orig": "instance", "Name": "Instance", "name_": "instance", "name-": "instance", "NAME": "INSTANCE", "index$": 9 }, { "active": true, "entity": "instance", "key$": "BasicInstanceFlow", "kind": "basic", "name": "BasicInstanceFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "database_name": "database_name01", "organization_slug": "organization_slug01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "instance_ref01" } }] }, { "a": true, "d": {}, "i": { "ref": "instance_ref01", "srcdatavar": "instance_ref01_data", "suffix": "_dt0" }, "m": { "database_name": "database_name01", "id": "instance01", "organization_slug": "organization_slug01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-instance_ref01" } }] }] }, 'Instance', { "GET /v1/organizations/{organizationSlug}/databases/{databaseName}/instances": { "protocol": "http", "parameters": [{ "in": "path", "name": "organizationSlug", "required": true, "schema": { "type": "string" }, "description": "The slug of the organization or user account.", "x-ref": "#/components/parameters/organizationSlug", "index$": 0 }, { "name": "databaseName", "in": "path", "required": true, "schema": { "type": "string" }, "description": "The name of the database.", "x-ref": "#/components/parameters/databaseName", "index$": 1 }] }, "GET /v1/organizations/{organizationSlug}/databases/{databaseName}/instances/{instanceName}": { "protocol": "http", "parameters": [{ "in": "path", "name": "organizationSlug", "required": true, "schema": { "type": "string" }, "description": "The slug of the organization or user account.", "x-ref": "#/components/parameters/organizationSlug", "index$": 0 }, { "name": "databaseName", "in": "path", "required": true, "schema": { "type": "string" }, "description": "The name of the database.", "x-ref": "#/components/parameters/databaseName", "index$": 1 }, { "name": "instanceName", "in": "path", "required": true, "schema": { "type": "string" }, "description": "The name of the instance (location code).", "x-ref": "#/components/parameters/instanceName", "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let instance_ref01_data = Object.values(setup.data.existing.instance)[0];
        // LIST
        const instance_ref01_ent = client.Instance();
        const instance_ref01_match = {};
        instance_ref01_match['database_name'] = setup.idmap['database_name01'];
        instance_ref01_match['organization_slug'] = setup.idmap['organization_slug01'];
        const instance_ref01_list = (await instance_ref01_ent.list(instance_ref01_match)).map((e) => e.data());
        // LOAD
        const instance_ref01_match_dt0 = {};
        instance_ref01_match_dt0.id = instance_ref01_data.id;
        instance_ref01_match_dt0['database_name'] = setup.idmap['database_name'] ?? setup.idmap['database_name01'];
        instance_ref01_match_dt0['organization_slug'] = setup.idmap['organization_slug'] ?? setup.idmap['organization_slug01'];
        const instance_ref01_data_dt0 = (await instance_ref01_ent.load(instance_ref01_match_dt0)).data();
        (0, node_assert_1.default)(instance_ref01_data_dt0.id === instance_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/instance/InstanceTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TursoPlatformSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['instance01', 'instance02', 'instance03', 'organization01', 'organization02', 'organization03', 'database01', 'database02', 'database03', 'database_name01', 'organization_slug01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TURSO_PLATFORM_TEST_INSTANCE_ENTID': idmap,
        'TURSO_PLATFORM_TEST_LIVE': 'FALSE',
        'TURSO_PLATFORM_TEST_EXPLAIN': 'FALSE',
        'TURSO_PLATFORM_APIKEY': '',
    });
    idmap = env['TURSO_PLATFORM_TEST_INSTANCE_ENTID'];
    const live = 'TRUE' === env.TURSO_PLATFORM_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TURSO_PLATFORM_TEST_INSTANCE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.TursoPlatformSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=InstanceEntity.test.js.map