import { TursoPlatformEntityBase } from '../TursoPlatformEntityBase';
import type { TursoPlatformSDK } from '../TursoPlatformSDK';
import type { Control } from '../types';
import type { DeletedGroup, DeletedGroupListMatch } from '../TursoPlatformTypes';
declare class DeletedGroupEntity extends TursoPlatformEntityBase<DeletedGroup> {
    constructor(client: TursoPlatformSDK, entopts: any);
    make(this: DeletedGroupEntity): DeletedGroupEntity;
    list(this: any, reqmatch?: DeletedGroupListMatch, ctrl?: Control): Promise<DeletedGroupEntity[]>;
}
export { DeletedGroupEntity };
