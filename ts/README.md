# TursoPlatform TypeScript SDK

Unofficial TypeScript client for the Turso Platform API.

The TypeScript SDK for the TursoPlatform API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.ApiToken()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/omarmohelal/turso-platform-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/omarmohelal/turso-platform-sdk
npm install ./turso-platform-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { TursoPlatformSDK } from '@omarmohelal/turso-platform-sdk'

const client = new TursoPlatformSDK({
  apikey: process.env.TURSO_PLATFORM_APIKEY,
})
```

### 2. List apitoken records

`list()` resolves to an array of ApiToken ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const apitokens = await client.ApiToken().list()

for (const apitoken of apitokens) {
  console.log(apitoken.data())
}
```

### 3. Load a database

Database is nested under organization_slug, so provide the `organization_slug`.
`load()` returns the entity and throws on failure; `.data()` reads its record:

```ts
try {
  const database = await client.Database().load({
    organization_slug: 'example_organization_slug',
    id: 'example_id',
  })
  console.log(database.data())
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created ApiToken ENTITY (.data() for the record)
const created = await client.ApiToken().create({
  id: 'example_id',
})

// Remove
await client.ApiToken().remove({
  id: created.data().id!,
})
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const databaseusage = await client.DatabaseUsage().load({ database_name: "example", organization_slug: "example" })
  console.log(databaseusage.data())
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = TursoPlatformSDK.test()

const databaseusage = await client.DatabaseUsage().load({ database_name: 'example_database_name', organization_slug: 'example_organization_slug' })
// databaseusage is the DatabaseUsage entity; .data() reads its mock record
console.log(databaseusage.data())
```

You can also use the instance method:

