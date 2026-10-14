# TursoPlatform TypeScript SDK Reference

Complete API reference for the TursoPlatform TypeScript SDK.


## TursoPlatformSDK

### Constructor

```ts
new TursoPlatformSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TursoPlatformSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = TursoPlatformSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `TursoPlatformSDK` instance in test mode.


### Instance Methods

#### `ApiToken(data?: object)`

Create a new `ApiToken` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ApiTokenEntity` instance.

#### `AuditLog(data?: object)`

Create a new `AuditLog` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AuditLogEntity` instance.

#### `Database(data?: object)`

Create a new `Database` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DatabaseEntity` instance.

#### `DatabaseConfiguration(data?: object)`

Create a new `DatabaseConfiguration` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DatabaseConfigurationEntity` instance.

#### `DatabaseStat(data?: object)`

Create a new `DatabaseStat` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DatabaseStatEntity` instance.

#### `DatabaseUsage(data?: object)`

Create a new `DatabaseUsage` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DatabaseUsageEntity` instance.

#### `DeletedGroup(data?: object)`

Create a new `DeletedGroup` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DeletedGroupEntity` instance.

#### `Group(data?: object)`

Create a new `Group` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GroupEntity` instance.

#### `GroupConfiguration(data?: object)`

Create a new `GroupConfiguration` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GroupConfigurationEntity` instance.

#### `Instance(data?: object)`

Create a new `Instance` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InstanceEntity` instance.

#### `Invite(data?: object)`

Create a new `Invite` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InviteEntity` instance.

#### `Location(data?: object)`

Create a new `Location` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LocationEntity` instance.

#### `Member(data?: object)`

Create a new `Member` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MemberEntity` instance.

#### `Organization(data?: object)`

Create a new `Organization` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OrganizationEntity` instance.

#### `OrganizationInvoice(data?: object)`

Create a new `OrganizationInvoice` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OrganizationInvoiceEntity` instance.

#### `OrganizationPlan(data?: object)`

Create a new `OrganizationPlan` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OrganizationPlanEntity` instance.

#### `OrganizationSubscription(data?: object)`

Create a new `OrganizationSubscription` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OrganizationSubscriptionEntity` instance.

#### `OrganizationUsage(data?: object)`

Create a new `OrganizationUsage` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OrganizationUsageEntity` instance.

#### `Rotate(data?: object)`

Create a new `Rotate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RotateEntity` instance.

#### `Token(data?: object)`

Create a new `Token` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TokenEntity` instance.

#### `User(data?: object)`

Create a new `User` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UserEntity` instance.

#### `Validate(data?: object)`

Create a new `Validate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ValidateEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |
| `fetchargs.ctrl.signal` | `AbortSignal` | Aborts the request in flight: `ok` is then `false` and `err.code` is `request_aborted`. |

**Returns:** `Promise<{ ok, status, headers, data }>`. On a failure
`ok` is `false` and `err` holds the error.

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `TursoPlatformSDK.test()`.

**Returns:** `TursoPlatformSDK` instance in test mode.

#### Cancelling a call

Every entity operation takes an optional `ctrl` object after its match or
data, and an `AbortSignal` in `ctrl.signal` cancels the request in flight.
The operation then rejects with an error whose `code` is
`request_aborted` and whose `cause` is the signal's reason. A request
whose signal has already aborted is not sent. `stream()` takes the signal
as `callopts.signal`, and ends when it aborts.


---

## ApiTokenEntity

```ts
const api_token = client.ApiToken()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | The date the token was created. |
| `group` | `string` | No | The group name (inside `organization`) to restrict this token to. |
| `id` | `string` | No | The ID generated by Turso for the API Token. |
| `name` | `string` | No | The name given to the API Token. |
| `organization` | `string` | No | The organization slug to restrict this token to. |
| `owner` | `Record<string, any>` | No | The user who minted the token. |
| `scopes` | `any[]` | No | Permissions to grant a group-scoped token. |
| `token` | `string` | No | The actual token contents as a JWT. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.ApiToken().create({
  id: 'example_id',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.ApiToken().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.ApiToken().remove({ id: 'api_token_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ApiTokenEntity` instance with the same client and
options.

#### `client()`

