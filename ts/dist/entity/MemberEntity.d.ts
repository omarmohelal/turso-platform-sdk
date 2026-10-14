import { TursoPlatformEntityBase } from '../TursoPlatformEntityBase';
import type { TursoPlatformSDK } from '../TursoPlatformSDK';
import type { Control } from '../types';
import type { Member, MemberLoadMatch, MemberListMatch, MemberUpdateData, MemberRemoveMatch } from '../TursoPlatformTypes';
declare class MemberEntity extends TursoPlatformEntityBase<Member> {
    constructor(client: TursoPlatformSDK, entopts: any);
    make(this: MemberEntity): MemberEntity;
    load(this: any, reqmatch?: MemberLoadMatch, ctrl?: Control): Promise<MemberEntity>;
    list(this: any, reqmatch?: MemberListMatch, ctrl?: Control): Promise<MemberEntity[]>;
    update(this: any, reqdata?: MemberUpdateData, ctrl?: Control): Promise<MemberEntity>;
    remove(this: any, reqmatch?: MemberRemoveMatch, ctrl?: Control): Promise<MemberEntity>;
}
export { MemberEntity };