```ts
const client = new TursoPlatformSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.DatabaseUsage()

// First call runs the operation and stores its result
await entity.load({ database_name: 'example_database_name', organization_slug: 'example_organization_slug' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new TursoPlatformSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
TURSO_PLATFORM_TEST_LIVE=TRUE
TURSO_PLATFORM_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### TursoPlatformSDK

#### Constructor

```ts
new TursoPlatformSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `ApiToken(data?)` | `ApiTokenEntity` | Create an ApiToken entity instance. |
| `AuditLog(data?)` | `AuditLogEntity` | Create an AuditLog entity instance. |
| `Database(data?)` | `DatabaseEntity` | Create a Database entity instance. |
| `DatabaseConfiguration(data?)` | `DatabaseConfigurationEntity` | Create a DatabaseConfiguration entity instance. |
| `DatabaseStat(data?)` | `DatabaseStatEntity` | Create a DatabaseStat entity instance. |
| `DatabaseUsage(data?)` | `DatabaseUsageEntity` | Create a DatabaseUsage entity instance. |
| `DeletedGroup(data?)` | `DeletedGroupEntity` | Create a DeletedGroup entity instance. |
| `Group(data?)` | `GroupEntity` | Create a Group entity instance. |
| `GroupConfiguration(data?)` | `GroupConfigurationEntity` | Create a GroupConfiguration entity instance. |
| `Instance(data?)` | `InstanceEntity` | Create an Instance entity instance. |
| `Invite(data?)` | `InviteEntity` | Create an Invite entity instance. |
| `Location(data?)` | `LocationEntity` | Create a Location entity instance. |
| `Member(data?)` | `MemberEntity` | Create a Member entity instance. |
| `Organization(data?)` | `OrganizationEntity` | Create an Organization entity instance. |
| `OrganizationInvoice(data?)` | `OrganizationInvoiceEntity` | Create an OrganizationInvoice entity instance. |
| `OrganizationPlan(data?)` | `OrganizationPlanEntity` | Create an OrganizationPlan entity instance. |
| `OrganizationSubscription(data?)` | `OrganizationSubscriptionEntity` | Create an OrganizationSubscription entity instance. |
| `OrganizationUsage(data?)` | `OrganizationUsageEntity` | Create an OrganizationUsage entity instance. |
| `User(data?)` | `UserEntity` | Create an User entity instance. |
| `Validate(data?)` | `ValidateEntity` | Create a Validate entity instance. |
| `tester(testopts?, sdkopts?)` | `TursoPlatformSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `TursoPlatformSDK.test(testopts?, sdkopts?)` | `TursoPlatformSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity, and return it. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity, and return it. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Entity>` | Remove an entity, and return it marked as deleted. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): TursoPlatformSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to the entity, marked as deleted.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### ApiToken

| Field | Description |
| --- | --- |
| `created_at` | The date the token was created. |
| `group` | The group name (inside `organization`) to restrict this token to. |
| `id` | The ID generated by Turso for the API Token. |
| `name` | The name given to the API Token. |
| `organization` | The organization slug to restrict this token to. |
| `owner` | The user who minted the token. |
| `scopes` | Permissions to grant a group-scoped token. |
| `token` | The actual token contents as a JWT. |

Operations: create, list, remove.

API path: `/v1/auth/api-tokens/{tokenName}`

#### AuditLog

| Field | Description |
| --- | --- |
| `author` | The username of the user who performed the action. |
| `code` | The code associated to the action taken. |
| `created_at` | A formatted [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp this action was performed. |
| `data` | The payload of the action performed. |
| `message` | Additional context from the performed action. |
| `origin` | Where this action was performed. |

Operations: list.

API path: `/v1/organizations/{organizationSlug}/audit-logs`

#### Database

| Field | Description |
| --- | --- |
| `DbId` | The database universal unique identifier (UUID). |
| `Hostname` | The DNS hostname used for client libSQL and HTTP connections. |
| `Name` | The database name, **unique** across your organization. |
| `block_reads` | The current status for blocked reads. |
| `block_writes` | The current status for blocked writes. |
| `delete_protection` | The current status for delete protection. |
| `deleted_at` | When the database was deleted. |
| `group` | The name of the group the database belongs to. |
| `group_deleted_at` | Set when the database's group was deleted with it. |
| `group_id` | The UUID of the group the database belonged to. |
| `id` |  |
| `name` | The name of the new database. |
| `organization_id` | The UUID of the organization. |
| `parent` |  |
| `primaryRegion` | The primary region location code the group the database belongs to. |
| `regions` | A list of regions for the group the database belongs to. |
| `remote_encryption` | Encryption configuration for the database. |
| `seed` |  |
| `size_limit` | The maximum size of the database in bytes. |

Operations: create, list, load, remove.

API path: `/v3/organizations/{organizationId}/databases/{databaseId}/restore`

#### DatabaseConfiguration

| Field | Description |
| --- | --- |
| `allow_attach` | Allow or disallow attaching databases to the current database. |
| `allowed_aws_vpc_ids` | List of allowed AWS VPC endpoint IDs. |
| `allowed_ips` | List of allowed IP addresses and CIDR blocks. |
| `block_reads` | The current status for blocked reads. |
| `block_writes` | The current status for blocked writes. |
| `delete_protection` | Prevent the database from being deleted. |
| `size_limit` | The maximum size of the database in bytes. |

Operations: list, update.

API path: `/v1/organizations/{organizationSlug}/databases/{databaseName}/configuration`

#### DatabaseStat

| Field | Description |
| --- | --- |
| `query` | A string representing the SQL query executed. |
| `rows_read` | An integer indicating the number of rows read by the query, which reflects the volume of data the query processed from the database. |
| `rows_written` | An integer indicating the number of rows written (inserted, updated, or deleted) by the query, which reflects the impact of the query on the database data. |

Operations: list.

API path: `/v1/organizations/{organizationSlug}/databases/{databaseName}/stats`

#### DatabaseUsage

| Field | Description |
| --- | --- |
| `instances` | The usage objects for instances of the current database. |
| `total` | The total usage for the database. |
| `uuid` | The database universal unique identifier (UUID). |

Operations: load.

API path: `/v1/organizations/{organizationSlug}/databases/{databaseName}/usage`

#### DeletedGroup

| Field | Description |
| --- | --- |
| `cascade_databases` | The number of member databases that restoring the group would bring back with it. |
| `deleted_at` | When the group was deleted. |
| `name` | The group name. |
| `uuid` | The group UUID. |

Operations: list.

API path: `/v3/organizations/{organizationId}/deleted-groups`

#### Group

| Field | Description |
| --- | --- |
| `delete_protection` | The current status for delete protection. |
| `extensions` | The extensions to enable for new databases created in this group. |
| `id` |  |
| `location` | The location key for the new group. |
| `locations` | An array of location keys the group is located. |
| `name` | The group name, unique across your organization. |
| `primary` | The primary location key. |
| `uuid` | The group universal unique identifier (UUID). |
| `version` | The current libSQL server version the databases in that group are running. |

Operations: create, list, load, remove.

API path: `/v3/organizations/{organizationId}/groups/{groupId}/restore`

#### GroupConfiguration

| Field | Description |
| --- | --- |
| `delete_protection` | Prevent the group from being deleted. |

Operations: load, update.

API path: `/v1/organizations/{organizationSlug}/groups/{groupName}/configuration`

#### Instance

| Field | Description |
| --- | --- |
| `hostname` | The DNS hostname used for client libSQL and HTTP connections (specific to this instance only). |
| `id` |  |
| `name` | The name of the instance (location code). |
| `region` | The location code for the region this instance is located. |
| `type` | The type of database instance this, will be `primary` or `replica`. |
| `uuid` | The instance universal unique identifier (UUID). |

Operations: list, load.

API path: `/v1/organizations/{organizationSlug}/databases/{databaseName}/instances`

#### Invite

| Field | Description |
| --- | --- |
| `created_at` | The datetime the invite was created in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. |
| `email` | The email of the person invited. |
| `id` | The unique ID for the invite. |
| `role` | The assigned role for the invited user. |

Operations: list, remove.

API path: `/v2/organizations/{organizationSlug}/invites`

#### Location

| Field | Description |
| --- | --- |
| `awsapnortheast1` |  |
| `awsapsouth1` |  |
| `awseuwest1` |  |
| `awsuseast1` |  |
| `awsuseast2` |  |
| `awsuswest2` |  |
| `delete_protection` | The current status for delete protection. |
| `id` |  |
| `locations` | An array of location keys the group is located. |
| `name` | The group name, unique across your organization. |
| `primary` | The primary location key. |
| `uuid` | The group universal unique identifier (UUID). |
| `version` | The current libSQL server version the databases in that group are running. |

Operations: create, load, remove.

API path: `/v1/organizations/{organizationSlug}/groups/{groupName}/locations/{location}`

#### Member

| Field | Description |
| --- | --- |
| `email` | The email for the member. |
| `id` |  |
| `role` | The role assigned to the member. |
| `username` | The username for the member. |

Operations: list, load, remove, update.

API path: `/v1/organizations/{organizationSlug}/members`

#### Organization

| Field | Description |
| --- | --- |
| `blocked_reads` | Returns the current status for blocked reads. |
| `blocked_writes` | Returns the current status for blocked writes. |
| `id` |  |
| `name` | The organization name. |
| `overages` | The name of the organization. |
| `plan_id` | The pricing plan identifier this organization is subscribed to. |
| `plan_timeline` | The billing cycle for the paid plan, if any. |
| `platform` | The external platform this organization is managed by. |
| `require_mfa` | Whether all members of the organization are required to have multi-factor authentication enabled. |
| `restore_enabled` | Whether deleted database and group recovery is enabled for the organization. |
| `slug` | The organization slug. |
| `type` | The type of account this organization is. |

Operations: create, list, load, update.

API path: `/v2/organizations/{organizationSlug}/invites`

#### OrganizationInvoice

| Field | Description |
| --- | --- |
| `amount_due` | The formatted price in USD for the invoice. |
| `due_date` | The due date for the invoice. |
| `invoice_number` | The unique ID for the invoice. |
| `invoice_pdf` | The link to the invoice PDF you can download. |
| `paid_at` | The date the invoice was paid. |
| `payment_failed_at` | The date the invoice payment last failed. |

Operations: list.

API path: `/v1/organizations/{organizationSlug}/invoices`

#### OrganizationPlan

| Field | Description |
| --- | --- |
| `name` | The name of the plan. |
| `price` | The monthly price of the plan. |
| `prices` |  |
| `quotas` |  |

Operations: list.

API path: `/v1/organizations/{organizationSlug}/plans`

#### OrganizationSubscription

| Field | Description |
| --- | --- |
| `name` | The name of the plan for the current subscription. |
| `overages` | Whether overages are enabled for the organization. |
| `plan` | The name of the plan for the current subscription. |
| `timeline` | Whether the plan is billed monthly or yearly. |

Operations: load.

API path: `/v1/organizations/{organizationSlug}/subscription`

#### OrganizationUsage

| Field | Description |
| --- | --- |
| `databases` | The databases for the organization and their usage. |
| `usage` | The usage object for the organization. |
| `uuid` | The UUID of the organization. |

Operations: load.

API path: `/v1/organizations/{organizationSlug}/usage`

#### User

| Field | Description |
| --- | --- |
| `avatarUrl` | URL to the user's avatar image. |
| `email` | The primary email address of the user. |
| `has_pending_invites` | Whether the user has pending organization invites waiting to be accepted or declined. |
| `mfa` | Whether the user has multi-factor authentication enabled. |
| `name` | The display name of the user. |
| `plan` | The user's current plan. |
| `username` | The username of the user. |

Operations: load.

API path: `/v1/user`

#### Validate

| Field | Description |
| --- | --- |
| `exp` | The time of expiration for the provided token in unix epoch seconds, or `-1` if there is no expiration. |

Operations: load.

API path: `/v1/auth/validate`



## Entities


### ApiToken

Create an instance: `const api_token = client.ApiToken()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | The date the token was created. |
| `group` | `string` | The group name (inside `organization`) to restrict this token to. |
| `id` | `string` | The ID generated by Turso for the API Token. |
| `name` | `string` | The name given to the API Token. |
| `organization` | `string` | The organization slug to restrict this token to. |
| `owner` | `Record<string, any>` | The user who minted the token. |
| `scopes` | `any[]` | Permissions to grant a group-scoped token. |
| `token` | `string` | The actual token contents as a JWT. |

