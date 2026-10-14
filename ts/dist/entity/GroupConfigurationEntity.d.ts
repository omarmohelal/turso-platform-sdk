import { TursoPlatformEntityBase } from '../TursoPlatformEntityBase';
import type { TursoPlatformSDK } from '../TursoPlatformSDK';
import type { Control } from '../types';
import type { GroupConfiguration, GroupConfigurationLoadMatch, GroupConfigurationUpdateData } from '../TursoPlatformTypes';
declare class GroupConfigurationEntity extends TursoPlatformEntityBase<GroupConfiguration> {
    constructor(client: TursoPlatformSDK, entopts: any);
    make(this: GroupConfigurationEntity): GroupConfigurationEntity;
    load(this: any, reqmatch?: GroupConfigurationLoadMatch, ctrl?: Control): Promise<GroupConfigurationEntity>;
    update(this: any, reqdata?: GroupConfigurationUpdateData, ctrl?: Control): Promise<GroupConfigurationEntity>;
}
export { GroupConfigurationEntity };