Return the parent `TursoPlatformSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AuditLogEntity

```ts
const audit_log = client.AuditLog()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `author` | `string` | No | The username of the user who performed the action. |
| `code` | `string` | No | The code associated to the action taken. |
| `created_at` | `string` | No | A formatted [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp this action was performed. |
| `data` | `Record<string, any>` | No | The payload of the action performed. |
| `message` | `string` | No | Additional context from the performed action. |
| `origin` | `string` | No | Where this action was performed. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.AuditLog().list({ organization_slug: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AuditLogEntity` instance with the same client and
options.

#### `client()`

Return the parent `TursoPlatformSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DatabaseEntity

```ts
const database = client.Database()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `DbId` | `string` | No | The database universal unique identifier (UUID). |
| `Hostname` | `string` | No | The DNS hostname used for client libSQL and HTTP connections. |
| `Name` | `string` | No | The database name, **unique** across your organization. |
| `block_reads` | `boolean` | No | The current status for blocked reads. |
| `block_writes` | `boolean` | No | The current status for blocked writes. |
| `delete_protection` | `boolean` | No | The current status for delete protection. |
| `deleted_at` | `string` | No | When the database was deleted. |
| `group` | `string` | No | The name of the group the database belongs to. |
| `group_deleted_at` | `string` | No | Set when the database's group was deleted with it. |
| `group_id` | `string` | No | The UUID of the group the database belonged to. |
| `id` | `string` | No |  |
| `name` | `string` | Yes | The name of the new database. |
| `organization_id` | `string` | No | The UUID of the organization. |
| `parent` | `Record<string, any>` | No |  |
| `primaryRegion` | `string` | No | The primary region location code the group the database belongs to. |
| `regions` | `any[]` | No | A list of regions for the group the database belongs to. |
| `remote_encryption` | `Record<string, any>` | No | Encryption configuration for the database. |
| `seed` | `Record<string, any>` | No |  |
| `size_limit` | `string` | No | The maximum size of the database in bytes. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `DbId` | - | - | - | - |
| `Hostname` | - | - | - | - |
| `Name` | - | - | - | - |
| `block_reads` | - | - | - | - |
| `block_writes` | - | - | - | - |
| `delete_protection` | - | - | - | - |
| `deleted_at` | - | - | - | - |
| `group` | - | - | Yes | - |
| `group_deleted_at` | - | - | - | - |
| `group_id` | - | - | - | - |
| `id` | - | - | - | - |
| `name` | - | - | - | - |
| `organization_id` | - | - | - | - |
| `parent` | - | - | - | - |
| `primaryRegion` | - | - | - | - |
| `regions` | - | - | - | - |
| `remote_encryption` | - | - | - | - |
| `seed` | - | - | - | - |
| `size_limit` | - | - | - | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `restore` | `/v3/organizations/{organizationId}/databases/{databaseId}/restore` | `client.Database().create({ $action: 'restore', ... })` |

An action returns that action's OWN response, which is not necessarily a
Database record — check the API definition for its shape.

```ts
const result = await client.Database().create({
  $action: 'restore',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Database().create({
  organization_slug: 'example_organization_slug',
  name: 'example_name',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Database().list({ organization_id: "example", deleted: true })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Database().load({ id: 'database_id', organization_slug: 'organization_slug' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Database().remove({ id: 'database_id', organization_slug: 'organization_slug' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DatabaseEntity` instance with the same client and
options.

#### `client()`

Return the parent `TursoPlatformSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DatabaseConfigurationEntity

```ts
const database_configuration = client.DatabaseConfiguration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allow_attach` | `boolean` | No | Allow or disallow attaching databases to the current database. |
| `allowed_aws_vpc_ids` | `any[]` | No | List of allowed AWS VPC endpoint IDs. |
| `allowed_ips` | `any[]` | No | List of allowed IP addresses and CIDR blocks. |
| `block_reads` | `boolean` | No | The current status for blocked reads. |
| `block_writes` | `boolean` | No | The current status for blocked writes. |
| `delete_protection` | `boolean` | No | Prevent the database from being deleted. |
| `size_limit` | `string` | No | The maximum size of the database in bytes. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.DatabaseConfiguration().list({ database_name: "example", organization_id: "example" })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.DatabaseConfiguration().update({
  database_name: 'database_name',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DatabaseConfigurationEntity` instance with the same client and
options.

#### `client()`

Return the parent `TursoPlatformSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DatabaseStatEntity

```ts
const database_stat = client.DatabaseStat()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | `string` | No | A string representing the SQL query executed. |
| `rows_read` | `number` | No | An integer indicating the number of rows read by the query, which reflects the volume of data the query processed from the database. |
| `rows_written` | `number` | No | An integer indicating the number of rows written (inserted, updated, or deleted) by the query, which reflects the impact of the query on the database data. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.DatabaseStat().list({ database_name: "example", organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DatabaseStatEntity` instance with the same client and
options.

#### `client()`

Return the parent `TursoPlatformSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DatabaseUsageEntity

```ts
const database_usage = client.DatabaseUsage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `instances` | `any[]` | No | The usage objects for instances of the current database. |
| `total` | `Record<string, any>` | No | The total usage for the database. |
| `uuid` | `string` | No | The database universal unique identifier (UUID). |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.DatabaseUsage().load({ database_name: 'database_name', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DatabaseUsageEntity` instance with the same client and
options.

#### `client()`

Return the parent `TursoPlatformSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DeletedGroupEntity

```ts
const deleted_group = client.DeletedGroup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `cascade_databases` | `number` | No | The number of member databases that restoring the group would bring back with it. |
| `deleted_at` | `string` | No | When the group was deleted. |
| `name` | `string` | No | The group name. |
| `uuid` | `string` | No | The group UUID. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.DeletedGroup().list({ organization_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DeletedGroupEntity` instance with the same client and
options.

#### `client()`

Return the parent `TursoPlatformSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GroupEntity

```ts
const group = client.Group()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `delete_protection` | `boolean` | No | The current status for delete protection. |
| `extensions` | `any` | No | The extensions to enable for new databases created in this group. |
| `id` | `string` | No |  |
| `location` | `string` | Yes | The location key for the new group. |
| `locations` | `any[]` | No | An array of location keys the group is located. |
| `name` | `string` | No | The group name, unique across your organization. |
| `primary` | `string` | No | The primary location key. |
| `uuid` | `string` | No | The group universal unique identifier (UUID). |
| `version` | `string` | No | The current libSQL server version the databases in that group are running. |

### Field Usage by Operation

| Field | load | list | create | remove |
| --- | --- | --- | --- | --- |
| `delete_protection` | - | - | - | - |
| `extensions` | - | - | - | - |
| `id` | - | - | - | - |
| `location` | - | - | - | - |
| `locations` | - | - | - | - |
| `name` | - | - | Yes | - |
| `primary` | - | - | - | - |
| `uuid` | - | - | - | - |
| `version` | - | - | - | - |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `restore` | `/v3/organizations/{organizationId}/groups/{groupId}/restore` | `client.Group().create({ $action: 'restore', ... })` |
| `transfer` | `/v1/organizations/{organizationSlug}/groups/{groupName}/transfer` | `client.Group().create({ $action: 'transfer', ... })` |
| `unarchive` | `/v1/organizations/{organizationSlug}/groups/{groupName}/unarchive` | `client.Group().create({ $action: 'unarchive', ... })` |
| `update` | `/v1/organizations/{organizationSlug}/groups/{groupName}/update` | `client.Group().create({ $action: 'update', ... })` |

An action returns that action's OWN response, which is not necessarily a
Group record — check the API definition for its shape.

```ts
const result = await client.Group().create({
  $action: 'restore',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Group().create({
  organization_slug: 'example_organization_slug',
  location: 'example_location',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Group().list({ organization_slug: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Group().load({ id: 'group_id', organization_slug: 'organization_slug' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Group().remove({ id: 'group_id', organization_slug: 'organization_slug' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GroupEntity` instance with the same client and
options.

#### `client()`

Return the parent `TursoPlatformSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GroupConfigurationEntity

```ts
const group_configuration = client.GroupConfiguration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `delete_protection` | `boolean` | No | Prevent the group from being deleted. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.GroupConfiguration().load({ group_name: 'group_name', organization_id: 'organization_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.GroupConfiguration().update({
  group_name: 'group_name',
  organization_id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GroupConfigurationEntity` instance with the same client and
options.

#### `client()`

Return the parent `TursoPlatformSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InstanceEntity

```ts
const instance = client.Instance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `hostname` | `string` | No | The DNS hostname used for client libSQL and HTTP connections (specific to this instance only). |
| `id` | `string` | No |  |
| `name` | `string` | No | The name of the instance (location code). |
| `region` | `string` | No | The location code for the region this instance is located. |
| `type` | `string` | No | The type of database instance this, will be `primary` or `replica`. |
| `uuid` | `string` | No | The instance universal unique identifier (UUID). |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Instance().list({ database_name: "example", organization_id: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Instance().load({ id: 'instance_id', database_name: 'database_name', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InstanceEntity` instance with the same client and
options.

#### `client()`

Return the parent `TursoPlatformSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InviteEntity

```ts
const invite = client.Invite()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No | The datetime the invite was created in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. |
| `email` | `string` | No | The email of the person invited. |
| `id` | `number` | No | The unique ID for the invite. |
| `role` | `string` | No | The assigned role for the invited user. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Invite().list({ organization_slug: "example" })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Invite().remove({ id: 'invite_id', organization_slug: 'organization_slug' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InviteEntity` instance with the same client and
options.

#### `client()`

Return the parent `TursoPlatformSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LocationEntity

```ts
const location = client.Location()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `awsapnortheast1` | `string` | No |  |
| `awsapsouth1` | `string` | No |  |
| `awseuwest1` | `string` | No |  |
| `awsuseast1` | `string` | No |  |
| `awsuseast2` | `string` | No |  |
| `awsuswest2` | `string` | No |  |
| `delete_protection` | `boolean` | No | The current status for delete protection. |
| `id` | `string` | No |  |
| `locations` | `any[]` | No | An array of location keys the group is located. |
| `name` | `string` | No | The group name, unique across your organization. |
| `primary` | `string` | No | The primary location key. |
| `uuid` | `string` | No | The group universal unique identifier (UUID). |
| `version` | `string` | No | The current libSQL server version the databases in that group are running. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Location().create({
  group_name: 'example_group_name',
  id: 'example_id',
  organization_id: 'example_organization_id',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Location().load({ id: 'location_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Location().remove({ id: 'location_id', group_name: 'group_name', organization_id: 'organization_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LocationEntity` instance with the same client and
options.

#### `client()`

Return the parent `TursoPlatformSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MemberEntity

```ts
const member = client.Member()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | `string` | No | The email for the member. |
| `id` | `string` | No |  |
| `role` | `string` | No | The role assigned to the member. |
| `username` | `string` | No | The username for the member. |

### Field Usage by Operation

| Field | load | list | update | remove |
| --- | --- | --- | --- | --- |
| `email` | - | - | - | - |
| `id` | - | - | - | - |
| `role` | - | - | Yes | - |
| `username` | - | - | - | - |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Member().list({ organization_slug: "example" })
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Member().load({ id: 'member_id', organization_slug: 'organization_slug' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria. Resolves to the entity, marked as deleted.

```ts
const result = await client.Member().remove({ id: 'member_id', organization_slug: 'organization_slug' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Member().update({
  id: 'member_id',
  organization_slug: 'organization_slug',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MemberEntity` instance with the same client and
options.

#### `client()`

Return the parent `TursoPlatformSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OrganizationEntity

```ts
const organization = client.Organization()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `blocked_reads` | `boolean` | No | Returns the current status for blocked reads. |
| `blocked_writes` | `boolean` | No | Returns the current status for blocked writes. |
| `id` | `string` | No |  |
| `name` | `string` | No | The organization name. |
| `overages` | `boolean` | No | The name of the organization. |
| `plan_id` | `string` | No | The pricing plan identifier this organization is subscribed to. |
| `plan_timeline` | `string` | No | The billing cycle for the paid plan, if any. |
| `platform` | `string` | No | The external platform this organization is managed by. |
| `require_mfa` | `boolean` | No | Whether all members of the organization are required to have multi-factor authentication enabled. |
| `restore_enabled` | `boolean` | No | Whether deleted database and group recovery is enabled for the organization. |
| `slug` | `string` | No | The organization slug. |
| `type` | `string` | No | The type of account this organization is. |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `invite` | `/v2/organizations/{organizationSlug}/invites` | `client.Organization().create({ $action: 'invite', ... })` |
| `member` | `/v1/organizations/{organizationSlug}/members` | `client.Organization().create({ $action: 'member', ... })` |

An action returns that action's OWN response, which is not necessarily a
Organization record — check the API definition for its shape.

```ts
const result = await client.Organization().create({
  $action: 'invite',
  /* ...the action's own arguments */
})
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.Organization().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Organization().load({ id: 'organization_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`. Resolves to the updated entity.

```ts
const result = await client.Organization().update({
  id: 'organization_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OrganizationEntity` instance with the same client and
options.

#### `client()`

Return the parent `TursoPlatformSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OrganizationInvoiceEntity

```ts
const organization_invoice = client.OrganizationInvoice()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `amount_due` | `string` | No | The formatted price in USD for the invoice. |
| `due_date` | `string` | No | The due date for the invoice. |
| `invoice_number` | `string` | No | The unique ID for the invoice. |
| `invoice_pdf` | `string` | No | The link to the invoice PDF you can download. |
| `paid_at` | `string` | No | The date the invoice was paid. |
| `payment_failed_at` | `string` | No | The date the invoice payment last failed. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.OrganizationInvoice().list({ organization_slug: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OrganizationInvoiceEntity` instance with the same client and
options.

#### `client()`

Return the parent `TursoPlatformSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OrganizationPlanEntity

```ts
const organization_plan = client.OrganizationPlan()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | No | The name of the plan. |
| `price` | `string` | No | The monthly price of the plan. |
| `prices` | `any[]` | No |  |
| `quotas` | `Record<string, any>` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Resolves to an array of entities, one per record.

```ts
const results = await client.OrganizationPlan().list({ organization_slug: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OrganizationPlanEntity` instance with the same client and
options.

#### `client()`

Return the parent `TursoPlatformSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OrganizationSubscriptionEntity

```ts
const organization_subscription = client.OrganizationSubscription()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | `string` | No | The name of the plan for the current subscription. |
| `overages` | `boolean` | No | Whether overages are enabled for the organization. |
| `plan` | `string` | No | The name of the plan for the current subscription. |
| `timeline` | `string` | No | Whether the plan is billed monthly or yearly. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.OrganizationSubscription().load({ organization_slug: 'organization_slug' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OrganizationSubscriptionEntity` instance with the same client and
options.

#### `client()`

Return the parent `TursoPlatformSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OrganizationUsageEntity

```ts
const organization_usage = client.OrganizationUsage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `databases` | `any[]` | No | The databases for the organization and their usage. |
| `usage` | `Record<string, any>` | No | The usage object for the organization. |
| `uuid` | `string` | No | The UUID of the organization. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.OrganizationUsage().load({ organization_slug: 'organization_slug' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OrganizationUsageEntity` instance with the same client and
options.

#### `client()`

Return the parent `TursoPlatformSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RotateEntity

```ts
const rotate = client.Rotate()
```

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Rotate().create({
  organization_id: 'example_organization_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RotateEntity` instance with the same client and
options.

#### `client()`

Return the parent `TursoPlatformSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TokenEntity

```ts
const token = client.Token()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `jwt` | `string` | No | The generated authorization token (JWT). |
| `permissions` | `Record<string, any>` | No | The permissions for the token. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data. Resolves to the created entity.

```ts
const result = await client.Token().create({
  organization_id: 'example_organization_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TokenEntity` instance with the same client and
options.

#### `client()`

Return the parent `TursoPlatformSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UserEntity

```ts
const user = client.User()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avatarUrl` | `string` | No | URL to the user's avatar image. |
| `email` | `string` | No | The primary email address of the user. |
| `has_pending_invites` | `boolean` | No | Whether the user has pending organization invites waiting to be accepted or declined. |
| `mfa` | `boolean` | No | Whether the user has multi-factor authentication enabled. |
| `name` | `string` | No | The display name of the user. |
| `plan` | `string` | No | The user's current plan. |
| `username` | `string` | No | The username of the user. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.User().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UserEntity` instance with the same client and
options.

#### `client()`

Return the parent `TursoPlatformSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ValidateEntity

```ts
const validate = client.Validate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `exp` | `number` | No | The time of expiration for the provided token in unix epoch seconds, or `-1` if there is no expiration. |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria. Resolves to the entity, whose record `data()` reads.

```ts
const result = await client.Validate().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ValidateEntity` instance with the same client and
options.

#### `client()`

Return the parent `TursoPlatformSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new TursoPlatformSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