#### Example: List

```ts
const api_tokens = await client.ApiToken().list()
```

#### Example: Create

```ts
const api_token = await client.ApiToken().create({
  id: 'example_id',
})
```


### AuditLog

Create an instance: `const audit_log = client.AuditLog()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `author` | `string` | The username of the user who performed the action. |
| `code` | `string` | The code associated to the action taken. |
| `created_at` | `string` | A formatted [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp this action was performed. |
| `data` | `Record<string, any>` | The payload of the action performed. |
| `message` | `string` | Additional context from the performed action. |
| `origin` | `string` | Where this action was performed. |

#### Example: List

```ts
const audit_logs = await client.AuditLog().list({ organization_slug: "example" })
```


### Database

Create an instance: `const database = client.Database()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `DbId` | `string` | The database universal unique identifier (UUID). |
| `Hostname` | `string` | The DNS hostname used for client libSQL and HTTP connections. |
| `Name` | `string` | The database name, **unique** across your organization. |
| `block_reads` | `boolean` | The current status for blocked reads. |
| `block_writes` | `boolean` | The current status for blocked writes. |
| `delete_protection` | `boolean` | The current status for delete protection. |
| `deleted_at` | `string` | When the database was deleted. |
| `group` | `string` | The name of the group the database belongs to. |
| `group_deleted_at` | `string` | Set when the database's group was deleted with it. |
| `group_id` | `string` | The UUID of the group the database belonged to. |
| `id` | `string` |  |
| `name` | `string` | The name of the new database. |
| `organization_id` | `string` | The UUID of the organization. |
| `parent` | `Record<string, any>` |  |
| `primaryRegion` | `string` | The primary region location code the group the database belongs to. |
| `regions` | `any[]` | A list of regions for the group the database belongs to. |
| `remote_encryption` | `Record<string, any>` | Encryption configuration for the database. |
| `seed` | `Record<string, any>` |  |
| `size_limit` | `string` | The maximum size of the database in bytes. |

