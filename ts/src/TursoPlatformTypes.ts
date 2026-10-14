// Typed models for the TursoPlatform SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface ApiToken {
  created_at?: string
  group?: string
  id?: string
  name?: string
  organization?: string
  owner?: Record<string, any>
  scopes?: any[]
  token?: string
}

export interface ApiTokenListMatch {
  created_at?: string
  group?: string
  id?: string
  name?: string
  organization?: string
  owner?: Record<string, any>
  scopes?: any[]
  token?: string
}

export interface ApiTokenCreateData {
  id: string
  created_at?: string
  group?: string
  name?: string
  organization?: string
  owner?: Record<string, any>
  scopes?: any[]
  token?: string
}

export interface ApiTokenRemoveMatch {
  id: string
  organization_slug?: string
}

export interface AuditLog {
  author?: string
  code?: string
  created_at?: string
  data?: Record<string, any>
  message?: string
  origin?: string
}

export interface AuditLogListMatch {
  organization_slug: string
  page?: number
  page_size?: number
}

export interface Database {
  DbId?: string
  Hostname?: string
  Name?: string
  block_reads?: boolean
  block_writes?: boolean
  delete_protection?: boolean
  deleted_at?: string
  group?: string
  group_deleted_at?: string
  group_id?: string
  id?: string
  name: string
  organization_id?: string
  parent?: Record<string, any>
  primaryRegion?: string
  regions?: any[]
  remote_encryption?: Record<string, any>
  seed?: Record<string, any>
  size_limit?: string
}

export interface DatabaseLoadMatch {
  id: string
  organization_slug: string
}

export interface DatabaseListMatch {
  organization_id: string
  cursor?: string
  deleted: boolean
  limit?: number
  search?: string
}

export interface DatabaseCreateData {
  organization_slug: string
  DbId?: string
  Hostname?: string
  Name?: string
  block_reads?: boolean
  block_writes?: boolean
  delete_protection?: boolean
  deleted_at?: string
  group?: string
  group_deleted_at?: string
  group_id?: string
  id?: string
  name: string
  organization_id?: string
  parent?: Record<string, any>
  primaryRegion?: string
  regions?: any[]
  remote_encryption?: Record<string, any>
  seed?: Record<string, any>
  size_limit?: string

  // Selects a custom action instead of the plain create:
  //   'restore'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface DatabaseRemoveMatch {
  id: string
  organization_slug: string
}

export interface DatabaseConfiguration {
  allow_attach?: boolean
  allowed_aws_vpc_ids?: any[]
  allowed_ips?: any[]
  block_reads?: boolean
  block_writes?: boolean
  delete_protection?: boolean
  size_limit?: string
}

export interface DatabaseConfigurationListMatch {
  database_name: string
  organization_id: string
}

export interface DatabaseConfigurationUpdateData {
  database_name: string
  organization_id: string
  allow_attach?: boolean
  allowed_aws_vpc_ids?: any[]
  allowed_ips?: any[]
  block_reads?: boolean
  block_writes?: boolean
  delete_protection?: boolean
  size_limit?: string
}

export interface DatabaseStat {
  query?: string
  rows_read?: number
  rows_written?: number
}

export interface DatabaseStatListMatch {
  database_name: string
  organization_id: string
}

export interface DatabaseUsage {
  instances?: any[]
  total?: Record<string, any>
  uuid?: string
}

export interface DatabaseUsageLoadMatch {
  database_name: string
  organization_id: string
  from?: string
  to?: string
}

export interface DeletedGroup {
  cascade_databases?: number
  deleted_at?: string
  name?: string
  uuid?: string
}

export interface DeletedGroupListMatch {
  organization_id: string
  cursor?: string
  limit?: number
}

export interface Group {
  delete_protection?: boolean
  extensions?: any
  id?: string
  location: string
  locations?: any[]
  name?: string
  primary?: string
  uuid?: string
  version?: string
}

export interface GroupLoadMatch {
  id: string
  organization_slug: string
}

export interface GroupListMatch {
  organization_slug: string
}

export interface GroupCreateData {
  organization_slug: string
  delete_protection?: boolean
  extensions?: any
  id?: string
  location: string
  locations?: any[]
  name?: string
  primary?: string
  uuid?: string
  version?: string

  // Selects a custom action instead of the plain create:
  //   'restore' | 'transfer' | 'unarchive' | 'update'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface GroupRemoveMatch {
  id: string
  organization_slug: string
}

export interface GroupConfiguration {
  delete_protection?: boolean
}

export interface GroupConfigurationLoadMatch {
  group_name: string
  organization_id: string
}

export interface GroupConfigurationUpdateData {
  group_name: string
  organization_id: string
  delete_protection?: boolean
}

export interface Instance {
  hostname?: string
  id?: string
  name?: string
  region?: string
  type?: string
  uuid?: string
}

export interface InstanceLoadMatch {
  database_name: string
  id: string
  organization_id: string
}

