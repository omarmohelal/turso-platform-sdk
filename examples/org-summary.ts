// Read-only overview of a Turso organization: who the token belongs to,
// which databases exist (with their group and regions), and which groups exist.
//
//   cd examples && node --env-file=.env.local org-summary.ts
//
// Needs TURSO_PLATFORM_APIKEY and TURSO_PLATFORM_ORG. Sends three GET requests
// and changes nothing in the organization.

import { TursoPlatformSDK } from '../ts/dist/TursoPlatformSDK.js'

// Generated record types mark every field optional, so names can be undefined.
const byName = (a: { name?: string }, b: { name?: string }) =>
  (a.name ?? '').localeCompare(b.name ?? '')

export async function summarizeOrganization(client: TursoPlatformSDK, org: string) {
  const [user, databases, groups] = await Promise.all([
    client.User().load(),
    // The generated DatabaseListMatch type only has the v3 parameters (DX-REPORT finding 6).
    client.Database().list({ organization_slug: org } as any),
    client.Group().list({ organization_slug: org }),
  ])

  return {
    organization: org,
    user: user.data().username,
    databases: databases
      .map((entity) => entity.data())
      .map((db) => ({
        name: db.Name,
        group: db.group,
        primaryRegion: db.primaryRegion,
        regions: db.regions ?? [],
      }))
      .sort(byName),
    groups: groups
      .map((entity) => entity.data())
      .map((group) => ({
        name: group.name,
        primary: group.primary,
        locations: group.locations ?? [],
      }))
      .sort(byName),
  }
}

if (import.meta.main) {
  const apikey = process.env.TURSO_PLATFORM_APIKEY
  const org = process.env.TURSO_PLATFORM_ORG

  if (!apikey || !org) {
    console.error('Set TURSO_PLATFORM_APIKEY and TURSO_PLATFORM_ORG in examples/.env.local (see README, "Example: organization summary").')
    process.exit(1)
  }

  const summary = await summarizeOrganization(new TursoPlatformSDK({ apikey }), org)
  console.log(JSON.stringify(summary, null, 2))
}
