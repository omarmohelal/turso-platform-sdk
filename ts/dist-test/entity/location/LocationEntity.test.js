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
(0, node_test_1.describe)('LocationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TURSO_PLATFORM_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TURSO_PLATFORM_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TursoPlatformSDK.test();
        const ent = testsdk.Location();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TursoPlatformSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Location().load({ "awsapnortheast1": 1, "id": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TURSO_PLATFORM_TEST_LIVE;
        for (const op of ['load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'location.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "awsapnortheast1": { "a": true, "h": "Awsapnortheast1", "n": "awsapnortheast1", "r": false, "t": "`$STRING`", "key$": "awsapnortheast1", "index$": 0 }, "awsapsouth1": { "a": true, "h": "Awsapsouth1", "n": "awsapsouth1", "r": false, "t": "`$STRING`", "key$": "awsapsouth1", "index$": 1 }, "awseuwest1": { "a": true, "h": "Awseuwest1", "n": "awseuwest1", "r": false, "t": "`$STRING`", "key$": "awseuwest1", "index$": 2 }, "awsuseast1": { "a": true, "h": "Awsuseast1", "n": "awsuseast1", "r": false, "t": "`$STRING`", "key$": "awsuseast1", "index$": 3 }, "awsuseast2": { "a": true, "h": "Awsuseast2", "n": "awsuseast2", "r": false, "t": "`$STRING`", "key$": "awsuseast2", "index$": 4 }, "awsuswest2": { "a": true, "h": "Awsuswest2", "n": "awsuswest2", "r": false, "t": "`$STRING`", "key$": "awsuswest2", "index$": 5 }, "delete_protection": { "a": true, "h": "Delete Protection", "n": "delete_protection", "r": false, "sh": "The current status for delete protection.", "t": "`$BOOLEAN`", "key$": "delete_protection", "index$": 6 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 7 }, "locations": { "a": true, "de": true, "h": "Locations", "n": "locations", "r": false, "sh": "An array of location keys the group is located.", "t": "`$ARRAY`", "key$": "locations", "index$": 8 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "The group name, unique across your organization.", "t": "`$STRING`", "key$": "name", "index$": 9 }, "primary": { "a": true, "h": "Primary", "n": "primary", "r": false, "sh": "The primary location key.", "t": "`$STRING`", "key$": "primary", "index$": 10 }, "uuid": { "a": true, "h": "Uuid", "n": "uuid", "r": false, "sh": "The group universal unique identifier (UUID).", "t": "`$STRING`", "key$": "uuid", "index$": 11 }, "version": { "a": true, "de": true, "h": "Version", "n": "version", "r": false, "sh": "The current libSQL server version the databases in that group are running.", "t": "`$STRING`", "key$": "version", "index$": 12 } }, "id": { "field": "id", "name": "id" }, "name": "location", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /v1/organizations/{organizationSlug}/groups/{groupName}/locations/{location}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "group_name", "or": "groupName", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "aws-us-east-1", "k": "param", "n": "id", "or": "location", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_slug", "or": "organizationSlug", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "POST", "o": "/v1/organizations/{organizationSlug}/groups/{groupName}/locations/{location}", "q": { "exist": ["group_name", "id", "organization_slug"] }, "r": { "param": { "groupName": "group_name", "location": "id", "organizationSlug": "organization_slug" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_slug" }, { "lit": "groups" }, { "var": "group_name" }, { "lit": "locations" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.group`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/locations", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/v1/locations", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "locations" }], "t": { "req": "`reqdata`", "res": "`body.locations`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v1/organizations/{organizationSlug}/groups/{groupName}/locations/{location}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "group_name", "or": "groupName", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "id", "or": "location", "r": true, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "param", "n": "organization_slug", "or": "organizationSlug", "r": true, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "DELETE", "o": "/v1/organizations/{organizationSlug}/groups/{groupName}/locations/{location}", "q": { "exist": ["group_name", "id", "organization_slug"] }, "r": { "param": { "groupName": "group_name", "location": "id", "organizationSlug": "organization_slug" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_slug" }, { "lit": "groups" }, { "var": "group_name" }, { "lit": "locations" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.group`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.organization", "$.main.kit.entity.group"]] }, "key$": "location", "name__orig": "location", "Name": "Location", "name_": "location", "name-": "location", "NAME": "LOCATION", "index$": 11 }, { "active": true, "entity": "location", "key$": "BasicLocationFlow", "kind": "basic", "name": "BasicLocationFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "location_ref01" }, "m": { "group_name": "group_name01", "location": "location01", "organization_slug": "organization_slug01" }, "o": "create", "s": [], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": { "ref": "location_ref01", "srcdatavar": "location_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-location_ref01" } }] }, { "a": true, "d": {}, "i": { "ref": "location_ref01", "suffix": "_rm0" }, "m": { "group_name": "group_name01", "id": "location01", "organization_slug": "organization_slug01" }, "o": "remove", "s": [], "v": [] }] }, 'Location', { "POST /v1/organizations/{organizationSlug}/groups/{groupName}/locations/{location}": { "protocol": "http", "parameters": [{ "in": "path", "name": "organizationSlug", "required": true, "schema": { "type": "string" }, "description": "The slug of the organization or user account.", "x-ref": "#/components/parameters/organizationSlug", "index$": 0 }, { "name": "groupName", "in": "path", "required": true, "schema": { "type": "string" }, "description": "The name of the group.", "x-ref": "#/components/parameters/groupName", "index$": 1 }, { "name": "location", "in": "path", "required": true, "schema": { "type": "string" }, "description": "The location code to add to the group.", "example": "aws-us-east-1", "index$": 2 }] }, "GET /v1/locations": { "protocol": "http", "parameters": [] }, "DELETE /v1/organizations/{organizationSlug}/groups/{groupName}/locations/{location}": { "protocol": "http", "parameters": [{ "in": "path", "name": "organizationSlug", "required": true, "schema": { "type": "string" }, "description": "The slug of the organization or user account.", "x-ref": "#/components/parameters/organizationSlug", "index$": 0 }, { "name": "groupName", "in": "path", "required": true, "schema": { "type": "string" }, "description": "The name of the group.", "x-ref": "#/components/parameters/groupName", "index$": 1 }, { "name": "location", "in": "path", "required": true, "schema": { "type": "string" }, "description": "The location code to remove from the group.", "index$": 2 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let location_ref01_data = Object.values(setup.data.existing.location)[0];
        // LOAD
        const location_ref01_ent = client.Location();
        const location_ref01_match_dt0 = {};
        location_ref01_match_dt0.id = location_ref01_data.id;
        const location_ref01_data_dt0 = (await location_ref01_ent.load(location_ref01_match_dt0)).data();
        (0, node_assert_1.default)(location_ref01_data_dt0.id === location_ref01_data.id);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/location/LocationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TursoPlatformSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['location01', 'location02', 'location03', 'organization01', 'organization02', 'organization03', 'group01', 'group02', 'group03', 'group_name01', 'organization_slug01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TURSO_PLATFORM_TEST_LOCATION_ENTID': idmap,
        'TURSO_PLATFORM_TEST_LIVE': 'FALSE',
        'TURSO_PLATFORM_TEST_EXPLAIN': 'FALSE',
        'TURSO_PLATFORM_APIKEY': '',
    });
    idmap = env['TURSO_PLATFORM_TEST_LOCATION_ENTID'];
    const live = 'TRUE' === env.TURSO_PLATFORM_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TURSO_PLATFORM_TEST_LOCATION_ENTID'];
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
//# sourceMappingURL=LocationEntity.test.js.map