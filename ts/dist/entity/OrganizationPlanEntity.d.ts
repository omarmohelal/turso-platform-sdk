import { TursoPlatformEntityBase } from '../TursoPlatformEntityBase';
import type { TursoPlatformSDK } from '../TursoPlatformSDK';
import type { Control } from '../types';
import type { OrganizationPlan, OrganizationPlanListMatch } from '../TursoPlatformTypes';
declare class OrganizationPlanEntity extends TursoPlatformEntityBase<OrganizationPlan> {
    constructor(client: TursoPlatformSDK, entopts: any);
    make(this: OrganizationPlanEntity): OrganizationPlanEntity;
    list(this: any, reqmatch?: OrganizationPlanListMatch, ctrl?: Control): Promise<OrganizationPlanEntity[]>;
}
export { OrganizationPlanEntity };
