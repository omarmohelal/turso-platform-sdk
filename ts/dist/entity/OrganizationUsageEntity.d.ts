import { TursoPlatformEntityBase } from '../TursoPlatformEntityBase';
import type { TursoPlatformSDK } from '../TursoPlatformSDK';
import type { Control } from '../types';
import type { OrganizationUsage, OrganizationUsageLoadMatch } from '../TursoPlatformTypes';
declare class OrganizationUsageEntity extends TursoPlatformEntityBase<OrganizationUsage> {
    constructor(client: TursoPlatformSDK, entopts: any);
    make(this: OrganizationUsageEntity): OrganizationUsageEntity;
    load(this: any, reqmatch?: OrganizationUsageLoadMatch, ctrl?: Control): Promise<OrganizationUsageEntity>;
}
export { OrganizationUsageEntity };
