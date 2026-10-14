import { TursoPlatformEntityBase } from '../TursoPlatformEntityBase';
import type { TursoPlatformSDK } from '../TursoPlatformSDK';
import type { Control } from '../types';
import type { DatabaseConfiguration, DatabaseConfigurationListMatch, DatabaseConfigurationUpdateData } from '../TursoPlatformTypes';
declare class DatabaseConfigurationEntity extends TursoPlatformEntityBase<DatabaseConfiguration> {
    constructor(client: TursoPlatformSDK, entopts: any);
    make(this: DatabaseConfigurationEntity): DatabaseConfigurationEntity;
    list(this: any, reqmatch?: DatabaseConfigurationListMatch, ctrl?: Control): Promise<DatabaseConfigurationEntity[]>;
    update(this: any, reqdata?: DatabaseConfigurationUpdateData, ctrl?: Control): Promise<DatabaseConfigurationEntity>;
}
export { DatabaseConfigurationEntity };
