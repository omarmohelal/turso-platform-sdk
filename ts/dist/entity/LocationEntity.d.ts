import { TursoPlatformEntityBase } from '../TursoPlatformEntityBase';
import type { TursoPlatformSDK } from '../TursoPlatformSDK';
import type { Control } from '../types';
import type { Location, LocationLoadMatch, LocationCreateData, LocationRemoveMatch } from '../TursoPlatformTypes';
declare class LocationEntity extends TursoPlatformEntityBase<Location> {
    constructor(client: TursoPlatformSDK, entopts: any);
    make(this: LocationEntity): LocationEntity;
    load(this: any, reqmatch?: LocationLoadMatch, ctrl?: Control): Promise<LocationEntity>;
    create(this: any, reqdata?: LocationCreateData, ctrl?: Control): Promise<LocationEntity>;
    remove(this: any, reqmatch?: LocationRemoveMatch, ctrl?: Control): Promise<LocationEntity>;
}
export { LocationEntity };
