import { TursoPlatformEntityBase } from '../TursoPlatformEntityBase';
import type { TursoPlatformSDK } from '../TursoPlatformSDK';
import type { Control } from '../types';
import type { DatabaseStat, DatabaseStatListMatch } from '../TursoPlatformTypes';
declare class DatabaseStatEntity extends TursoPlatformEntityBase<DatabaseStat> {
    constructor(client: TursoPlatformSDK, entopts: any);
    make(this: DatabaseStatEntity): DatabaseStatEntity;
    list(this: any, reqmatch?: DatabaseStatListMatch, ctrl?: Control): Promise<DatabaseStatEntity[]>;
}
export { DatabaseStatEntity };
