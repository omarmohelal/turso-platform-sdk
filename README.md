# Turso Platform SDK (unofficial)

A TypeScript client for the [Turso Platform API](https://docs.turso.tech/api-reference/introduction),
the API that creates and manages Turso organizations, databases, groups, members and tokens. It was
generated with the [Voxgig SDK generator](https://github.com/voxgig/sdkgen) from Turso's own
OpenAPI spec, and this repository doubles as a report on how that generator behaved.

> Unofficial. Not affiliated with, endorsed by, or sponsored by Turso. Not published to npm.
> MIT licensed.
>
> Turso publishes an official TypeScript client for this API,
> [`@tursodatabase/api`](https://www.npmjs.com/package/@tursodatabase/api); use that in production.
> To run SQL against a database, use [`@libsql/client`](https://docs.turso.tech/sdk/ts/quickstart).

## What I found in the generator

The full write-up is in **[DX-REPORT.md](./DX-REPORT.md)**: six findings I could not find in the
Voxgig issue trackers, each with repro steps, the cause in the generator's code where I found it,
and a suggested fix. The three with the most impact on developers:

1. **Path parameters are also sent in the JSON request body**, even on endpoints that take no body
   ([finding 3](./DX-REPORT.md#3-path-parameters-are-sent-in-the-json-request-body)).
2. **`Database().list()` only type-checks for one of its two routes**, so the most common call needs
   a cast ([finding 6](./DX-REPORT.md#6-typescript-types-for-operations-with-several-routes)).
3. **A slug parameter becomes `organization_id` on nested entities**, the name the SDK also uses for
   Turso's real organization ID
   ([finding 1](./DX-REPORT.md#1-a-slug-path-parameter-is-renamed-organization_id-on-nested-entities)).

Two Windows setup problems were already reported upstream; the report links them instead of
reporting them again.

## Status

| | |
|---|---|
| SDK | TypeScript, generated with `@voxgig/sdkgen` 4.34.5 from Turso's spec 0.1.0; 20 entities, 53 operations |
| Offline tests | 372: 344 pass, 0 fail, 28 skipped (opt-in features that were not generated) |
| Live API | Read-only check on 2026-10-14: 15 operations, 14 OK; audit logs returned 403, as expected on Turso's free plan ([details](./DX-REPORT.md#verification)) |
| Not tested | Writes against the live API; Python, Go and other languages (not generated) |
| CI | [Passed](https://github.com/omarmohelal/turso-platform-sdk/actions/runs/38571446509) on a self-hosted Linux runner. GitHub-hosted runners have not run it because of a billing restriction on my account |

## Repository layout

| Path | What it is |
|---|---|
| [`DX-REPORT.md`](./DX-REPORT.md) | The developer experience report: findings, evidence, what was and was not tested |
| [`ts/`](./ts) | The generated TypeScript SDK, with its own [README](./ts/README.md) and full [REFERENCE](./ts/REFERENCE.md). Regenerated, never edited by hand |
| [`examples/`](./examples) | A read-only example written by hand, with tests against the SDK's offline mock |
| [`.sdk/`](./.sdk) | The generator project. The parts that are ours: Turso's spec in [`def/`](./.sdk/def), corrections in [`model/guide/guide.aontu`](./.sdk/model/guide/guide.aontu), settings in [`model/project.aontu`](./.sdk/model/project.aontu), and the Windows include fix in `model/sdk.aontu` and `test/test.aontu`. Everything else is scaffolded by the generator |
| [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) | Offline checks on Linux, started by hand from the Actions tab |

## Quickstart

Install from a clone (the compiled `dist/` is committed, so there is no build step). Needs
Node.js 22.13 or later.

```bash
git clone https://github.com/omarmohelal/turso-platform-sdk
npm install ./turso-platform-sdk/ts
```

Create a Platform API token with the [Turso CLI](https://docs.turso.tech/cli/introduction):

```bash
turso auth api-tokens mint my-token --org my-org
```

Then, with the token in `TURSO_PLATFORM_APIKEY`:

```ts
import { TursoPlatformSDK } from '@omarmohelal/turso-platform-sdk'

const client = new TursoPlatformSDK({ apikey: process.env.TURSO_PLATFORM_APIKEY })

const groups = await client.Group().list({ organization_slug: 'my-org' })

for (const group of groups) {
  const { name, primary, locations } = group.data()
  console.log(name, primary, locations)
}
```

Every call returns entities; `.data()` gives the plain record, and operations throw on failure.
The snippet uses top-level `await`, so run it as an ES module or inside an `async` function.

Listing databases works the same way at runtime, but the generated type for `Database().list()`
only knows the parameters of Turso's v3 deleted-databases endpoint (finding 6), so the everyday
call needs a cast for now:

```ts
const databases = await client.Database().list({ organization_slug: 'my-org' } as any)
```

## What is covered

Turso's 53 operations are grouped into 20 entities. Actions are extra operations on one database,
group or organization, called through `create` with `$action`.

<details>
<summary>All entities and operations</summary>

| Entity | Operations | Actions |
|---|---|---|
| `ApiToken()` | create, list, remove | |
| `AuditLog()` | list | |
| `Database()` | create, list, load, remove | `restore`, `rotate`, `token` |
| `DatabaseConfiguration()` | list, update | |
| `DatabaseStat()` | list | |
| `DatabaseUsage()` | load | |
| `DeletedGroup()` | list | |
| `Group()` | create, list, load, remove | `restore`, `rotate`, `token`, `transfer`, `unarchive`, `update` |
| `GroupConfiguration()` | load, update | |
| `Instance()` | list, load | |
| `Invite()` | list, remove | |
| `Location()` | create, load, remove | |
| `Member()` | list, load, remove, update | |
| `Organization()` | create, list, load, update | `invite`, `member` |
| `OrganizationInvoice()` | list | |
| `OrganizationPlan()` | list | |
| `OrganizationSubscription()` | load | |
| `OrganizationUsage()` | load | |
| `User()` | load | |
| `Validate()` | load | |

</details>

For example, minting a database token. Action payloads are typed as a plain `create` (finding 6),
hence the casts:

```ts
const result = await client.Database().create({
  $action: 'token',
  organization_slug: 'my-org',
  database_name: 'my-db',
} as any)
const { jwt } = result.data() as any
```

On entities nested under an organization, its slug is `organization_slug`; `Organization().load()`
and `update()` take it as `id`. `organization_id` appears only on the v3 endpoints, where it is
Turso's internal organization ID. Every field and parameter is listed in
[`ts/REFERENCE.md`](./ts/REFERENCE.md).

## Example: organization summary

[`examples/org-summary.ts`](./examples/org-summary.ts) prints who the token belongs to, the
organization's databases (group, regions) and its groups. It only reads, and it runs the `.ts` file
directly, so it needs Node.js 24.

Copy [`examples/.env.example`](./examples/.env.example) to `examples/.env.local` (gitignored) and fill
in your token and organization slug, or export the same two variables, then:

```bash
cd examples
npm run summary
```

Its tests use the SDK's offline mock (`TursoPlatformSDK.test()`), and `typecheck` runs strict
TypeScript over it with the compiler from `ts/` (run `npm install` in `ts/` first):

```bash
cd examples
npm test
npm run typecheck
```

## Run the tests

```bash
cd ts
npm install
npm test
```

The suite runs offline against an in-memory mock. It checks every operation against the OpenAPI
spec (`test/definition.test.ts`) and runs the code blocks in this README and in `ts/README.md` and
`ts/REFERENCE.md`. The generator can also produce a live suite (`TURSO_PLATFORM_TEST_LIVE=TRUE`);
it creates and deletes real resources, so it was not run here.

## Regenerate

Generation needs Node.js 24 or later.

```bash
cd .sdk
npm install
npm run generate
npx voxgig-sdkgen doctor
```

Change only the files listed as ours under [Repository layout](#repository-layout); everything
under `ts/` is overwritten on every run.

On Windows, generation needs `./` in front of local includes
([create-sdkgen#62](https://github.com/voxgig/create-sdkgen/issues/62)); that change is already in
`.sdk/model/sdk.aontu` and `.sdk/test/test.aontu`. Scaffolding a new project on Windows also stops at
its own `npm install` ([create-sdkgen#58](https://github.com/voxgig/create-sdkgen/issues/58)); run
`npm install` in `.sdk` yourself.

## License

MIT. See [LICENSE](./LICENSE).