#### Example: Load

```ts
const database = await client.Database().load({ id: 'database_id', organization_slug: 'organization_slug' })
```

#### Example: List

```ts
const databases = await client.Database().list({ organization_id: "example", deleted: true })
```

#### Example: Create

```ts
const database = await client.Database().create({
  organization_slug: 'example_organization_slug',
  name: 'example_name',
})
```


### DatabaseConfiguration

Create an instance: `const database_configuration = client.DatabaseConfiguration()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allow_attach` | `boolean` | Allow or disallow attaching databases to the current database. |
| `allowed_aws_vpc_ids` | `any[]` | List of allowed AWS VPC endpoint IDs. |
| `allowed_ips` | `any[]` | List of allowed IP addresses and CIDR blocks. |
| `block_reads` | `boolean` | The current status for blocked reads. |
| `block_writes` | `boolean` | The current status for blocked writes. |
| `delete_protection` | `boolean` | Prevent the database from being deleted. |
| `size_limit` | `string` | The maximum size of the database in bytes. |

#### Example: List

```ts
const database_configurations = await client.DatabaseConfiguration().list({ database_name: "example", organization_slug: "example" })
```


### DatabaseStat

Create an instance: `const database_stat = client.DatabaseStat()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `query` | `string` | A string representing the SQL query executed. |
| `rows_read` | `number` | An integer indicating the number of rows read by the query, which reflects the volume of data the query processed from the database. |
| `rows_written` | `number` | An integer indicating the number of rows written (inserted, updated, or deleted) by the query, which reflects the impact of the query on the database data. |

#### Example: List

```ts
const database_stats = await client.DatabaseStat().list({ database_name: "example", organization_slug: "example" })
```


### DatabaseUsage

Create an instance: `const database_usage = client.DatabaseUsage()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `instances` | `any[]` | The usage objects for instances of the current database. |
| `total` | `Record<string, any>` | The total usage for the database. |
| `uuid` | `string` | The database universal unique identifier (UUID). |

