"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "api_token",
        "accessor": "ApiToken",
        "op": "create",
        "method": "POST",
        "path": "/v1/auth/api-tokens/{tokenName}",
        "args": [
            {
                "name": "id",
                "wire": "tokenName",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "name": "my-token",
            "id": "clGFZ4STEe6fljpFzIum8A",
            "token": "..."
        },
        "idField": "id"
    },
    {
        "entity": "api_token",
        "accessor": "ApiToken",
        "op": "list",
        "method": "GET",
        "path": "/v1/organizations/{organizationSlug}/api-tokens",
        "args": [
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "tokens": [
                {
                    "name": "ci-bot",
                    "id": "clGFZ4STEe6fljpFzIum8A",
                    "organization": "my-org",
                    "group": "default",
                    "scopes": [
                        "db:create",
                        "db:configure",
                        "db:mint-token"
                    ],
                    "owner": {
                        "username": "alice",
                        "email": "alice@example.com"
                    },
                    "created_at": "2026-05-21"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "api_token",
        "accessor": "ApiToken",
        "op": "list",
        "method": "GET",
        "path": "/v1/auth/api-tokens",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "tokens": [
                {
                    "name": "my-token",
                    "id": "clGFZ4STEe6fljpFzIum8A",
                    "organization": "my-org",
                    "group": "default",
                    "scopes": [
                        "db:create",
                        "db:configure",
                        "db:mint-token"
                    ],
                    "created_at": "2026-05-21"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "api_token",
        "accessor": "ApiToken",
        "op": "remove",
        "method": "DELETE",
        "path": "/v1/organizations/{organizationSlug}/api-tokens/{tokenId}",
        "args": [
            {
                "name": "id",
                "wire": "tokenId",
                "value": "clGFZ4STEe6fljpFzIum8A"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "token": "clGFZ4STEe6fljpFzIum8A"
        },
        "idField": "id"
    },
    {
        "entity": "api_token",
        "accessor": "ApiToken",
        "op": "remove",
        "method": "DELETE",
        "path": "/v1/auth/api-tokens/{tokenName}",
        "args": [
            {
                "name": "id",
                "wire": "tokenName",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "token": "..."
        },
        "idField": "id"
    },
    {
        "entity": "audit_log",
        "accessor": "AuditLog",
        "op": "list",
        "method": "GET",
        "path": "/v1/organizations/{organizationSlug}/audit-logs",
        "args": [
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p1"
            }
        ],
        "select": {
            "page": "v1",
            "page_size": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "page_size",
            "page"
        ],
        "queryArgs": [
            {
                "name": "page",
                "wire": "page"
            },
            {
                "name": "page_size",
                "wire": "page_size"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "audit_logs": [
                {
                    "code": "db-create",
                    "message": "",
                    "origin": "cli",
                    "author": "iku",
                    "created_at": "2023-12-20T09:46:08Z",
                    "data": {}
                }
            ],
            "pagination": {
                "page": 1,
                "page_size": 10,
                "total_pages": 1,
                "total_rows": 1
            }
        },
        "idField": "id"
    },
    {
        "entity": "database",
        "accessor": "Database",
        "op": "create",
        "method": "POST",
        "path": "/v3/organizations/{organizationId}/databases/{databaseId}/restore",
        "action": "restore",
        "args": [
            {
                "name": "id",
                "wire": "databaseId",
                "value": "p1"
            },
            {
                "name": "organization_id",
                "wire": "organizationId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "database": {
                "Name": "x",
                "DbId": "x",
                "Hostname": "x",
                "group": "x",
                "group_id": "x",
                "organization_id": "x",
                "regions": [
                    "x"
                ],
                "primaryRegion": "x",
                "delete_protection": true,
                "deleted_at": "2026-01-01T00:00:00Z",
                "group_deleted_at": "2026-01-01T00:00:00Z"
            }
        },
        "idField": "id"
    },
    {
        "entity": "database",
        "accessor": "Database",
        "op": "create",
        "method": "POST",
        "path": "/v1/organizations/{organizationSlug}/databases/{databaseName}/auth/rotate",
        "action": "rotate",
        "args": [
            {
                "name": "database_name",
                "wire": "databaseName",
                "value": "p1"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "database",
        "accessor": "Database",
        "op": "create",
        "method": "POST",
        "path": "/v1/organizations/{organizationSlug}/databases/{databaseName}/auth/tokens",
        "action": "token",
        "args": [
            {
                "name": "database_name",
                "wire": "databaseName",
                "value": "p1"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p2"
            }
        ],
        "select": {
            "authorization": "full-access",
            "expiration": "never"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "expiration",
            "authorization"
        ],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "jwt": "x"
        },
        "idField": "id"
    },
    {
        "entity": "database",
        "accessor": "Database",
        "op": "create",
        "method": "POST",
        "path": "/v1/organizations/{organizationSlug}/databases",
        "args": [
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "database": {
                "DbId": "0eb771dd-6906-11ee-8553-eaa7715aeaf2",
                "Hostname": "[databaseName]-[organizationSlug].turso.io",
                "Name": "my-db"
            }
        },
        "idField": "id"
    },
    {
        "entity": "database",
        "accessor": "Database",
        "op": "list",
        "method": "GET",
        "path": "/v3/organizations/{organizationId}/databases",
        "args": [
            {
                "name": "organization_id",
                "wire": "organizationId",
                "value": "p1"
            }
        ],
        "select": {
            "deleted": "v1",
            "cursor": "v1",
            "limit": 100,
            "search": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "deleted",
            "search",
            "limit",
            "cursor"
        ],
        "queryArgs": [
            {
                "name": "cursor",
                "wire": "cursor"
            },
            {
                "name": "deleted",
                "wire": "deleted"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "search",
                "wire": "search"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "databases": [
                {
                    "Name": "x",
                    "DbId": "x",
                    "Hostname": "x",
                    "group": "x",
                    "group_id": "x",
                    "organization_id": "x",
                    "regions": [
                        "x"
                    ],
                    "primaryRegion": "x",
                    "delete_protection": true,
                    "deleted_at": "2026-01-01T00:00:00Z",
                    "group_deleted_at": "2026-01-01T00:00:00Z"
                }
            ],
            "pagination": {
                "next": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "database",
        "accessor": "Database",
        "op": "list",
        "method": "GET",
        "path": "/v1/organizations/{organizationSlug}/databases",
        "args": [
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p1"
            }
        ],
        "select": {
            "group": "v1",
            "parent": "v1",
            "schema": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "group",
            "schema",
            "parent"
        ],
        "queryArgs": [
            {
                "name": "group",
                "wire": "group"
            },
            {
                "name": "parent",
                "wire": "parent"
            },
            {
                "name": "schema",
                "wire": "schema"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "databases": [
                {
                    "Name": "my-db",
                    "DbId": "0eb771dd-6906-11ee-8553-eaa7715aeaf2",
                    "Hostname": "[databaseName]-[organizationSlug].turso.io",
                    "block_reads": false,
                    "block_writes": false,
                    "regions": [
                        "aws-us-east-1"
                    ],
                    "primaryRegion": "aws-us-east-1",
                    "group": "default",
                    "delete_protection": false,
                    "parent": {
                        "id": "x",
                        "name": "x",
                        "branched_at": "2025-04-15T13:14:34.468213117Z"
                    }
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "database",
        "accessor": "Database",
        "op": "load",
        "method": "GET",
        "path": "/v1/organizations/{organizationSlug}/databases/{databaseName}",
        "args": [
            {
                "name": "id",
                "wire": "databaseName",
                "value": "p1"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "database": {
                "Name": "my-db",
                "DbId": "0eb771dd-6906-11ee-8553-eaa7715aeaf2",
                "Hostname": "[databaseName]-[organizationSlug].turso.io",
                "block_reads": false,
                "block_writes": false,
                "regions": [
                    "aws-us-east-1"
                ],
                "primaryRegion": "aws-us-east-1",
                "group": "default",
                "delete_protection": false,
                "parent": {
                    "id": "x",
                    "name": "x",
                    "branched_at": "2025-04-15T13:14:34.468213117Z"
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "database",
        "accessor": "Database",
        "op": "remove",
        "method": "DELETE",
        "path": "/v1/organizations/{organizationSlug}/databases/{databaseName}",
        "args": [
            {
                "name": "id",
                "wire": "databaseName",
                "value": "p1"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "database": "my-db"
        },
        "idField": "id"
    },
    {
        "entity": "database_configuration",
        "accessor": "DatabaseConfiguration",
        "op": "list",
        "method": "GET",
        "path": "/v1/organizations/{organizationSlug}/databases/{databaseName}/configuration",
        "args": [
            {
                "name": "database_name",
                "wire": "databaseName",
                "value": "p1"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "size_limit": "10000",
            "allow_attach": true,
            "block_reads": false,
            "block_writes": false,
            "delete_protection": true,
            "allowed_ips": [
                "203.0.113.7",
                "10.0.0.0/8"
            ],
            "allowed_aws_vpc_ids": [
                "vpce-0fe6c8807461bba49"
            ]
        },
        "idField": "id"
    },
    {
        "entity": "database_configuration",
        "accessor": "DatabaseConfiguration",
        "op": "update",
        "method": "PATCH",
        "path": "/v1/organizations/{organizationSlug}/databases/{databaseName}/configuration",
        "args": [
            {
                "name": "database_name",
                "wire": "databaseName",
                "value": "p1"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "size_limit": "10000",
            "allow_attach": true,
            "block_reads": false,
            "block_writes": false,
            "delete_protection": true,
            "allowed_ips": [
                "203.0.113.7",
                "10.0.0.0/8"
            ],
            "allowed_aws_vpc_ids": [
                "vpce-0fe6c8807461bba49"
            ]
        },
        "idField": "id"
    },
    {
        "entity": "database_stat",
        "accessor": "DatabaseStat",
        "op": "list",
        "method": "GET",
        "path": "/v1/organizations/{organizationSlug}/databases/{databaseName}/stats",
        "args": [
            {
                "name": "database_name",
                "wire": "databaseName",
                "value": "p1"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "top_queries": [
                {
                    "query": "SELECT COUNT(*), CustomerID FROM Orders GROUP BY CustomerID HAVING COUNT(*) > 5;",
                    "rows_read": 123,
                    "rows_written": 4567
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "database_usage",
        "accessor": "DatabaseUsage",
        "op": "load",
        "method": "GET",
        "path": "/v1/organizations/{organizationSlug}/databases/{databaseName}/usage",
        "args": [
            {
                "name": "database_name",
                "wire": "databaseName",
                "value": "p1"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p2"
            }
        ],
        "select": {
            "from": "v1",
            "to": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "from",
            "to"
        ],
        "queryArgs": [
            {
                "name": "from",
                "wire": "from"
            },
            {
                "name": "to",
                "wire": "to"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "database": {
                "uuid": "0eb771dd-6906-11ee-8553-eaa7715aeaf2",
                "instances": [
                    {
                        "uuid": "cd831986-94e5-11ee-a6fe-7a52e1f7759a",
                        "usage": {
                            "rows_read": 0,
                            "rows_written": 0,
                            "storage_bytes": 4096,
                            "bytes_synced": 0
                        }
                    },
                    {
                        "uuid": "0be90471-6906-11ee-8553-eaa7715aeaf2",
                        "usage": {
                            "rows_read": 0,
                            "rows_written": 0,
                            "storage_bytes": 4096,
                            "bytes_synced": 0
                        }
                    }
                ],
                "total": {
                    "rows_read": 0,
                    "rows_written": 0,
                    "storage_bytes": 8192,
                    "bytes_synced": 0
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "deleted_group",
        "accessor": "DeletedGroup",
        "op": "list",
        "method": "GET",
        "path": "/v3/organizations/{organizationId}/deleted-groups",
        "args": [
            {
                "name": "organization_id",
                "wire": "organizationId",
                "value": "p1"
            }
        ],
        "select": {
            "cursor": "v1",
            "limit": 100
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit",
            "cursor"
        ],
        "queryArgs": [
            {
                "name": "cursor",
                "wire": "cursor"
            },
            {
                "name": "limit",
                "wire": "limit"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "groups": [
                {
                    "uuid": "x",
                    "name": "x",
                    "deleted_at": "2026-01-01T00:00:00Z",
                    "cascade_databases": 1
                }
            ],
            "pagination": {
                "next": "x"
            }
        },
        "idField": "id"
    },
    {
        "entity": "group",
        "accessor": "Group",
        "op": "create",
        "method": "POST",
        "path": "/v3/organizations/{organizationId}/groups/{groupId}/restore",
        "action": "restore",
        "args": [
            {
                "name": "id",
                "wire": "groupId",
                "value": "p1"
            },
            {
                "name": "organization_id",
                "wire": "organizationId",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "group": {
                "name": "default",
                "version": "v0.23.7",
                "uuid": "0a28102d-6906-11ee-8553-eaa7715aeaf2",
                "locations": [
                    "aws-us-east-1"
                ],
                "primary": "us-east-1",
                "delete_protection": false
            },
            "databases": [
                {
                    "Name": "x",
                    "DbId": "x",
                    "Hostname": "x",
                    "group": "x",
                    "group_id": "x",
                    "organization_id": "x",
                    "regions": [
                        "x"
                    ],
                    "primaryRegion": "x",
                    "delete_protection": true,
                    "deleted_at": "2026-01-01T00:00:00Z",
                    "group_deleted_at": "2026-01-01T00:00:00Z"
                }
            ],
            "failures": {}
        },
        "idField": "id"
    },
    {
        "entity": "group",
        "accessor": "Group",
        "op": "create",
        "method": "POST",
        "path": "/v1/organizations/{organizationSlug}/groups/{groupName}/auth/rotate",
        "action": "rotate",
        "args": [
            {
                "name": "group_name",
                "wire": "groupName",
                "value": "p1"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "group",
        "accessor": "Group",
        "op": "create",
        "method": "POST",
        "path": "/v1/organizations/{organizationSlug}/groups/{groupName}/auth/tokens",
        "action": "token",
        "args": [
            {
                "name": "group_name",
                "wire": "groupName",
                "value": "p1"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p2"
            }
        ],
        "select": {
            "authorization": "full-access",
            "expiration": "never"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "expiration",
            "authorization"
        ],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "jwt": "x"
        },
        "idField": "id"
    },
    {
        "entity": "group",
        "accessor": "Group",
        "op": "create",
        "method": "POST",
        "path": "/v1/organizations/{organizationSlug}/groups/{groupName}/transfer",
        "action": "transfer",
        "args": [
            {
                "name": "group_name",
                "wire": "groupName",
                "value": "p1"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "name": "default",
            "version": "v0.23.7",
            "uuid": "0a28102d-6906-11ee-8553-eaa7715aeaf2",
            "locations": [
                "aws-us-east-1"
            ],
            "primary": "us-east-1",
            "delete_protection": false
        },
        "idField": "id"
    },
    {
        "entity": "group",
        "accessor": "Group",
        "op": "create",
        "method": "POST",
        "path": "/v1/organizations/{organizationSlug}/groups/{groupName}/unarchive",
        "action": "unarchive",
        "args": [
            {
                "name": "group_name",
                "wire": "groupName",
                "value": "p1"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "group": {
                "name": "default",
                "version": "v0.23.7",
                "uuid": "0a28102d-6906-11ee-8553-eaa7715aeaf2",
                "locations": [
                    "aws-us-east-1"
                ],
                "primary": "us-east-1",
                "delete_protection": false
            }
        },
        "idField": "id"
    },
    {
        "entity": "group",
        "accessor": "Group",
        "op": "create",
        "method": "POST",
        "path": "/v1/organizations/{organizationSlug}/groups/{groupName}/update",
        "action": "update",
        "args": [
            {
                "name": "group_name",
                "wire": "groupName",
                "value": "p1"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "group",
        "accessor": "Group",
        "op": "create",
        "method": "POST",
        "path": "/v1/organizations/{organizationSlug}/groups",
        "args": [
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "group": {
                "name": "default",
                "version": "v0.23.7",
                "uuid": "0a28102d-6906-11ee-8553-eaa7715aeaf2",
                "locations": [
                    "aws-us-east-1"
                ],
                "primary": "us-east-1",
                "delete_protection": false
            }
        },
        "idField": "id"
    },
    {
        "entity": "group",
        "accessor": "Group",
        "op": "list",
        "method": "GET",
        "path": "/v1/organizations/{organizationSlug}/groups",
        "args": [
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "groups": [
                {
                    "name": "default",
                    "version": "v0.23.7",
                    "uuid": "0a28102d-6906-11ee-8553-eaa7715aeaf2",
                    "locations": [
                        "aws-us-east-1"
                    ],
                    "primary": "us-east-1",
                    "delete_protection": false
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "group",
        "accessor": "Group",
        "op": "load",
        "method": "GET",
        "path": "/v1/organizations/{organizationSlug}/groups/{groupName}",
        "args": [
            {
                "name": "id",
                "wire": "groupName",
                "value": "p1"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "group": {
                "name": "default",
                "version": "v0.23.7",
                "uuid": "0a28102d-6906-11ee-8553-eaa7715aeaf2",
                "locations": [
                    "aws-us-east-1"
                ],
                "primary": "us-east-1",
                "delete_protection": false
            }
        },
        "idField": "id"
    },
    {
        "entity": "group",
        "accessor": "Group",
        "op": "remove",
        "method": "DELETE",
        "path": "/v1/organizations/{organizationSlug}/groups/{groupName}",
        "args": [
            {
                "name": "id",
                "wire": "groupName",
                "value": "p1"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "group": {
                "name": "default",
                "version": "v0.23.7",
                "uuid": "0a28102d-6906-11ee-8553-eaa7715aeaf2",
                "locations": [
                    "aws-us-east-1"
                ],
                "primary": "us-east-1",
                "delete_protection": false
            }
        },
        "idField": "id"
    },
    {
        "entity": "group_configuration",
        "accessor": "GroupConfiguration",
        "op": "load",
        "method": "GET",
        "path": "/v1/organizations/{organizationSlug}/groups/{groupName}/configuration",
        "args": [
            {
                "name": "group_name",
                "wire": "groupName",
                "value": "p1"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "delete_protection": true
        },
        "idField": "id"
    },
    {
        "entity": "group_configuration",
        "accessor": "GroupConfiguration",
        "op": "update",
        "method": "PATCH",
        "path": "/v1/organizations/{organizationSlug}/groups/{groupName}/configuration",
        "args": [
            {
                "name": "group_name",
                "wire": "groupName",
                "value": "p1"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "delete_protection": true
        },
        "idField": "id"
    },
    {
        "entity": "instance",
        "accessor": "Instance",
        "op": "list",
        "method": "GET",
        "path": "/v1/organizations/{organizationSlug}/databases/{databaseName}/instances",
        "args": [
            {
                "name": "database_name",
                "wire": "databaseName",
                "value": "p1"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "instances": [
                {
                    "uuid": "0be90471-6906-11ee-8553-eaa7715aeaf2",
                    "name": "aws-us-east-1",
                    "type": "primary",
                    "region": "aws-us-east-1",
                    "hostname": "[databaseName]-[organizationSlug].turso.io"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "instance",
        "accessor": "Instance",
        "op": "load",
        "method": "GET",
        "path": "/v1/organizations/{organizationSlug}/databases/{databaseName}/instances/{instanceName}",
        "args": [
            {
                "name": "database_name",
                "wire": "databaseName",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "instanceName",
                "value": "p2"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "instance": {
                "uuid": "0be90471-6906-11ee-8553-eaa7715aeaf2",
                "name": "aws-us-east-1",
                "type": "primary",
                "region": "aws-us-east-1",
                "hostname": "[databaseName]-[organizationSlug].turso.io"
            }
        },
        "idField": "id"
    },
    {
        "entity": "invite",
        "accessor": "Invite",
        "op": "list",
        "method": "GET",
        "path": "/v2/organizations/{organizationSlug}/invites",
        "args": [
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "invites": [
                {
                    "id": 1,
                    "email": "iku@turso.tech",
                    "role": "member",
                    "created_at": "2023-01-01T00:00:00Z"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "invite",
        "accessor": "Invite",
        "op": "remove",
        "method": "DELETE",
        "path": "/v2/organizations/{organizationSlug}/invites/{email}",
        "args": [
            {
                "name": "id",
                "wire": "email",
                "value": "iku@turso.tech"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": null,
        "idField": "id"
    },
    {
        "entity": "location",
        "accessor": "Location",
        "op": "create",
        "method": "POST",
        "path": "/v1/organizations/{organizationSlug}/groups/{groupName}/locations/{location}",
        "args": [
            {
                "name": "group_name",
                "wire": "groupName",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "location",
                "value": "aws-us-east-1"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "group": {
                "archived": false,
                "locations": [
                    "aws-us-east-1",
                    "aws-eu-west-1"
                ],
                "name": "default",
                "primary": "aws-us-east-1",
                "uuid": "f1dec998-8f7f-11ee-907d-a2a821fd08b9"
            }
        },
        "idField": "id"
    },
    {
        "entity": "location",
        "accessor": "Location",
        "op": "load",
        "method": "GET",
        "path": "/v1/locations",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "locations": {
                "aws-ap-northeast-1": "AWS AP NorthEast (Tokyo)",
                "aws-ap-south-1": "AWS AP South (Mumbai)",
                "aws-eu-west-1": "AWS EU West (Ireland)",
                "aws-us-east-1": "AWS US East (Virginia)",
                "aws-us-east-2": "AWS US East (Ohio)",
                "aws-us-west-2": "AWS US West (Oregon)"
            }
        },
        "idField": "id"
    },
    {
        "entity": "location",
        "accessor": "Location",
        "op": "remove",
        "method": "DELETE",
        "path": "/v1/organizations/{organizationSlug}/groups/{groupName}/locations/{location}",
        "args": [
            {
                "name": "group_name",
                "wire": "groupName",
                "value": "p1"
            },
            {
                "name": "id",
                "wire": "location",
                "value": "p2"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p3"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "group": {
                "archived": false,
                "locations": [
                    "aws-us-east-1",
                    "aws-eu-west-1"
                ],
                "name": "default",
                "primary": "aws-us-east-1",
                "uuid": "f1dec998-8f7f-11ee-907d-a2a821fd08b9"
            }
        },
        "idField": "id"
    },
    {
        "entity": "member",
        "accessor": "Member",
        "op": "list",
        "method": "GET",
        "path": "/v1/organizations/{organizationSlug}/members",
        "args": [
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "members": [
                {
                    "username": "iku",
                    "role": "owner",
                    "email": "iku@turso.tech"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "member",
        "accessor": "Member",
        "op": "load",
        "method": "GET",
        "path": "/v1/organizations/{organizationSlug}/members/{username}",
        "args": [
            {
                "name": "id",
                "wire": "username",
                "value": "p1"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "member": {
                "username": "iku",
                "role": "owner",
                "email": "iku@turso.tech"
            }
        },
        "idField": "id"
    },
    {
        "entity": "member",
        "accessor": "Member",
        "op": "remove",
        "method": "DELETE",
        "path": "/v1/organizations/{organizationSlug}/members/{username}",
        "args": [
            {
                "name": "id",
                "wire": "username",
                "value": "p1"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "member": "iku"
        },
        "idField": "id"
    },
    {
        "entity": "member",
        "accessor": "Member",
        "op": "update",
        "method": "PATCH",
        "path": "/v1/organizations/{organizationSlug}/members/{username}",
        "args": [
            {
                "name": "id",
                "wire": "username",
                "value": "p1"
            },
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p2"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "member": {
                "username": "x",
                "email": "x",
                "role": "admin"
            }
        },
        "idField": "id"
    },
    {
        "entity": "organization",
        "accessor": "Organization",
        "op": "create",
        "method": "POST",
        "path": "/v2/organizations/{organizationSlug}/invites",
        "action": "invite",
        "args": [
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "invited": {
                "email": "iku@turso.tech",
                "role": "member",
                "organization": "mycompany"
            }
        },
        "idField": "id"
    },
    {
        "entity": "organization",
        "accessor": "Organization",
        "op": "create",
        "method": "POST",
        "path": "/v1/organizations/{organizationSlug}/members",
        "action": "member",
        "args": [
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "member": "iku",
            "role": "owner"
        },
        "idField": "id"
    },
    {
        "entity": "organization",
        "accessor": "Organization",
        "op": "list",
        "method": "GET",
        "path": "/v1/organizations",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": [
            {
                "name": "personal",
                "slug": "iku",
                "type": "personal",
                "overages": false,
                "require_mfa": false,
                "blocked_reads": false,
                "blocked_writes": false,
                "plan_id": "developer",
                "plan_timeline": "monthly",
                "platform": "vercel",
                "restore_enabled": true
            }
        ],
        "idField": "id"
    },
    {
        "entity": "organization",
        "accessor": "Organization",
        "op": "load",
        "method": "GET",
        "path": "/v1/organizations/{organizationSlug}",
        "args": [
            {
                "name": "id",
                "wire": "organizationSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "organization": {
                "name": "personal",
                "slug": "iku",
                "type": "personal",
                "overages": false,
                "require_mfa": false,
                "blocked_reads": false,
                "blocked_writes": false,
                "plan_id": "developer",
                "plan_timeline": "monthly",
                "platform": "vercel",
                "restore_enabled": true
            }
        },
        "idField": "id"
    },
    {
        "entity": "organization",
        "accessor": "Organization",
        "op": "update",
        "method": "PATCH",
        "path": "/v1/organizations/{organizationSlug}",
        "args": [
            {
                "name": "id",
                "wire": "organizationSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "organization": {
                "name": "personal",
                "slug": "iku",
                "type": "personal",
                "overages": false,
                "require_mfa": false,
                "blocked_reads": false,
                "blocked_writes": false,
                "plan_id": "developer",
                "plan_timeline": "monthly",
                "platform": "vercel",
                "restore_enabled": true
            }
        },
        "idField": "id"
    },
    {
        "entity": "organization_invoice",
        "accessor": "OrganizationInvoice",
        "op": "list",
        "method": "GET",
        "path": "/v1/organizations/{organizationSlug}/invoices",
        "args": [
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p1"
            }
        ],
        "select": {
            "type": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "type"
        ],
        "queryArgs": [
            {
                "name": "type",
                "wire": "type"
            }
        ],
        "auth": [],
        "status": 200,
        "sample": {
            "invoices": [
                {
                    "invoice_number": "LFONTK-00001",
                    "amount_due": "10.29",
                    "due_date": "2024-01-01T05:00:00+00:00",
                    "paid_at": "2024-01-01T05:00:00+00:00",
                    "payment_failed_at": "2024-01-01T05:00:00+00:00",
                    "invoice_pdf": "https://assets.withorb.com/invoice/..."
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "organization_plan",
        "accessor": "OrganizationPlan",
        "op": "list",
        "method": "GET",
        "path": "/v1/organizations/{organizationSlug}/plans",
        "args": [
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "plans": [
                {
                    "name": "starter",
                    "price": "0",
                    "prices": [
                        {
                            "value": "29",
                            "timeline": "monthly"
                        }
                    ],
                    "quotas": {
                        "rowsRead": 1000000000,
                        "rowsWritten": 25000000,
                        "databases": 500,
                        "locations": 3,
                        "storage": 9000000000,
                        "groups": 1,
                        "bytesSynced": 3000000000
                    }
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "organization_subscription",
        "accessor": "OrganizationSubscription",
        "op": "load",
        "method": "GET",
        "path": "/v1/organizations/{organizationSlug}/subscription",
        "args": [
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "subscription": {
                "name": "scaler",
                "overages": true,
                "plan": "scaler",
                "timeline": "monthly"
            }
        },
        "idField": "id"
    },
    {
        "entity": "organization_usage",
        "accessor": "OrganizationUsage",
        "op": "load",
        "method": "GET",
        "path": "/v1/organizations/{organizationSlug}/usage",
        "args": [
            {
                "name": "organization_slug",
                "wire": "organizationSlug",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "organization": {
                "uuid": "fa72ba58-7db3-436b-bcab-14b83eb1dd88",
                "usage": {
                    "rows_read": 1000000000,
                    "rows_written": 25000000,
                    "databases": 500,
                    "locations": 3,
                    "storage_bytes": 9000000000,
                    "groups": 1,
                    "bytes_synced": 3000000000
                },
                "databases": [
                    {
                        "uuid": "0eb771dd-6906-11ee-8553-eaa7715aeaf2",
                        "instances": [
                            {
                                "uuid": "cd831986-94e5-11ee-a6fe-7a52e1f7759a",
                                "usage": {
                                    "rows_read": 0,
                                    "rows_written": 0,
                                    "storage_bytes": 4096,
                                    "bytes_synced": 0
                                }
                            },
                            {
                                "uuid": "0be90471-6906-11ee-8553-eaa7715aeaf2",
                                "usage": {
                                    "rows_read": 0,
                                    "rows_written": 0,
                                    "storage_bytes": 4096,
                                    "bytes_synced": 0
                                }
                            }
                        ],
                        "total": {
                            "rows_read": 0,
                            "rows_written": 0,
                            "storage_bytes": 8192,
                            "bytes_synced": 0
                        }
                    }
                ]
            }
        },
        "idField": "id"
    },
    {
        "entity": "user",
        "accessor": "User",
        "op": "load",
        "method": "GET",
        "path": "/v1/user",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "user": {
                "username": "iku",
                "name": "Iku Turso",
                "email": "iku@turso.tech",
                "avatarUrl": "https://avatars.githubusercontent.com/u/12345",
                "plan": "scaler",
                "mfa": false,
                "has_pending_invites": false
            }
        },
        "idField": "id"
    },
    {
        "entity": "validate",
        "accessor": "Validate",
        "op": "load",
        "method": "GET",
        "path": "/v1/auth/validate",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": [],
        "status": 200,
        "sample": {
            "exp": 999
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map