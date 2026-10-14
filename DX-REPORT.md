# Developer experience report: Voxgig SDK generator on the Turso Platform API

Omar Mohelal, 2026-10-14. Mini task 1.

## Summary

I generated a TypeScript SDK for the Turso Platform API (OpenAPI 3.0.1, 53 operations) with
`@voxgig/create-sdkgen` 0.30.7 / `@voxgig/sdkgen` 4.34.5 on Windows 11. The generator produced a
working SDK with a solid offline test suite. Getting there took two known Windows workarounds and
two corrections in `guide.aontu`, which the generator's own README-example test pushed me towards.

Five findings below are, as far as I can tell from the issue trackers, not yet reported. The two
with the most developer impact:

- Path parameters are sent in the JSON request body of every `create` and `update` (finding 3).
- A slug path parameter is renamed `organization_id` on nested entities, colliding with a real ID
  parameter elsewhere in the same SDK (finding 1).

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
| `typescript` (in `.sdk`) | 7.0.2 |
| Spec | https://docs.turso.tech/api-reference/openapi.json, fetched 2026-10-14 13:29 +03:00, sha256 `22bd90b9…c38d98` |

## Timeline (2026-10-14, local time)

| Time | Step | Result |
|---|---|---|
| 13:29 | `npm create @voxgig/sdkgen@latest -- turso-platform -o turso-platform-sdk -d ./_input/turso-openapi.json` | Scaffold written, then `spawn npm ENOENT` (known, K1) |
| 13:30–13:34 | `npm install` in `.sdk` by hand (231 s) | OK |
| 13:34 | `npx voxgig-sdkgen target add ts` | OK, 16 s |
| 13:35 | `npm run generate` | `source not found: api/api-info.aontu` (known, K2) |
| 13:37 | `./` added to bare includes, `npm run generate` | OK, 26 s, 22 entities |
| 13:40 | `cd ts && npm install && npm test` | 378 tests: 346 pass, **2 fail**, 30 skipped (finding 2) |
| 13:44 | Two corrections in `guide.aontu`, regenerate, test | 372 tests: 344 pass, 0 fail, 28 skipped |
| 13:46 | `npx voxgig-sdkgen doctor` | Exit 1, two orphan flow files (known, K3); clean after removing them |
| 13:47 | `npm run generate` twice more | No diff: output is deterministic |
| 13:48–14:00 | Publisher, README text, `phase: top` off, summary edition removed | Root files now hand-maintained |

## Findings

### Already reported upstream (reproduced, not re-reported)

