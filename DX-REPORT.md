# Developer experience report: Voxgig SDK generator on the Turso Platform API

Omar Mohamad, 2026-10-14. Mini task 1.

## Summary

I generated a TypeScript SDK for the Turso Platform API (OpenAPI 3.0.1, 53 operations) with
`@voxgig/create-sdkgen` 0.30.7 / `@voxgig/sdkgen` 4.34.5 on Windows 11. After two known Windows
workarounds and two corrections in `guide.aontu`, the SDK builds, passes its 372 offline tests, and
answered 14 of 15 read-only operations against the live API (the 15th was a 403 from Turso).

Six findings below are new as far as I could tell: for each one I searched the voxgig/sdkgen,
apidef and create-sdkgen issues by keyword (voxgig/docgen as well for finding 4) and found no
existing report. Related issues are linked where they exist. The ones with the most developer
impact:

- Path parameters are sent in the JSON request body, including on endpoints that take no body
  (finding 3).
- The TypeScript type for `Database().list()` only has the parameters of one of its two routes, so
  the everyday call does not type-check (finding 6).
- A slug path parameter is renamed `organization_id` on nested entities, the same name the SDK uses
  for a real organization ID elsewhere (finding 1).

## Environment and versions

| | |
|---|---|
| OS | Windows 11 Pro (10.0.26300), PowerShell 7 |
| Node / npm | 24.21.0 / 11.19.0 (generation); the system Node 22.23.2 is below the generator's floor |
| `@voxgig/create-sdkgen` | 0.30.7 (`npm create @voxgig/sdkgen@latest`) |
| `@voxgig/sdkgen` | 4.34.5 |
| `@voxgig/apidef` | 8.25.2 |
| `@voxgig/model` | 12.0.1 |
| `@voxgig/docgen` | 0.30.1 |
| `aontu` / `jostraca` / `@voxgig/struct` | 0.76.0 / 0.39.0 / 0.3.7 |
| `typescript` | 7.0.2 in `.sdk`, 5.9.3 in `ts/` |
| Spec | https://docs.turso.tech/api-reference/openapi.json, fetched 2026-10-14 13:29 +03:00, sha256 `22bd90b9…c38d98` |

## Timeline (2026-10-14, local time)

| Time | Step | Result |
|---|---|---|
| 13:29 | `npm create @voxgig/sdkgen@latest -- turso-platform -o turso-platform-sdk -d ./_input/turso-openapi.json` | 167 scaffold files written, then `spawn npm ENOENT` (K1) |
| 13:30–13:34 | `npm install` in `.sdk` by hand | OK (231 s) |
| 13:34 | `npx voxgig-sdkgen target add ts` | OK |
| 13:35 | `npm run generate` | `source not found: api/api-info.aontu` (K2) |
| 13:37 | `./` added to bare includes, `npm run generate` | OK, 22 entities |
| 13:40 | `cd ts && npm install && npm test` | 378 tests: 346 pass, **2 fail**, 30 skipped (finding 2) |
| 13:44 | Two corrections in `guide.aontu`, regenerate, test | 372 tests: 344 pass, 0 fail, 28 skipped |
| 13:46 | `npx voxgig-sdkgen doctor` | Exit 1 on two orphan flow files (K3); clean after removing them |
| 13:48–14:00 | Publisher, README text, `phase: top` off, summary edition removed | Root files now hand-maintained |
| 14:22 | Re-ran doctor, generate and tests after those changes | Root-README gate failed on my hand-written snippets (finding 6); fixed the snippets |
| 14:30 | Final run | 372 tests: 344 pass, 0 fail, 28 skipped; doctor clean |
| 14:52–14:57 | Read-only live check against api.turso.tech (fresh free account) | 15 entity operations with GET: 14 OK, 1 × 403 |
| 16:24–16:26 | CI workflow on a self-hosted runner (Ubuntu 24.04.5 in WSL, Node 24.21.0) | All steps passed |

## Findings

### Already reported upstream (reproduced, not re-reported)

