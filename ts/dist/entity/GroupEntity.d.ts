import { TursoPlatformEntityBase } from '../TursoPlatformEntityBase';
import type { TursoPlatformSDK } from '../TursoPlatformSDK';
import type { Control } from '../types';
import type { Group, GroupLoadMatch, GroupListMatch, GroupCreateData, GroupRemoveMatch } from '../TursoPlatformTypes';
declare class GroupEntity extends TursoPlatformEntityBase<Group> {
    constructor(client: TursoPlatformSDK, entopts: any);
    make(this: GroupEntity): GroupEntity;
    load(this: any, reqmatch?: GroupLoadMatch, ctrl?: Control): Promise<GroupEntity>;
    list(this: any, reqmatch?: GroupListMatch, ctrl?: Control): Promise<GroupEntity[]>;
    create(this: any, reqdata?: GroupCreateData, ctrl?: Control): Promise<GroupEntity>;
    remove(this: any, reqmatch?: GroupRemoveMatch, ctrl?: Control): Promise<GroupEntity>;
}
export { GroupEntity };
