import { TursoPlatformEntityBase } from '../TursoPlatformEntityBase';
import type { TursoPlatformSDK } from '../TursoPlatformSDK';
import type { Control } from '../types';
import type { User, UserLoadMatch } from '../TursoPlatformTypes';
declare class UserEntity extends TursoPlatformEntityBase<User> {
    constructor(client: TursoPlatformSDK, entopts: any);
    make(this: UserEntity): UserEntity;
    load(this: any, reqmatch?: UserLoadMatch, ctrl?: Control): Promise<UserEntity>;
}
export { UserEntity };
