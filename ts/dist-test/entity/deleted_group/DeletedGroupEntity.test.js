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
(0, node_test_1.describe)('DeletedGroupEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TURSO_PLATFORM_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TURSO_PLATFORM_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TursoPlatformSDK.test();
        const ent = testsdk.DeletedGroup();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TursoPlatformSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.DeletedGroup().list({ "organization_id": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TURSO_PLATFORM_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'deleted_group.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "cascade_databases": { "a": true, "h": "Cascade Databases", "n": "cascade_databases", "r": false, "sh": "The number of member databases that restoring the group would bring back with it.", "t": "`$INTEGER`", "key$": "cascade_databases", "index$": 0 }, "deleted_at": { "a": true, "fo": "date-time", "h": "Deleted At", "n": "deleted_at", "r": false, "sh": "When the group was deleted.", "t": "`$STRING`", "key$": "deleted_at", "index$": 1 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "The group name.", "t": "`$STRING`", "key$": "name", "index$": 2 }, "uuid": { "a": true, "fo": "uuid", "h": "Uuid", "n": "uuid", "r": false, "sh": "The group UUID.", "t": "`$STRING`", "key$": "uuid", "index$": 3 } }, "name": "deleted_group", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v3/organizations/{organizationId}/deleted-groups", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organizationId", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 100, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v3/organizations/{organizationId}/deleted-groups", "q": { "exist": ["organization_id"] }, "r": { "param": { "organizationId": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v3" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "deleted-groups" }], "t": { "req": "`reqdata`", "res": "`body.groups`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "key$": "deleted_group", "name__orig": "deleted_group", "Name": "DeletedGroup", "name_": "deleted_group", "name-": "deleted-group", "NAME": "DELETED_GROUP", "index$": 6 }, { "active": true, "entity": "deleted_group", "key$": "BasicDeletedGroupFlow", "kind": "basic", "name": "BasicDeletedGroupFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "organization_id": "organization01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "deleted_group_ref01" } }] }] }, 'DeletedGroup', { "GET /v3/organizations/{organizationId}/deleted-groups": { "protocol": "http", "parameters": [{ "name": "organizationId", "in": "path", "required": true, "schema": { "type": "string", "format": "uuid" }, "description": "The UUID of the organization. Retrieve it with the Retrieve Organization endpoint (the `id` field).", "x-ref": "#/components/parameters/organizationId", "index$": 0 }, { "name": "limit", "in": "query", "schema": { "type": "integer", "default": 100 }, "description": "Page size, from 1 to 1000.", "index$": 1 }, { "name": "cursor", "in": "query", "schema": { "type": "string" }, "description": "Opaque pagination cursor from the previous page's `pagination.next`.", "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let deleted_group_ref01_data = Object.values(setup.data.existing.deleted_group)[0];
        // LIST
        const deleted_group_ref01_ent = client.DeletedGroup();
        const deleted_group_ref01_match = {};
        deleted_group_ref01_match['organization_id'] = setup.idmap['organization01'];
        const deleted_group_ref01_list = (await deleted_group_ref01_ent.list(deleted_group_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/deleted_group/DeletedGroupTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TursoPlatformSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['deleted_group01', 'deleted_group02', 'deleted_group03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TURSO_PLATFORM_TEST_DELETED_GROUP_ENTID': idmap,
        'TURSO_PLATFORM_TEST_LIVE': 'FALSE',
        'TURSO_PLATFORM_TEST_EXPLAIN': 'FALSE',
        'TURSO_PLATFORM_APIKEY': '',
    });
    idmap = env['TURSO_PLATFORM_TEST_DELETED_GROUP_ENTID'];
    const live = 'TRUE' === env.TURSO_PLATFORM_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TURSO_PLATFORM_TEST_DELETED_GROUP_ENTID'];
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
//# sourceMappingURL=DeletedGroupEntity.test.js.map