- **K1.** `npm create @voxgig/sdkgen` stops at its own `npm install` with `spawn npm ENOENT` on
  Windows: [create-sdkgen#58](https://github.com/voxgig/create-sdkgen/issues/58). Workaround: run
  `npm install` in `.sdk` yourself. The scaffold is otherwise complete (167 files, spec copied).
- **K2.** `npm run generate` fails with `source not found: api/api-info.aontu` on Windows:
  [create-sdkgen#62](https://github.com/voxgig/create-sdkgen/issues/62). One small addition: the
  scaffolded `sdk.aontu` already mixes both styles (`@"./config.aontu"` next to
  `@"api/api-info.aontu"`), and only the bare ones fail. Prefixing the bare local includes in
  `model/sdk.aontu` and `test/test.aontu` with `./` fixed it.
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
`organization_id` too. So `client.Instance().list({ organization_id: 'my-org-slug' })` is correct,
while `client.Database().list({ organization_id, deleted: true })` selects the v3 deleted-databases
route, where `organization_id` must be Turso's internal organization ID.

**Expected.** One name for one parameter across the SDK, and a slug is not called an id.

**Impact.** Two entities sit side by side in the README with the same argument name meaning
different values. Copying an argument from one example to another fails at the API, not at
compile time.

**Suggested fix.** apidef#132 added "a name is never called an id" for parameters named `name` or
`*_name`. Extending that list to `slug` / `*_slug` would fix Turso. Other common non-id keys
(`username`, `email`, `key`, `code`) are worth considering in the same rule.

**Workaround used.** Seven `rename: param: organizationSlug: organization_slug` lines in
`guide.aontu`.

### 2. A verb behind a static segment becomes its own entity, and the README examples fail

**Repro.** Fresh generate, then `cd ts && npm test`.

**Actual.** `/databases/{databaseName}/auth/rotate` and `/groups/{groupName}/auth/rotate` become
one entity `rotate`; the two `/auth/tokens` paths become an entity `token`. Each serves two
parents and picks the route from whichever of `database_name` / `group_name` you pass. The
generated README example for `Rotate().create` passes neither, so the offline suite fails out of
the box:

```
✖ ts/README.md — every runnable example executes in test mode
  snippet 42 threw at runtime: TursoPlatformSDK: create: Operation "create" has no endpoint
  whose path parameters are all given (missing: database_name).
```

Two tests fail this way (README.md and REFERENCE.md). By contrast `/groups/{groupName}/transfer`
and `/unarchive` are correctly read as actions on `group` (the rule from apidef#48); the extra
`auth` segment seems to be what defeats it.

**Expected.** `rotate` and `token` as actions on `database` and `group`, like `transfer`. Failing
that, README examples for a multi-route operation should pass the parameters of one complete route
(sdkgen#344 did this for `list`).

**Impact.** A first-time user who runs `npm test` on a fresh SDK sees red, in a test about the
documentation. `client.Rotate()` is also hard to discover: nothing in its name says database or
group.

**Workaround used.** Switch off `rotate` and `token`, and declare the four paths as actions on
`database` and `group` in `guide.aontu` (about 30 lines). After that: 0 failures, and the calls
route correctly (`POST /v1/organizations/my-org/databases/my-db/auth/tokens`, checked with a fake
`fetch`).

Credit where due: the `readme_examples` test is what surfaced this. Without it I would not have
looked at the model so early.

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

The same happens for actions (`database_name` and `organization_slug` in the body of
`/auth/tokens`).

**Cause.** `ts/src/utility/TransformRequestUtility.ts`, `routedArgNames()`: header, cookie and query
arguments are removed from the body, path arguments are not. sdkgen#389 used the request body's
property list (`bf`, apidef 8.25.0) to decide which header/cookie/query arguments the body keeps,
but path parameters are outside that rule.

**Expected.** A path parameter stays out of the body unless the request body schema declares it
(`bf` already carries exactly that information). Turso's `createDatabase` body does not declare
`organization_slug`.

**Impact.** APIs that reject unknown body properties will fail every `create` and `update`. It also
copies identifiers into bodies that may be logged. I did not test how Turso reacts, because that
needs a write.

**Workaround.** None without editing generated code, so none applied.

### 4. Root files assume the default targets and publisher

After setting `main.kit.publisher` and generating only `ts`:

- `CHANGELOG.md` says the release covers "TypeScript, Python, PHP, Go, Ruby, and Lua, plus CLI and
  MCP surfaces". The list is fixed text in `src/cmp/Changelog.ts` (line 22).
- `SECURITY.md` says "the generated Omar Mohelal SDK packages published from this repository (npm,
  PyPI, Packagist, RubyGems, LuaRocks, and the Go module)". `src/cmp/Security.ts` (line 33) puts
  the publisher's name where the SDK's name belongs, and the registry list is fixed.
- `SUMMARY.md` (summary edition) still shows the spec's placeholder description ("API description
  here") although `main.kit.text.summary` was set; the README did use the override. It also says
  "There are 1 SDK targets".

**Impact.** Small, but these are the files a reviewer opens first, and they state things that are
not true of the repository. Same spirit as sdkgen#340 ("say only what is true").

**Suggested fix.** Build the language and registry lists from the active targets, use the SDK name
in SECURITY.md, and read `main.kit.text` in docgen's summary edition.

**Workaround used.** `main: kit: phase: top: active: false`, then fixed CHANGELOG.md and
SECURITY.md by hand and removed the summary edition with `voxgig-sdkgen edition remove summary`
(which removed the model files but left the generated `SUMMARY.md` behind).

### 5. The offline mock filters `list()` by parent for some entities only

Seeded with one database and one group whose records carry no `organization_slug`,
`Group().list({ organization_slug: 'acme' })` returns 0 records and `Database().list(…)` returns 1.
With `organization_slug: 'zzz'` on the records, the database is still returned for `'acme'`. I did
not investigate why (`database` has two `list` routes, `group` has one). In practice: when writing
tests against `TursoPlatformSDK.test()`, seed the parent parameter on every record, or some lists
come back empty.

## What worked well

- **Auth from an incomplete spec.** Turso's spec declares `bearerAuth` but no top-level `security`.
  apidef still picked the scheme, and every request carries `Authorization: Bearer …` (checked for
  six operations with a fake `fetch`).
- **The entity model is mostly right first time.** 40 paths and 53 methods became 22 entities, with
  envelopes unwrapped correctly (`body.databases`, `body.groups`, `body.user`).
- **The guide is a good correction surface.** Both fixes were declarative, lived in one file, and
  survived regeneration. Regenerating twice in a row produced no diff.
- **The test suite is genuinely useful.** The definition test checks each operation against the
  spec; the README-example test caught finding 2. The offline mock made the example in `examples/`
  testable in a few minutes.
- **`publisher`, `repo.path` and the package name** all landed in LICENSE and package.json as
  configured. `doctor` gave a clear signal.
- **Speed.** A full generate takes 20–30 s. The generated package has no runtime dependencies.

## Verification

| Check | Command | Result |
|---|---|---|
| Offline suite | `cd ts && npm test` | 372 tests, 344 pass, 0 fail, 28 skipped |
| Skip reasons | same suite with `--test-reporter=tap` | 20 × `validate` feature, 3 × `retry`, 2 × `timeout`, 1 each `cost`, `netsim`, `ratelimit`: all opt-in features not generated |
| Drift | `npx voxgig-sdkgen doctor` | `.sdk matches the scaffold (0 additive)` |
| Determinism | `npm run generate` twice | No changed files |
| Example | `cd examples && npm test` | 2 tests, 2 pass |
| Request shape | fake `fetch` probe | Correct method, URL and Bearer header for 6 operations |
| Live, read-only | `cd examples && npm run summary` | Pending: needs Omar's token |

## Not tested

- Any write against the live API, including the generated live suite (`TURSO_PLATFORM_TEST_LIVE`),
  which creates, updates and deletes resources.
- Python, Go and the other targets (not generated). CLI and MCP surfaces (not generated).
- The repository's CI (not pushed yet). Linux and macOS (Windows only).

## Human time and how I worked

An AI coding agent (Claude Code) ran the generator and drafted this report and the README,
following the steps in voxgig.com/sdk/agents. I chose the API, set the scope and the safety rules
(read-only live checks, nothing published without my approval), and reviewed the findings.

| | Minutes |
|---|---|
| My active time (reading the brief, choosing the API, decisions and reviews, Turso token) | **TBD (Omar)** |
| Agent runtime, unattended | research: two agents in parallel, 12.5 and 22.5 min; build, tests and report: about 45 min (13:27–14:12) |

The 30-minute limit: **TBD (Omar)**.