export interface InstanceListMatch {
  database_name: string
  organization_id: string
}

export interface Invite {
  created_at?: string
  email?: string
  id?: number
  role?: string
}

export interface InviteListMatch {
  organization_slug: string
}

export interface InviteRemoveMatch {
  id: string
  organization_slug: string
}

export interface Location {
  awsapnortheast1?: string
  awsapsouth1?: string
  awseuwest1?: string
  awsuseast1?: string
  awsuseast2?: string
  awsuswest2?: string
  delete_protection?: boolean
  id?: string
  locations?: any[]
  name?: string
  primary?: string
  uuid?: string
  version?: string
}

export interface LocationLoadMatch {
  awsapnortheast1?: string
  awsapsouth1?: string
  awseuwest1?: string
  awsuseast1?: string
  awsuseast2?: string
  awsuswest2?: string
  delete_protection?: boolean
  id: string
  locations?: any[]
  name?: string
  primary?: string
  uuid?: string
  version?: string
}

export interface LocationCreateData {
  group_name: string
  id: string
  organization_id: string
  awsapnortheast1?: string
  awsapsouth1?: string
  awseuwest1?: string
  awsuseast1?: string
  awsuseast2?: string
  awsuswest2?: string
  delete_protection?: boolean
  locations?: any[]
  name?: string
  primary?: string
  uuid?: string
  version?: string
}

export interface LocationRemoveMatch {
  group_name: string
  id: string
  organization_id: string
}

export interface Member {
  email?: string
  id?: string
  role?: string
  username?: string
}

export interface MemberLoadMatch {
  id: string
  organization_slug: string
}

export interface MemberListMatch {
  organization_slug: string
}

export interface MemberUpdateData {
  id: string
  organization_slug: string
  email?: string
  role?: string
  username?: string
}

export interface MemberRemoveMatch {
  id: string
  organization_slug: string
}

export interface Organization {
  blocked_reads?: boolean
  blocked_writes?: boolean
  id?: string
  name?: string
  overages?: boolean
  plan_id?: string
  plan_timeline?: string
  platform?: string
  require_mfa?: boolean
  restore_enabled?: boolean
  slug?: string
  type?: string
}

export interface OrganizationLoadMatch {
  id: string
}

export interface OrganizationListMatch {
  blocked_reads?: boolean
  blocked_writes?: boolean
  id?: string
  name?: string
  overages?: boolean
  plan_id?: string
  plan_timeline?: string
  platform?: string
  require_mfa?: boolean
  restore_enabled?: boolean
  slug?: string
  type?: string
}

export interface OrganizationCreateData {
  organization_slug: string
  blocked_reads?: boolean
  blocked_writes?: boolean
  id?: string
  name?: string
  overages?: boolean
  plan_id?: string
  plan_timeline?: string
  platform?: string
  require_mfa?: boolean
  restore_enabled?: boolean
  slug?: string
  type?: string

  // Selects a custom action instead of the plain create:
  //   'invite' | 'member'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface OrganizationUpdateData {
  id: string
  blocked_reads?: boolean
  blocked_writes?: boolean
  name?: string
  overages?: boolean
  plan_id?: string
  plan_timeline?: string
  platform?: string
  require_mfa?: boolean
  restore_enabled?: boolean
  slug?: string
  type?: string
}

export interface OrganizationInvoice {
  amount_due?: string
  due_date?: string
  invoice_number?: string
  invoice_pdf?: string
  paid_at?: string
  payment_failed_at?: string
}

export interface OrganizationInvoiceListMatch {
  organization_slug: string
  type?: string
}

export interface OrganizationPlan {
  name?: string
  price?: string
  prices?: any[]
  quotas?: Record<string, any>
}

export interface OrganizationPlanListMatch {
  organization_slug: string
}

export interface OrganizationSubscription {
  name?: string
  overages?: boolean
  plan?: string
  timeline?: string
}

export interface OrganizationSubscriptionLoadMatch {
  organization_slug: string
}

export interface OrganizationUsage {
  databases?: any[]
  usage?: Record<string, any>
  uuid?: string
}

export interface OrganizationUsageLoadMatch {
  organization_slug: string
}

export interface Rotate {
}

export interface RotateCreateData {
  database_name?: string
  organization_id: string
  group_name?: string
}

export interface Token {
  jwt?: string
  permissions?: Record<string, any>
}

export interface TokenCreateData {
  database_name?: string
  organization_id: string
  authorization?: string
  expiration?: string
  group_name?: string
  jwt?: string
  permissions?: Record<string, any>
}

export interface User {
  avatarUrl?: string
  email?: string
  has_pending_invites?: boolean
  mfa?: boolean
  name?: string
  plan?: string
  username?: string
}

export interface UserLoadMatch {
  avatarUrl?: string
  email?: string
  has_pending_invites?: boolean
  mfa?: boolean
  name?: string
  plan?: string
  username?: string
}

export interface Validate {
  exp?: number
}

export interface ValidateLoadMatch {
  exp?: number
}

