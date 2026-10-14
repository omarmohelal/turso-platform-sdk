import { TursoPlatformEntityBase } from '../TursoPlatformEntityBase';
import type { TursoPlatformSDK } from '../TursoPlatformSDK';
import type { Control } from '../types';
import type { ApiToken, ApiTokenListMatch, ApiTokenCreateData, ApiTokenRemoveMatch } from '../TursoPlatformTypes';
declare class ApiTokenEntity extends TursoPlatformEntityBase<ApiToken> {
    constructor(client: TursoPlatformSDK, entopts: any);
    make(this: ApiTokenEntity): ApiTokenEntity;
    list(this: any, reqmatch?: ApiTokenListMatch, ctrl?: Control): Promise<ApiTokenEntity[]>;
    create(this: any, reqdata?: ApiTokenCreateData, ctrl?: Control): Promise<ApiTokenEntity>;
    remove(this: any, reqmatch?: ApiTokenRemoveMatch, ctrl?: Control): Promise<ApiTokenEntity>;
}
export { ApiTokenEntity };