- **K1.** `npm create @voxgig/sdkgen` stops at its own `npm install` with `spawn npm ENOENT` on
  Windows: [create-sdkgen#58](https://github.com/voxgig/create-sdkgen/issues/58). Workaround: run
  `npm install` in `.sdk` yourself; the scaffold is otherwise complete.
- **K2.** `npm run generate` fails with `source not found: api/api-info.aontu` on Windows:
  [create-sdkgen#62](https://github.com/voxgig/create-sdkgen/issues/62). One small addition: the
  scaffolded `sdk.aontu` mixes both styles (`@"./config.aontu"` next to `@"api/api-info.aontu"`),
  and only the bare ones fail. Prefixing the bare local includes in `model/sdk.aontu` and
  `test/test.aontu` with `./` fixed it.
- **K3.** Switching an entity off in the guide leaves its `model/flow/Basic<Entity>Flow.aontu`
  behind: [sdkgen#198](https://github.com/voxgig/sdkgen/issues/198). `doctor` reports it as
  `ORPHAN MODEL FILE` and exits 1, but its summary line reads
  `0 forked, 0 edited, 0 stale, 0 missing, 0 outdated` and advises `voxgig-sdkgen target add <lang>`,
  which does not remove the files. A count for orphans and advice to delete them would help.

### 1. A slug path parameter is renamed `organization_id` on nested entities

**Repro.** Generate from the Turso spec, then read `.sdk/model/guide/base-guide.aontu`.

**Actual.** `{organizationSlug}` becomes `organization_slug` on direct children of an organization
(`database`, `group`, `member`, …) but `organization_id` on nested ones (`database_configuration`,
`database_stat`, `database_usage`, `group_configuration`, `instance`, `location`, `rotate`,
`token`). The v3 paths also have `{organizationId}`, a different value, which is renamed
`organization_id` too. So `client.Instance().list({ organization_id: 'my-org-slug', database_name:
'my-db' })` takes the slug, while `client.Database().list({ organization_id, deleted: true })`
selects the v3 deleted-databases route, where `organization_id` must be Turso's internal ID.

**Expected.** One name for one parameter across the SDK, and a slug is not called an id.

**Impact.** Entities listed next to each other use the same argument name for different values.
Copying an argument from one example to another fails at the API, not at compile time.

**Suggested fix.** apidef#132 added "a name is never called an id" for parameters named `name` or
`*_name`. Adding `slug` / `*_slug` to that rule would remove Turso's `organization_id` renames.
Other common non-id keys (`username`, `email`, `key`, `code`) are worth considering in the same rule.

**Workaround used.** Seven `rename: param: organizationSlug: organization_slug` lines in
`guide.aontu`. `Organization().load()` still takes the slug as `id`, which is the rule for an
entity's own key.

### 2. A verb behind a static segment becomes its own entity, and the README examples fail

**Repro.** Fresh generate, then `cd ts && npm test`.

**Actual.** `/databases/{databaseName}/auth/rotate` and `/groups/{groupName}/auth/rotate` become
one entity `rotate`; the two `/auth/tokens` paths become an entity `token`. Each serves two parents
and picks the route from whichever of `database_name` / `group_name` you pass. The generated
examples for `Rotate().create` and `Token().create` pass only `organization_id`, so two tests fail
on a fresh SDK:

```
✖ ts/README.md — every runnable example executes in test mode
  snippet 42 threw at runtime: TursoPlatformSDK: create: Operation "create" has no endpoint
  whose path parameters are all given (missing: database_name).
  snippet 43 threw at runtime: (same message)
✖ ts/REFERENCE.md — every runnable example executes in test mode
  snippets 61 and 63: (same message)
```

By contrast `/groups/{groupName}/transfer` and `/unarchive` are read as actions on `group` (the
rule from apidef#48); the extra `auth` segment seems to be what defeats it. The example half is the
same class as [sdkgen#350](https://github.com/voxgig/sdkgen/issues/350) (open, for `load`).

**Expected.** `rotate` and `token` as actions on `database` and `group`, like `transfer`. Failing
that, examples for a multi-route operation should pass the parameters of one complete route.

**Impact.** A first-time user who runs `npm test` on a fresh SDK sees red, in a test about the
documentation. `client.Rotate()` is also hard to discover: nothing in its name says database or
group.

**Workaround used.** Switch off `rotate` and `token`, and declare the four paths as actions on
`database` and `group` in `guide.aontu` (about 30 lines). After that the suite has 0 failures and
the calls route correctly (`POST /v1/organizations/my-org/databases/my-db/auth/tokens`, checked
with a fake `fetch`). The `readme_examples` test is what surfaced this.

### 3. Path parameters are sent in the JSON request body

**Repro.** Capture the request with a fake `fetch` (no network):

```js
const client = new TursoPlatformSDK({ apikey: 'x', system: { fetch: async (url, init) => {
  console.log(init.method, url, init.body)
  return new Response('{"database":{}}', { headers: { 'content-type': 'application/json' } })
} } })
await client.Database().create({ organization_slug: 'my-org', name: 'new-db', group: 'default' })
```

**Actual.**

```
POST https://api.turso.tech/v1/organizations/my-org/databases
{ "group": "default", "name": "new-db", "organization_slug": "my-org" }
```

It is worse on endpoints whose spec has no request body: `Location().create` (add a location to a
group) sends `{"group_name":"default","id":"ams","organization_slug":"my-org"}`, and the group
`unarchive` action sends `{"group_name":"default","organization_slug":"my-org"}`.

**Cause.** `ts/src/utility/TransformRequestUtility.ts`, `routedArgNames()`: header, cookie and query
arguments are removed from the body, path arguments are not. sdkgen#389 used the request body's
property list (`bf`, apidef 8.25.0) to decide which header/cookie/query arguments the body keeps,
but path parameters are outside that rule.

**Expected.** A path parameter stays out of the body unless the request body schema declares it, and
an endpoint with no request body gets no body. `bf` already carries the information for both.

**Impact.** An API that rejects unknown properties would refuse these requests, and endpoints with no
body still receive one. Not tested against Turso, because that needs a write.

**Workaround.** None without editing generated code, so none applied.

### 4. Root files assume the default targets and publisher

After setting `main.kit.publisher` and generating only `ts`:

- `CHANGELOG.md` says the release covers "TypeScript, Python, PHP, Go, Ruby, and Lua, plus CLI and
  MCP surfaces". The list is fixed text in `src/cmp/Changelog.ts` (line 22).
- `SECURITY.md` says "the generated <publisher name> SDK packages published from this repository (npm,
  PyPI, Packagist, RubyGems, LuaRocks, and the Go module)". `src/cmp/Security.ts` (line 33) puts the
  publisher's name where the SDK's name belongs, and the registry list is fixed.
- `SUMMARY.md` (summary edition) shows the spec's placeholder description ("API description here")
  although `main.kit.text.summary` was set. This part is already reported as
  [docgen#39](https://github.com/voxgig/docgen/issues/39).

**Impact.** Small, but these are among the first files a reviewer opens, and they state things that
are not true of the repository. Same spirit as sdkgen#340 ("say only what is true").

**Suggested fix.** Build the language and registry lists from the active targets, and use the SDK
name in SECURITY.md.

**Workaround used.** `main: kit: phase: top: active: false`, then fixed CHANGELOG.md and SECURITY.md
by hand and removed the summary edition with `voxgig-sdkgen edition remove summary` (which removed
the model files but left the generated `SUMMARY.md` behind). With the root files hand-maintained, I
also cut the generated `ci.yml` (24 jobs, one per bundled language, each skipping itself when its
directory is absent) down to the one job this repository needs.

### 5. The offline mock filters `list()` by parent for some entities only

Seeded with one database and one group whose records carry no `organization_slug`,
`Group().list({ organization_slug: 'acme' })` returns 0 records and `Database().list(…)` returns 1.
With `organization_slug: 'zzz'` on the records, the database is still returned for `'acme'`. I did
not investigate why (`database` has two `list` routes, `group` has one). In practice: when writing
tests against `TursoPlatformSDK.test()`, seed the parent parameter on every record.

### 6. TypeScript types for operations with several routes

**Repro.** Type-check this against the generated SDK (the generated root-README gate does exactly
that, which is how I found it):

```ts
await client.Database().list({ organization_slug: 'my-org' })
```

**Actual.**

```
error TS2561: Object literal may only specify known properties, but 'organization_slug' does not
exist in type 'DatabaseListMatch'. Did you mean to write 'organization_id'?
```

`DatabaseListMatch` (`ts/src/TursoPlatformTypes.ts`) holds only the v3 route's parameters
(`organization_id`, a required `deleted`, `cursor`, `limit`, `search`). The v1 route's
`organization_slug`, `group`, `parent` and `schema` are missing, although the call works at runtime.
Actions have a related problem: `create({ $action: 'token', organization_slug, database_name })`
does not type-check because `DatabaseCreateData` requires the plain create's `name`, and the result
is typed as `Database`, so the returned `jwt` is not visible. That half overlaps
[sdkgen#215](https://github.com/voxgig/sdkgen/issues/215) (create types come from the response
schema).

**Expected.** A match type that accepts any one complete route (a union of per-route types, or the
merged parameters as optional), and action payload and result types of their own.

**Impact.** In a strict TypeScript project the most common Turso call, listing databases, needs a
cast. Developers will reasonably conclude the SDK is wrong about the API.

**Workaround used.** `as any` on that call, with a comment pointing here, in the README and the
example.

## Other observations

- Every generate logs `WARN flow-step-unreachable` and switches off nine steps of the generated live
  flows (for example `BasicApiTokenFlow#0 (create)`, `BasicOrganizationFlow#0 (create)`). It affects
  only the live suite, which I did not run, so I have not judged whether those steps are right to
  skip.
- Response fields are all optional in the generated types (open:
  [sdkgen#269](https://github.com/voxgig/sdkgen/issues/269)); the example handles `undefined` names
  when sorting.

## What worked well

- **Auth from an incomplete spec.** Turso's spec declares `bearerAuth` but no top-level `security`.
  apidef still picked the scheme, and every request carries `Authorization: Bearer …` (checked with a
  fake `fetch` on ten calls).
- **Most of the entity model was right first time.** Of 22 inferred entities, two needed restructuring
  (`rotate`, `token`) and six needed one parameter renamed. Envelopes were picked correctly where
  the live check could test them (members, plans, tokens, user).
- **The guide is a good correction surface.** Both fixes were declarative, lived in one file, and
  survived regeneration.
- **The generated tests caught real bugs.** The definition test checks each operation against the
  spec; the README gates caught finding 2 and finding 6. The offline mock made the example in
  `examples/` testable in a few minutes.
- **`publisher`, `repo.path` and the package name** all landed in LICENSE and package.json as
  configured. `doctor` found both orphan files, though its summary line hides them (K3).
- **Speed.** A full generate takes 20–30 s. The generated package has no runtime dependencies.

## Verification

| Check | Command | Result |
|---|---|---|
| Offline suite | `cd ts && npm test` | 372 tests, 344 pass, 0 fail, 28 skipped |
| Skip reasons | same suite with `--test-reporter=tap` | 20 × `validate` feature, 3 × `retry`, 2 × `timeout`, 1 each `cost`, `netsim`, `ratelimit`: all opt-in features not generated |
| Drift | `npx voxgig-sdkgen doctor` | `.sdk matches the scaffold (0 additive)` |
| Determinism | `npm run generate` twice | No generated file changed; `.sdk/log/generated.jsonl` gained one record of the removed publish workflow |
| Example tests | `cd examples && npm test` | 2 tests, 2 pass |
| Example types | `cd examples && npm run typecheck` (strict) | 0 errors |
| Request shape | fake `fetch` probes | Correct method, URL and Bearer header on 10 calls; bodies as described in finding 3 |
| Fresh clone | clone from GitHub into an empty folder, then all of the above | Same results |
| CI on Linux | `ci.yml` on a self-hosted runner ([run](https://github.com/omarmohelal/turso-platform-sdk/actions/runs/38571446509)) | All 7 steps passed (install, offline suite, example type-check, example tests) |
| Live, read-only | `cd examples && npm run summary`, plus a GET-only sweep | See below |

### Live check (read-only)

Run on 2026-10-14 with an organization-scoped Platform API token on a new free account. Every
request was a GET; nothing was created, changed or deleted.

| Operation | Result |
|---|---|
| `Organization().list()`, `Organization().load({ id })` | OK; 1 organization |
| `User().load()`, `Validate().load()` | OK |
| `Database().list()`, `Group().list()` (via the example) | OK; 0 and 0, as expected on a new account |
| `Member().list()` | OK; SDK 1 record, raw response 1 |
| `OrganizationPlan().list()` | OK; SDK 4 records, raw response 4 |
| `ApiToken().list({ organization_slug })` | OK; SDK 1 record, raw response 1 |
| `Invite().list()`, `OrganizationInvoice().list()` | OK; 0 and 0 (raw 0 and 0) |
| `OrganizationSubscription().load()`, `OrganizationUsage().load()` | OK |
| `Location().load()` | OK; 10 locations |
| `AuditLog().list()` | **403 Forbidden** from the API; likely a plan or token-scope limit, not investigated |

The raw comparisons used `client.direct()` on the same paths. Where records exist, the SDK's
envelope unwrapping matches the raw response. The empty database and group lists cannot tell a
correct envelope from a wrong one (the apidef#119 failure mode). The 403 came back as a clear
error (`list: request: 403: Forbidden`).

## Not tested

- Any write against the live API, including the generated live suite (`TURSO_PLATFORM_TEST_LIVE`),
  which creates, updates and deletes resources. Findings 3 and 6 are therefore checked with a fake
  `fetch` and the type checker, not against Turso.
- Live list responses with records for databases and groups (the account has none).
- Python, Go and the other targets (not generated). CLI and MCP surfaces (not generated).
- GitHub-hosted runners: the workflow has not run on them, because a billing restriction on my GitHub
  account blocks hosted jobs. It ran on a self-hosted Linux runner instead. macOS was not tested.

## Human time and how I worked

I worked with an AI coding agent (Claude Code), following the steps in voxgig.com/sdk/agents.

What I did: explained the task and its constraints, compared candidate APIs and approaches with the
agent and chose Turso, reviewed the spec and cut its scope down to this time box, set the safety
rules (read-only live checks, nothing published without my approval), created the Turso account and
Platform API token with the Turso CLI in WSL, and reviewed the results.

What the agent did: the research, running the generator, the workarounds and corrections, the
example and its tests, and the first drafts of the README and this report. A second agent
fact-checked the README and this report against the repository and the logs.

| | Minutes |
|---|---|
| My active time, all of the above (my estimate) | about 20 |
| Agent runtime, unattended | research: two agents in parallel, 12.5 and 22.5 min; build, tests, report, review and live check: about 90 min (13:27–15:00) |

That is inside the 30-minute limit. Elapsed time from the brief to this report was about three hours, most of it the agent working while I was away.
