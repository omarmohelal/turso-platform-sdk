import { TursoPlatformEntityBase } from '../TursoPlatformEntityBase';
import type { TursoPlatformSDK } from '../TursoPlatformSDK';
import type { Control } from '../types';
import type { Invite, InviteListMatch, InviteRemoveMatch } from '../TursoPlatformTypes';
declare class InviteEntity extends TursoPlatformEntityBase<Invite> {
    constructor(client: TursoPlatformSDK, entopts: any);
    make(this: InviteEntity): InviteEntity;
    list(this: any, reqmatch?: InviteListMatch, ctrl?: Control): Promise<InviteEntity[]>;
    remove(this: any, reqmatch?: InviteRemoveMatch, ctrl?: Control): Promise<InviteEntity>;
}
export { InviteEntity };
