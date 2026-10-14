import { TursoPlatformEntityBase } from '../TursoPlatformEntityBase';
import type { TursoPlatformSDK } from '../TursoPlatformSDK';
import type { Control } from '../types';
import type { DatabaseUsage, DatabaseUsageLoadMatch } from '../TursoPlatformTypes';
declare class DatabaseUsageEntity extends TursoPlatformEntityBase<DatabaseUsage> {
    constructor(client: TursoPlatformSDK, entopts: any);
    make(this: DatabaseUsageEntity): DatabaseUsageEntity;
    load(this: any, reqmatch?: DatabaseUsageLoadMatch, ctrl?: Control): Promise<DatabaseUsageEntity>;
}
export { DatabaseUsageEntity };
