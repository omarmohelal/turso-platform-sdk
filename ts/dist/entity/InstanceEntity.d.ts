import { TursoPlatformEntityBase } from '../TursoPlatformEntityBase';
import type { TursoPlatformSDK } from '../TursoPlatformSDK';
import type { Control } from '../types';
import type { Instance, InstanceLoadMatch, InstanceListMatch } from '../TursoPlatformTypes';
declare class InstanceEntity extends TursoPlatformEntityBase<Instance> {
    constructor(client: TursoPlatformSDK, entopts: any);
    make(this: InstanceEntity): InstanceEntity;
    load(this: any, reqmatch?: InstanceLoadMatch, ctrl?: Control): Promise<InstanceEntity>;
    list(this: any, reqmatch?: InstanceListMatch, ctrl?: Control): Promise<InstanceEntity[]>;
}
export { InstanceEntity };
