import { TursoPlatformEntityBase } from '../TursoPlatformEntityBase';
import type { TursoPlatformSDK } from '../TursoPlatformSDK';
import type { Control } from '../types';
import type { AuditLog, AuditLogListMatch } from '../TursoPlatformTypes';
declare class AuditLogEntity extends TursoPlatformEntityBase<AuditLog> {
    constructor(client: TursoPlatformSDK, entopts: any);
    make(this: AuditLogEntity): AuditLogEntity;
    list(this: any, reqmatch?: AuditLogListMatch, ctrl?: Control): Promise<AuditLogEntity[]>;
}
export { AuditLogEntity };
