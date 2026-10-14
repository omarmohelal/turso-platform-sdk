import { TursoPlatformEntityBase } from '../TursoPlatformEntityBase';
import type { TursoPlatformSDK } from '../TursoPlatformSDK';
import type { Control } from '../types';
import type { Database, DatabaseLoadMatch, DatabaseListMatch, DatabaseCreateData, DatabaseRemoveMatch } from '../TursoPlatformTypes';
declare class DatabaseEntity extends TursoPlatformEntityBase<Database> {
    constructor(client: TursoPlatformSDK, entopts: any);
    make(this: DatabaseEntity): DatabaseEntity;
    load(this: any, reqmatch?: DatabaseLoadMatch, ctrl?: Control): Promise<DatabaseEntity>;
    list(this: any, reqmatch?: DatabaseListMatch, ctrl?: Control): Promise<DatabaseEntity[]>;
    create(this: any, reqdata?: DatabaseCreateData, ctrl?: Control): Promise<DatabaseEntity>;
    remove(this: any, reqmatch?: DatabaseRemoveMatch, ctrl?: Control): Promise<DatabaseEntity>;
}
export { DatabaseEntity };
