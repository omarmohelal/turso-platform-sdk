import { TursoPlatformEntityBase } from '../TursoPlatformEntityBase';
import type { TursoPlatformSDK } from '../TursoPlatformSDK';
import type { Control } from '../types';
import type { OrganizationInvoice, OrganizationInvoiceListMatch } from '../TursoPlatformTypes';
declare class OrganizationInvoiceEntity extends TursoPlatformEntityBase<OrganizationInvoice> {
    constructor(client: TursoPlatformSDK, entopts: any);
    make(this: OrganizationInvoiceEntity): OrganizationInvoiceEntity;
    list(this: any, reqmatch?: OrganizationInvoiceListMatch, ctrl?: Control): Promise<OrganizationInvoiceEntity[]>;
}
export { OrganizationInvoiceEntity };
