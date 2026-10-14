// Read-only overview of a Turso organization: who the token belongs to,
// which databases exist (with their group and regions), and which groups exist.
//
//   node --env-file=ts/.env.local examples/org-summary.ts
//
// Needs TURSO_PLATFORM_APIKEY and TURSO_PLATFORM_ORG. Sends three GET requests
// and changes nothing in the organization.

import { TursoPlatformSDK } from '../ts/dist/TursoPlatformSDK.js'

type Summary = {
  organization: string
  user: string
  databases: { name: string, group: string, primaryRegion: string, regions: string[] }[]
  groups: { name: string, primary: string, locations: string[] }[]
}

export async function summarizeOrganization(client: TursoPlatformSDK, org: string): Promise<Summary> {
  const [user, databases, groups] = await Promise.all([
    client.User().load(),
    client.Database().list({ organization_slug: org }),
    client.Group().list({ organization_slug: org }),
  ])

  const byName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name)

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
    console.error('Set TURSO_PLATFORM_APIKEY and TURSO_PLATFORM_ORG (see README, "Run the live check").')
    process.exit(1)
  }

  const summary = await summarizeOrganization(new TursoPlatformSDK({ apikey }), org)
  console.log(JSON.stringify(summary, null, 2))
}