#### Example: Load

```ts
const database_usage = await client.DatabaseUsage().load({ database_name: 'database_name', organization_slug: 'organization_slug' })
```


### DeletedGroup

Create an instance: `const deleted_group = client.DeletedGroup()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `cascade_databases` | `number` | The number of member databases that restoring the group would bring back with it. |
| `deleted_at` | `string` | When the group was deleted. |
| `name` | `string` | The group name. |
| `uuid` | `string` | The group UUID. |

#### Example: List

```ts
const deleted_groups = await client.DeletedGroup().list({ organization_id: "example" })
```


### Group

Create an instance: `const group = client.Group()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `delete_protection` | `boolean` | The current status for delete protection. |
| `extensions` | `any` | The extensions to enable for new databases created in this group. |
| `id` | `string` |  |
| `location` | `string` | The location key for the new group. |
| `locations` | `any[]` | An array of location keys the group is located. |
| `name` | `string` | The group name, unique across your organization. |
| `primary` | `string` | The primary location key. |
| `uuid` | `string` | The group universal unique identifier (UUID). |
| `version` | `string` | The current libSQL server version the databases in that group are running. |

#### Example: Load

```ts
const group = await client.Group().load({ id: 'group_id', organization_slug: 'organization_slug' })
```

#### Example: List

```ts
const groups = await client.Group().list({ organization_slug: "example" })
```

#### Example: Create

```ts
const group = await client.Group().create({
  organization_slug: 'example_organization_slug',
  location: 'example_location',
})
```


### GroupConfiguration

Create an instance: `const group_configuration = client.GroupConfiguration()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `delete_protection` | `boolean` | Prevent the group from being deleted. |

#### Example: Load

```ts
const group_configuration = await client.GroupConfiguration().load({ group_name: 'group_name', organization_slug: 'organization_slug' })
```


### Instance

Create an instance: `const instance = client.Instance()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `hostname` | `string` | The DNS hostname used for client libSQL and HTTP connections (specific to this instance only). |
| `id` | `string` |  |
| `name` | `string` | The name of the instance (location code). |
| `region` | `string` | The location code for the region this instance is located. |
| `type` | `string` | The type of database instance this, will be `primary` or `replica`. |
| `uuid` | `string` | The instance universal unique identifier (UUID). |

#### Example: Load

```ts
const instance = await client.Instance().load({ id: 'instance_id', database_name: 'database_name', organization_slug: 'organization_slug' })
```

#### Example: List

```ts
const instances = await client.Instance().list({ database_name: "example", organization_slug: "example" })
```


### Invite

Create an instance: `const invite = client.Invite()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` | The datetime the invite was created in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. |
| `email` | `string` | The email of the person invited. |
| `id` | `number` | The unique ID for the invite. |
| `role` | `string` | The assigned role for the invited user. |

#### Example: List

```ts
const invites = await client.Invite().list({ organization_slug: "example" })
```


### Location

