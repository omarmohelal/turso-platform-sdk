import { TursoPlatformEntityBase } from '../TursoPlatformEntityBase';
import type { TursoPlatformSDK } from '../TursoPlatformSDK';
import type { Control } from '../types';
import type { Organization, OrganizationLoadMatch, OrganizationListMatch, OrganizationCreateData, OrganizationUpdateData } from '../TursoPlatformTypes';
declare class OrganizationEntity extends TursoPlatformEntityBase<Organization> {
    constructor(client: TursoPlatformSDK, entopts: any);
    make(this: OrganizationEntity): OrganizationEntity;
    load(this: any, reqmatch?: OrganizationLoadMatch, ctrl?: Control): Promise<OrganizationEntity>;
    list(this: any, reqmatch?: OrganizationListMatch, ctrl?: Control): Promise<OrganizationEntity[]>;
    create(this: any, reqdata?: OrganizationCreateData, ctrl?: Control): Promise<OrganizationEntity>;
    update(this: any, reqdata?: OrganizationUpdateData, ctrl?: Control): Promise<OrganizationEntity>;
}
export { OrganizationEntity };
