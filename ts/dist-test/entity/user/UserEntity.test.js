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
(0, node_test_1.describe)('UserEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TURSO_PLATFORM_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TURSO_PLATFORM_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TursoPlatformSDK.test();
        const ent = testsdk.User();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TursoPlatformSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.User().load({ "avatarUrl": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TURSO_PLATFORM_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'user.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "avatarUrl": { "a": true, "h": "Avatar Url", "n": "avatarUrl", "r": false, "sh": "URL to the user's avatar image.", "t": "`$STRING`", "key$": "avatarUrl", "index$": 0 }, "email": { "a": true, "h": "Email", "n": "email", "r": false, "sh": "The primary email address of the user.", "t": "`$STRING`", "key$": "email", "index$": 1 }, "has_pending_invites": { "a": true, "h": "Has Pending Invites", "n": "has_pending_invites", "r": false, "sh": "Whether the user has pending organization invites waiting to be accepted or declined.", "t": "`$BOOLEAN`", "key$": "has_pending_invites", "index$": 2 }, "mfa": { "a": true, "h": "Mfa", "n": "mfa", "r": false, "sh": "Whether the user has multi-factor authentication enabled.", "t": "`$BOOLEAN`", "key$": "mfa", "index$": 3 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "The display name of the user.", "t": "`$STRING`", "key$": "name", "index$": 4 }, "plan": { "a": true, "h": "Plan", "n": "plan", "r": false, "sh": "The user's current plan.", "t": "`$STRING`", "key$": "plan", "index$": 5 }, "username": { "a": true, "h": "Username", "n": "username", "r": false, "sh": "The username of the user.", "t": "`$STRING`", "key$": "username", "index$": 6 } }, "name": "user", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/user", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/v1/user", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "user" }], "t": { "req": "`reqdata`", "res": "`body.user`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "user", "name__orig": "user", "Name": "User", "name_": "user", "name-": "user", "NAME": "USER", "index$": 18 }, { "active": true, "entity": "user", "key$": "BasicUserFlow", "kind": "basic", "name": "BasicUserFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "user_ref01", "srcdatavar": "user_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-user_ref01" } }] }] }, 'User', { "GET /v1/user": { "protocol": "http", "parameters": [] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let user_ref01_data = Object.values(setup.data.existing.user)[0];
        // LOAD
        const user_ref01_ent = client.User();
        const user_ref01_match_dt0 = {};
        const user_ref01_data_dt0 = (await user_ref01_ent.load(user_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != user_ref01_data_dt0);
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/user/UserTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TursoPlatformSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['user01', 'user02', 'user03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TURSO_PLATFORM_TEST_USER_ENTID': idmap,
        'TURSO_PLATFORM_TEST_LIVE': 'FALSE',
        'TURSO_PLATFORM_TEST_EXPLAIN': 'FALSE',
        'TURSO_PLATFORM_APIKEY': '',
    });
    idmap = env['TURSO_PLATFORM_TEST_USER_ENTID'];
    const live = 'TRUE' === env.TURSO_PLATFORM_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TURSO_PLATFORM_TEST_USER_ENTID'];
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
//# sourceMappingURL=UserEntity.test.js.map