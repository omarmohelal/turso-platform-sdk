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
(0, node_test_1.describe)('DatabaseEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TURSO_PLATFORM_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TURSO_PLATFORM_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TursoPlatformSDK.test();
        const ent = testsdk.Database();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.TursoPlatformSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Database().list({ "organization_id": 1, "deleted": true }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TURSO_PLATFORM_TEST_LIVE;
        for (const op of ['create', 'list', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'database.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "DbId": { "a": true, "fo": "uuid", "h": "Db Id", "n": "DbId", "r": false, "sh": "The database universal unique identifier (UUID).", "t": "`$STRING`", "key$": "DbId", "index$": 0 }, "Hostname": { "a": true, "h": "Hostname", "n": "Hostname", "r": false, "sh": "The DNS hostname used for client libSQL and HTTP connections.", "t": "`$STRING`", "key$": "Hostname", "index$": 1 }, "Name": { "a": true, "h": "Name", "n": "Name", "r": false, "sh": "The database name, **unique** across your organization.", "t": "`$STRING`", "key$": "Name", "index$": 2 }, "block_reads": { "a": true, "h": "Block Reads", "n": "block_reads", "r": false, "sh": "The current status for blocked reads.", "t": "`$BOOLEAN`", "key$": "block_reads", "index$": 3 }, "block_writes": { "a": true, "h": "Block Writes", "n": "block_writes", "r": false, "sh": "The current status for blocked writes.", "t": "`$BOOLEAN`", "key$": "block_writes", "index$": 4 }, "delete_protection": { "a": true, "h": "Delete Protection", "n": "delete_protection", "r": false, "sh": "The current status for delete protection.", "t": "`$BOOLEAN`", "key$": "delete_protection", "index$": 5 }, "deleted_at": { "a": true, "fo": "date-time", "h": "Deleted At", "n": "deleted_at", "r": false, "sh": "When the database was deleted.", "t": "`$STRING`", "key$": "deleted_at", "index$": 6 }, "group": { "a": true, "h": "Group", "n": "group", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The name of the group the database belongs to.", "t": "`$STRING`", "key$": "group", "index$": 7 }, "group_deleted_at": { "a": true, "fo": "date-time", "h": "Group Deleted At", "n": "group_deleted_at", "r": false, "sh": "Set when the database's group was deleted with it.", "t": "`$STRING`", "key$": "group_deleted_at", "index$": 8 }, "group_id": { "a": true, "fo": "uuid", "h": "Group Id", "n": "group_id", "r": false, "sh": "The UUID of the group the database belonged to.", "t": "`$STRING`", "key$": "group_id", "index$": 9 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 10 }, "name": { "a": true, "h": "Name", "n": "name", "r": true, "sh": "The name of the new database.", "t": "`$STRING`", "key$": "name", "index$": 11 }, "organization_id": { "a": true, "fo": "uuid", "h": "Organization Id", "n": "organization_id", "r": false, "sh": "The UUID of the organization.", "t": "`$STRING`", "key$": "organization_id", "index$": 12 }, "parent": { "a": true, "h": "Parent", "n": "parent", "r": false, "t": "`$OBJECT`", "key$": "parent", "index$": 13 }, "primaryRegion": { "a": true, "h": "Primary Region", "n": "primaryRegion", "r": false, "sh": "The primary region location code the group the database belongs to.", "t": "`$STRING`", "key$": "primaryRegion", "index$": 14 }, "regions": { "a": true, "de": true, "h": "Regions", "n": "regions", "r": false, "sh": "A list of regions for the group the database belongs to.", "t": "`$ARRAY`", "key$": "regions", "index$": 15 }, "remote_encryption": { "a": true, "h": "Remote Encryption", "n": "remote_encryption", "r": false, "sh": "Encryption configuration for the database.", "t": "`$OBJECT`", "key$": "remote_encryption", "index$": 16 }, "seed": { "a": true, "h": "Seed", "n": "seed", "r": false, "t": "`$OBJECT`", "key$": "seed", "index$": 17 }, "size_limit": { "a": true, "h": "Size Limit", "n": "size_limit", "r": false, "sh": "The maximum size of the database in bytes.", "t": "`$STRING`", "key$": "size_limit", "index$": 18 } }, "id": { "field": "id", "name": "id" }, "name": "database", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "bf": ["name"], "co": { "id": "POST /v3/organizations/{organizationId}/databases/{databaseId}/restore", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "databaseId", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_id", "or": "organizationId", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/v3/organizations/{organizationId}/databases/{databaseId}/restore", "q": { "$action": "restore", "exist": ["id", "organization_id"] }, "r": { "param": { "databaseId": "id", "organizationId": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v3" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "databases" }, { "var": "id" }, { "lit": "restore" }], "t": { "req": "`reqdata`", "res": "`body.database`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /v1/organizations/{organizationSlug}/databases/{databaseName}/auth/rotate", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "database_name", "or": "databaseName", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_slug", "or": "organizationSlug", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/v1/organizations/{organizationSlug}/databases/{databaseName}/auth/rotate", "q": { "$action": "rotate", "exist": ["database_name", "organization_slug"] }, "r": { "param": { "databaseName": "database_name", "organizationSlug": "organization_slug" } }, "s": [{ "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_slug" }, { "lit": "databases" }, { "var": "database_name" }, { "lit": "auth" }, { "lit": "rotate" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "a": true, "bf": ["permissions"], "co": { "id": "POST /v1/organizations/{organizationSlug}/databases/{databaseName}/auth/tokens", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "database_name", "or": "databaseName", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_slug", "or": "organizationSlug", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "ex": "full-access", "k": "query", "n": "authorization", "or": "authorization", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "never", "k": "query", "n": "expiration", "or": "expiration", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "POST", "o": "/v1/organizations/{organizationSlug}/databases/{databaseName}/auth/tokens", "q": { "$action": "token", "exist": ["database_name", "organization_slug"] }, "r": { "param": { "databaseName": "database_name", "organizationSlug": "organization_slug" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_slug" }, { "lit": "databases" }, { "var": "database_name" }, { "lit": "auth" }, { "lit": "tokens" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }, { "a": true, "bf": ["group", "name", "remote_encryption", "seed", "size_limit"], "co": { "id": "POST /v1/organizations/{organizationSlug}/databases", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_slug", "or": "organizationSlug", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/v1/organizations/{organizationSlug}/databases", "q": { "exist": ["organization_slug"] }, "r": { "param": { "organizationSlug": "organization_slug" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_slug" }, { "lit": "databases" }], "t": { "req": "`reqdata`", "res": "`body.database`" }, "index$": 3 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v3/organizations/{organizationId}/databases", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_id", "or": "organizationId", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "cursor", "or": "cursor", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "deleted", "or": "deleted", "r": true, "t": "`$BOOLEAN`", "index$": 1 }, { "a": true, "ex": 100, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/v3/organizations/{organizationId}/databases", "q": { "exist": ["deleted", "organization_id"] }, "r": { "param": { "organizationId": "organization_id" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v3" }, { "lit": "organizations" }, { "var": "organization_id" }, { "lit": "databases" }], "t": { "req": "`reqdata`", "res": "`body.databases`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /v1/organizations/{organizationSlug}/databases", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "organization_slug", "or": "organizationSlug", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "group", "or": "group", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "parent", "or": "parent", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "k": "query", "n": "schema", "or": "schema", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/v1/organizations/{organizationSlug}/databases", "q": { "exist": ["organization_slug"] }, "r": { "param": { "organizationSlug": "organization_slug" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_slug" }, { "lit": "databases" }], "t": { "req": "`reqdata`", "res": "`body.databases`" }, "index$": 1 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /v1/organizations/{organizationSlug}/databases/{databaseName}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "databaseName", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_slug", "or": "organizationSlug", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/v1/organizations/{organizationSlug}/databases/{databaseName}", "q": { "exist": ["id", "organization_slug"] }, "r": { "param": { "databaseName": "id", "organizationSlug": "organization_slug" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_slug" }, { "lit": "databases" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.database`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /v1/organizations/{organizationSlug}/databases/{databaseName}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "databaseName", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "organization_slug", "or": "organizationSlug", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/v1/organizations/{organizationSlug}/databases/{databaseName}", "q": { "exist": ["id", "organization_slug"] }, "r": { "param": { "databaseName": "id", "organizationSlug": "organization_slug" } }, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "v1" }, { "lit": "organizations" }, { "var": "organization_slug" }, { "lit": "databases" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [["$.main.kit.entity.organization"], ["$.main.kit.entity.organization"]] }, "key$": "database", "name__orig": "database", "Name": "Database", "name_": "database", "name-": "database", "NAME": "DATABASE", "index$": 2 }, { "active": true, "entity": "database", "key$": "BasicDatabaseFlow", "kind": "basic", "name": "BasicDatabaseFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "database_ref01" }, "m": { "organization_id": "organization01", "organization_slug": "organization_slug01" }, "o": "create", "s": [], "v": [] }, { "a": true, "d": {}, "i": {}, "m": { "organization_slug": "organization_slug01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "database_ref01" } }] }, { "a": true, "d": {}, "i": { "ref": "database_ref01", "srcdatavar": "database_ref01_data", "suffix": "_dt0" }, "m": { "id": "database01", "organization_slug": "organization_slug01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-database_ref01" } }] }, { "a": true, "d": {}, "i": { "ref": "database_ref01", "suffix": "_rm0" }, "m": { "id": "database01", "organization_slug": "organization_slug01" }, "o": "remove", "s": [], "v": [] }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": { "organization_slug": "organization_slug01" }, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "database_ref01" } }] }] }, 'Database', { "POST /v3/organizations/{organizationId}/databases/{databaseId}/restore": { "protocol": "http", "requestBody": { "required": false, "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "type": "string", "description": "Optional new name for the restored database. If omitted, the original name is reused. The hostname is re-derived from the name." } } } } } }, "parameters": [{ "name": "organizationId", "in": "path", "required": true, "schema": { "type": "string", "format": "uuid" }, "description": "The UUID of the organization. Retrieve it with the Retrieve Organization endpoint (the `id` field).", "x-ref": "#/components/parameters/organizationId", "index$": 0 }, { "name": "databaseId", "in": "path", "required": true, "schema": { "type": "string", "format": "uuid" }, "description": "The UUID of the database, as returned when listing deleted databases (the `DbId` field).", "x-ref": "#/components/parameters/databaseId", "index$": 1 }] }, "POST /v1/organizations/{organizationSlug}/databases/{databaseName}/auth/rotate": { "protocol": "http", "parameters": [{ "in": "path", "name": "organizationSlug", "required": true, "schema": { "type": "string" }, "description": "The slug of the organization or user account.", "x-ref": "#/components/parameters/organizationSlug", "index$": 0 }, { "name": "databaseName", "in": "path", "required": true, "schema": { "type": "string" }, "description": "The name of the database.", "x-ref": "#/components/parameters/databaseName", "index$": 1 }] }, "POST /v1/organizations/{organizationSlug}/databases/{databaseName}/auth/tokens": { "protocol": "http", "requestBody": { "description": "Additional context such as claims required for the token.", "required": false, "content": { "application/json": { "schema": { "type": "object", "properties": { "permissions": { "type": "object", "description": "The permissions for the token.", "properties": { "read_attach": { "type": "object", "description": "Read `ATTACH` permission for the token.", "properties": { "databases": {} } } } } }, "x-ref": "#/components/schemas/CreateTokenInput" } } } }, "parameters": [{ "in": "path", "name": "organizationSlug", "required": true, "schema": { "type": "string" }, "description": "The slug of the organization or user account.", "x-ref": "#/components/parameters/organizationSlug", "index$": 0 }, { "name": "databaseName", "in": "path", "required": true, "schema": { "type": "string" }, "description": "The name of the database.", "x-ref": "#/components/parameters/databaseName", "index$": 1 }, { "name": "expiration", "in": "query", "schema": { "type": "string", "default": "never" }, "description": "Expiration time for the token (e.g., 2w1d30m).", "index$": 2 }, { "name": "authorization", "in": "query", "schema": { "type": "string", "default": "full-access", "enum": ["full-access", "read-only"] }, "description": "Authorization level for the token (full-access or read-only).", "index$": 3 }] }, "POST /v1/organizations/{organizationSlug}/databases": { "protocol": "http", "requestBody": { "description": "Database data to create a new database", "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "name": { "type": "string", "description": "The name of the new database. Must contain only lowercase letters, numbers, dashes. No longer than 64 characters.", "key$": "name" }, "group": { "type": "string", "description": "The name of the group where the database should be created. **The group must already exist.**", "key$": "group" }, "seed": { "type": "object", "properties": { "type": { "type": "string", "enum": ["database", "database_upload"], "description": "The type of seed to be used to create a new database. Use `database` to copy from an existing database, or `database_upload` to [upload a SQLite database file](/api-reference/databases/upload).", "example": "database" }, "name": { "type": "string", "description": "The name of the existing database when `database` is used as a seed type.", "example": "my-db" }, "timestamp": { "type": "string", "description": "A formatted [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) recovery point to create a database from. This must be within the last 24 hours, or 30 days on the scaler plan.", "example": "2023-12-20T09:46:08Z" } }, "key$": "seed" }, "size_limit": { "type": "string", "description": "The maximum size of the database in bytes. Values with units are also accepted, e.g. 1mb, 256mb, 1gb.", "key$": "size_limit" }, "remote_encryption": { "type": "object", "description": "Encryption configuration for the database. Can be used when creating a new encrypted database, creating a encrypted database from upload (`seed.type = \"database_upload\"`), or forking from an encrypted database (required when the source database is encrypted).", "properties": { "encryption_key": { "type": "string", "description": "Base64-encoded encryption key. Key size depends on cipher: 32 bytes for aes256gcm, chacha20poly1305, aegis256 variants; 16 bytes for aes128gcm, aegis128l variants.", "example": "base64-encoded-key" }, "encryption_cipher": { "type": "string", "enum": ["aes256gcm", "aes128gcm", "chacha20poly1305", "aegis128l", "aegis128x2", "aegis128x4", "aegis256", "aegis256x2", "aegis256x4"], "description": "The encryption cipher to use.", "example": "aes256gcm" } }, "key$": "remote_encryption" } }, "required": ["name", "group"], "x-ref": "#/components/schemas/CreateDatabaseInput", "index$": 1 } } } }, "parameters": [{ "in": "path", "name": "organizationSlug", "required": true, "schema": { "type": "string" }, "description": "The slug of the organization or user account.", "x-ref": "#/components/parameters/organizationSlug", "index$": 0 }] }, "GET /v3/organizations/{organizationId}/databases": { "protocol": "http", "parameters": [{ "name": "organizationId", "in": "path", "required": true, "schema": { "type": "string", "format": "uuid" }, "description": "The UUID of the organization. Retrieve it with the Retrieve Organization endpoint (the `id` field).", "x-ref": "#/components/parameters/organizationId", "index$": 0 }, { "name": "deleted", "in": "query", "required": true, "schema": { "type": "boolean" }, "description": "Must be `true` to list deleted databases.", "index$": 1 }, { "name": "search", "in": "query", "schema": { "type": "string" }, "description": "Filter deleted databases by name.", "index$": 2 }, { "name": "limit", "in": "query", "schema": { "type": "integer", "default": 100 }, "description": "Page size, from 1 to 1000.", "index$": 3 }, { "name": "cursor", "in": "query", "schema": { "type": "string" }, "description": "Opaque pagination cursor from the previous page's `pagination.next`.", "index$": 4 }] }, "GET /v1/organizations/{organizationSlug}/databases": { "protocol": "http", "parameters": [{ "in": "path", "name": "organizationSlug", "required": true, "schema": { "type": "string" }, "description": "The slug of the organization or user account.", "x-ref": "#/components/parameters/organizationSlug", "index$": 0 }, { "name": "group", "in": "query", "schema": { "type": "string" }, "description": "Filter databases by group name.", "index$": 1 }, { "name": "schema", "in": "query", "schema": { "type": "string" }, "description": "The schema database name that can be used to get databases that belong to that parent schema.", "deprecated": true, "index$": 2 }, { "name": "parent", "in": "query", "schema": { "type": "string" }, "description": "Filter database branches by using their parent database ID.", "index$": 3 }] }, "GET /v1/organizations/{organizationSlug}/databases/{databaseName}": { "protocol": "http", "parameters": [{ "in": "path", "name": "organizationSlug", "required": true, "schema": { "type": "string" }, "description": "The slug of the organization or user account.", "x-ref": "#/components/parameters/organizationSlug", "index$": 0 }, { "name": "databaseName", "in": "path", "required": true, "schema": { "type": "string" }, "description": "The name of the database.", "x-ref": "#/components/parameters/databaseName", "index$": 1 }] }, "DELETE /v1/organizations/{organizationSlug}/databases/{databaseName}": { "protocol": "http", "parameters": [{ "in": "path", "name": "organizationSlug", "required": true, "schema": { "type": "string" }, "description": "The slug of the organization or user account.", "x-ref": "#/components/parameters/organizationSlug", "index$": 0 }, { "name": "databaseName", "in": "path", "required": true, "schema": { "type": "string" }, "description": "The name of the database.", "x-ref": "#/components/parameters/databaseName", "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const database_ref01_ent = client.Database();
        let database_ref01_data = setup.data.new.database['database_ref01'];
        database_ref01_data['organization_id'] = setup.idmap['organization01'];
        database_ref01_data['organization_slug'] = setup.idmap['organization_slug01'];
        database_ref01_data = (await database_ref01_ent.create(database_ref01_data)).data();
        (0, node_assert_1.default)(null != database_ref01_data.id);
        // LIST
        const database_ref01_match = {};
        database_ref01_match['organization_slug'] = setup.idmap['organization_slug01'];
        const database_ref01_list = (await database_ref01_ent.list(database_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(database_ref01_list, { id: database_ref01_data.id })));
        // LOAD
        const database_ref01_match_dt0 = {};
        database_ref01_match_dt0.id = database_ref01_data.id;
        database_ref01_match_dt0['organization_slug'] = setup.idmap['organization_slug'] ?? setup.idmap['organization_slug01'];
        const database_ref01_data_dt0 = (await database_ref01_ent.load(database_ref01_match_dt0)).data();
        (0, node_assert_1.default)(database_ref01_data_dt0.id === database_ref01_data.id);
        // REMOVE
        const database_ref01_match_rm0 = { id: database_ref01_data.id };
        database_ref01_match_rm0['organization_slug'] = setup.idmap['organization_slug'] ?? setup.idmap['organization_slug01'];
        await database_ref01_ent.remove(database_ref01_match_rm0);
        // LIST
        const database_ref01_match_rt0 = {};
        database_ref01_match_rt0['organization_slug'] = setup.idmap['organization_slug01'];
        const database_ref01_list_rt0 = (await database_ref01_ent.list(database_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(database_ref01_list_rt0, { id: database_ref01_data.id })));
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/database/DatabaseTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TursoPlatformSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['database01', 'database02', 'database03', 'organization01', 'organization02', 'organization03', 'organization_slug01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TURSO_PLATFORM_TEST_DATABASE_ENTID': idmap,
        'TURSO_PLATFORM_TEST_LIVE': 'FALSE',
        'TURSO_PLATFORM_TEST_EXPLAIN': 'FALSE',
        'TURSO_PLATFORM_APIKEY': '',
    });
    idmap = env['TURSO_PLATFORM_TEST_DATABASE_ENTID'];
    const live = 'TRUE' === env.TURSO_PLATFORM_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TURSO_PLATFORM_TEST_DATABASE_ENTID'];
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
//# sourceMappingURL=DatabaseEntity.test.js.map