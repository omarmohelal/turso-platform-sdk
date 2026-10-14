import { TursoPlatformEntityBase } from '../TursoPlatformEntityBase';
import type { TursoPlatformSDK } from '../TursoPlatformSDK';
import type { Control } from '../types';
import type { Validate, ValidateLoadMatch } from '../TursoPlatformTypes';
declare class ValidateEntity extends TursoPlatformEntityBase<Validate> {
    constructor(client: TursoPlatformSDK, entopts: any);
    make(this: ValidateEntity): ValidateEntity;
    load(this: any, reqmatch?: ValidateLoadMatch, ctrl?: Control): Promise<ValidateEntity>;
}
export { ValidateEntity };