Create an instance: `const location = client.Location()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `awsapnortheast1` | `string` |  |
| `awsapsouth1` | `string` |  |
| `awseuwest1` | `string` |  |
| `awsuseast1` | `string` |  |
| `awsuseast2` | `string` |  |
| `awsuswest2` | `string` |  |
| `delete_protection` | `boolean` | The current status for delete protection. |
| `id` | `string` |  |
| `locations` | `any[]` | An array of location keys the group is located. |
| `name` | `string` | The group name, unique across your organization. |
| `primary` | `string` | The primary location key. |
| `uuid` | `string` | The group universal unique identifier (UUID). |
| `version` | `string` | The current libSQL server version the databases in that group are running. |

#### Example: Load

```ts
const location = await client.Location().load({ id: 'location_id' })
```

#### Example: Create

```ts
const location = await client.Location().create({
  group_name: 'example_group_name',
  id: 'example_id',
  organization_slug: 'example_organization_slug',
})
```


### Member

Create an instance: `const member = client.Member()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` | The email for the member. |
| `id` | `string` |  |
| `role` | `string` | The role assigned to the member. |
| `username` | `string` | The username for the member. |

#### Example: Load

```ts
const member = await client.Member().load({ id: 'member_id', organization_slug: 'organization_slug' })
```

#### Example: List

```ts
const members = await client.Member().list({ organization_slug: "example" })
```


### Organization

Create an instance: `const organization = client.Organization()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `blocked_reads` | `boolean` | Returns the current status for blocked reads. |
| `blocked_writes` | `boolean` | Returns the current status for blocked writes. |
| `id` | `string` |  |
| `name` | `string` | The organization name. |
| `overages` | `boolean` | The name of the organization. |
| `plan_id` | `string` | The pricing plan identifier this organization is subscribed to. |
| `plan_timeline` | `string` | The billing cycle for the paid plan, if any. |
| `platform` | `string` | The external platform this organization is managed by. |
| `require_mfa` | `boolean` | Whether all members of the organization are required to have multi-factor authentication enabled. |
| `restore_enabled` | `boolean` | Whether deleted database and group recovery is enabled for the organization. |
| `slug` | `string` | The organization slug. |
| `type` | `string` | The type of account this organization is. |

#### Example: Load

```ts
const organization = await client.Organization().load({ id: 'organization_id' })
```

#### Example: List

```ts
const organizations = await client.Organization().list()
```


### OrganizationInvoice

Create an instance: `const organization_invoice = client.OrganizationInvoice()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `amount_due` | `string` | The formatted price in USD for the invoice. |
| `due_date` | `string` | The due date for the invoice. |
| `invoice_number` | `string` | The unique ID for the invoice. |
| `invoice_pdf` | `string` | The link to the invoice PDF you can download. |
| `paid_at` | `string` | The date the invoice was paid. |
| `payment_failed_at` | `string` | The date the invoice payment last failed. |

#### Example: List

```ts
const organization_invoices = await client.OrganizationInvoice().list({ organization_slug: "example" })
```


### OrganizationPlan

Create an instance: `const organization_plan = client.OrganizationPlan()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | The name of the plan. |
| `price` | `string` | The monthly price of the plan. |
| `prices` | `any[]` |  |
| `quotas` | `Record<string, any>` |  |

#### Example: List

```ts
const organization_plans = await client.OrganizationPlan().list({ organization_slug: "example" })
```


### OrganizationSubscription

Create an instance: `const organization_subscription = client.OrganizationSubscription()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | `string` | The name of the plan for the current subscription. |
| `overages` | `boolean` | Whether overages are enabled for the organization. |
| `plan` | `string` | The name of the plan for the current subscription. |
| `timeline` | `string` | Whether the plan is billed monthly or yearly. |

#### Example: Load

```ts
const organization_subscription = await client.OrganizationSubscription().load({ organization_slug: 'organization_slug' })
```


### OrganizationUsage

Create an instance: `const organization_usage = client.OrganizationUsage()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `databases` | `any[]` | The databases for the organization and their usage. |
| `usage` | `Record<string, any>` | The usage object for the organization. |
| `uuid` | `string` | The UUID of the organization. |

#### Example: Load

```ts
const organization_usage = await client.OrganizationUsage().load({ organization_slug: 'organization_slug' })
```


### User

Create an instance: `const user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `avatarUrl` | `string` | URL to the user's avatar image. |
| `email` | `string` | The primary email address of the user. |
| `has_pending_invites` | `boolean` | Whether the user has pending organization invites waiting to be accepted or declined. |
| `mfa` | `boolean` | Whether the user has multi-factor authentication enabled. |
| `name` | `string` | The display name of the user. |
| `plan` | `string` | The user's current plan. |
| `username` | `string` | The username of the user. |

#### Example: Load

```ts
const user = await client.User().load()
```


### Validate

Create an instance: `const validate = client.Validate()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `exp` | `number` | The time of expiration for the provided token in unix epoch seconds, or `-1` if there is no expiration. |

#### Example: Load

```ts
const validate = await client.Validate().load()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | Test transport |

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
turso-platform/
├── src/
│   ├── TursoPlatformSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { TursoPlatformSDK } from '@omarmohelal/turso-platform-sdk'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const databaseusage = client.DatabaseUsage()
await databaseusage.load({ database_name: "example", organization_slug: "example" })

// databaseusage.data() now returns the databaseusage data from the last `load`
// databaseusage.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
