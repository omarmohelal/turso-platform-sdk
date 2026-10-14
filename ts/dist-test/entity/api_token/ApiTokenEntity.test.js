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
(0, node_test_1.describe)('ApiTokenEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TURSO_PLATFORM_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TURSO_PLATFORM_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TursoPlatformSDK.test();
        const ent = testsdk.ApiToken();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('api_token hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.TursoPlatformSDK.test(offline).ApiToken().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.TursoPlatformSDK.test(offline).ApiToken()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.TursoPlatformSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.ApiToken().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.TursoPlatformSDK.test().ApiToken().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.TursoPlatformSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.ApiToken().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.ApiToken().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TursoPlatformSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.ApiToken().list({ "created_at": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TURSO_PLATFORM_TEST_LIVE;
        for (const op of ['list', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'api_token.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "created_at": { "a": true, "h": "Created At", "n": "created_at", "r": false, "sh": "The date the token was created.", "t": "`$STRING`", "key$": "created_at", "index$": 0 }, "group": { "a": true, "h": "Group", "n": "group", "r": false, "sh": "The group name (inside `organization`) to restrict this token to.", "t": "`$STRING`", "key$": "group", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "The ID generated by Turso for the API Token.", "t": "`$STRING`", "key$": "id", "index$": 2 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "The name given to the API Token.", "t": "`$STRING`", "key$": "name", "index$": 3 }, "organization": { "a": true, "h": "Organization", "n": "organization", "r": false, "sh": "The organization slug to restrict this token to.", "t": "`$STRING`", "key$": "organization", "index$": 4 }, "owner": { "a": true, "h": "Owner", "n": "owner", "r": false, "sh": "The user who minted the token.", "t": "`$OBJECT`", "key$": "owner", "index$": 5 }, "scopes": { "a": true, "h": "Scopes", "n": "scopes", "r": false, "sh": "Permissions to grant a group-scoped token.", "t": "`$ARRAY`", "key$": "scopes", "index$": 6 }, "token": { "a": true, "h": "Token", "n": "token", "r": false, "sh": "The actual token contents as a JWT.", "t": "`$STRING`", "key$": "token", "index$": 7 } }, "id": { "field": "id", "name": "id" }, "name": "api_token", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["group", "organization", "scopes"], "co": { "id": "POST /v1/auth/api-tokens/{tokenName}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "tokenName", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v1/auth/api-tokens/{tokenName}", "q": { "exist": ["id"] }, "r": { "param": { "tokenName": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "auth" }, { "lit": "api-tokens" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v1/organizations/{organizationSlug}/api-tokens", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_slug", "or": "organizationSlug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/v1/organizations/{organizationSlug}/api-tokens", "q": { "exist": ["organization_slug"] }, "r": { "param": { "organizationSlug": "organization_slug" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_slug" }, { "lit": "api-tokens" }], "t": { "req": "`reqdata`", "res": "`body.tokens`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v1/auth/api-tokens", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/v1/auth/api-tokens", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "auth" }, { "lit": "api-tokens" }], "t": { "req": "`reqdata`", "res": "`body.tokens`" }, "index$": 1 }], "key$": "list" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v1/organizations/{organizationSlug}/api-tokens/{tokenId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "clGFZ4STEe6fljpFzIum8A", "k": "param", "n": "id", "or": "tokenId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_slug", "or": "organizationSlug", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/v1/organizations/{organizationSlug}/api-tokens/{tokenId}", "q": { "exist": ["id", "organization_slug"] }, "r": { "param": { "organizationSlug": "organization_slug", "tokenId": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_slug" }, { "lit": "api-tokens" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "DELETE /v1/auth/api-tokens/{tokenName}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "tokenName", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/v1/auth/api-tokens/{tokenName}", "q": { "exist": ["id"] }, "r": { "param": { "tokenName": "id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "auth" }, { "lit": "api-tokens" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"]] }, "key$": "api_token", "name__orig": "api_token", "Name": "ApiToken", "name_": "api_token", "name-": "api-token", "NAME": "API_TOKEN", "index$": 0 }, { "active": true, "entity": "api_token", "key$": "BasicApiTokenFlow", "kind": "basic", "name": "BasicApiTokenFlow", "param": {}, "step": [{ "a": false, "d": {}, "i": { "ref": "api_token_ref01" }, "m": { "organization_slug": "organization_slug01", "token_name": "token_name01" }, "o": "create", "s": [], "v": [], "unreachable": true }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "api_token_ref01" } }] }, { "a": true, "d": {}, "i": { "ref": "api_token_ref01", "suffix": "_rm0" }, "m": { "id": "api_token01" }, "o": "remove", "s": [], "v": [] }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "api_token_ref01" } }] }] }, 'ApiToken', { "POST /v1/auth/api-tokens/{tokenName}": { "protocol": "http", "requestBody": { "description": "Optional restriction for the token. Omit the body for an unrestricted token, pass `organization` alone for an org-scoped token, or pass `organization` + `group` + `scopes` for a group-scoped token.", "required": false, "content": { "application/json": { "schema": { "type": "object", "properties": { "organization": { "type": "string", "description": "The organization slug to restrict this token to. Required when `group` is set.", "example": "my-org", "key$": "organization" }, "group": { "type": "string", "description": "The group name (inside `organization`) to restrict this token to. Requires `organization` and a non-empty `scopes` list.", "example": "default", "key$": "group" }, "scopes": { "type": "array", "items": { "type": "string", "enum": ["read", "db:create", "db:delete", "db:configure", "db:mint-token", "db:rotate-creds", "group:configure", "group:mint-token", "group:rotate-creds", "read-only", "full-access"] }, "description": "Permissions to grant a group-scoped token. Each entry is either an individual scope or one of the presets `read-only` (expands to `read`) and `full-access` (expands to every scope). Required and must be non-empty when `group` is set. `db:mint-token` lets the token issue new SQL credentials; `db:rotate-creds` invalidates every existing SQL token for the database — they are deliberately separate because rotation is destructive.", "example": ["db:create", "db:configure", "db:mint-token"], "key$": "scopes" } }, "index$": 1 } } } }, "parameters": [{ "name": "tokenName", "in": "path", "required": true, "schema": { "type": "string" }, "description": "The name of the api token.", "x-ref": "#/components/parameters/tokenName", "index$": 0 }] }, "GET /v1/organizations/{organizationSlug}/api-tokens": { "protocol": "http", "parameters": [{ "in": "path", "name": "organizationSlug", "required": true, "schema": { "type": "string" }, "description": "The slug of the organization or user account.", "x-ref": "#/components/parameters/organizationSlug", "index$": 0 }] }, "GET /v1/auth/api-tokens": { "protocol": "http", "parameters": [] }, "DELETE /v1/organizations/{organizationSlug}/api-tokens/{tokenId}": { "protocol": "http", "parameters": [{ "in": "path", "name": "organizationSlug", "required": true, "schema": { "type": "string" }, "description": "The slug of the organization or user account.", "x-ref": "#/components/parameters/organizationSlug", "index$": 0 }, { "name": "tokenId", "in": "path", "required": true, "schema": { "type": "string" }, "description": "The ID of the token to revoke (from the list endpoint).", "example": "clGFZ4STEe6fljpFzIum8A", "index$": 1 }] }, "DELETE /v1/auth/api-tokens/{tokenName}": { "protocol": "http", "parameters": [{ "name": "tokenName", "in": "path", "required": true, "schema": { "type": "string" }, "description": "The name of the api token.", "x-ref": "#/components/parameters/tokenName", "index$": 0 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let api_token_ref01_data = Object.values(setup.data.existing.api_token)[0];
        // LIST
        const api_token_ref01_ent = client.ApiToken();
        const api_token_ref01_match = {};
        const api_token_ref01_list = (await api_token_ref01_ent.list(api_token_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/api_token/ApiTokenTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TursoPlatformSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['api_token01', 'api_token02', 'api_token03', 'organization01', 'organization02', 'organization03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TURSO_PLATFORM_TEST_API_TOKEN_ENTID': idmap,
        'TURSO_PLATFORM_TEST_LIVE': 'FALSE',
        'TURSO_PLATFORM_TEST_EXPLAIN': 'FALSE',
        'TURSO_PLATFORM_APIKEY': '',
    });
    idmap = env['TURSO_PLATFORM_TEST_API_TOKEN_ENTID'];
    const live = 'TRUE' === env.TURSO_PLATFORM_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TURSO_PLATFORM_TEST_API_TOKEN_ENTID'];
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
//# sourceMappingURL=ApiTokenEntity.test.js.map