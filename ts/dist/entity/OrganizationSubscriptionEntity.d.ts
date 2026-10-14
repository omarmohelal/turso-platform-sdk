import { TursoPlatformEntityBase } from '../TursoPlatformEntityBase';
import type { TursoPlatformSDK } from '../TursoPlatformSDK';
import type { Control } from '../types';
import type { OrganizationSubscription, OrganizationSubscriptionLoadMatch } from '../TursoPlatformTypes';
declare class OrganizationSubscriptionEntity extends TursoPlatformEntityBase<OrganizationSubscription> {
    constructor(client: TursoPlatformSDK, entopts: any);
    make(this: OrganizationSubscriptionEntity): OrganizationSubscriptionEntity;
    load(this: any, reqmatch?: OrganizationSubscriptionLoadMatch, ctrl?: Control): Promise<OrganizationSubscriptionEntity>;
}
export { OrganizationSubscriptionEntity };
