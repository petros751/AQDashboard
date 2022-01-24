/* eslint-disable @typescript-eslint/naming-convention */
import { stringify } from 'querystring';

export class Admin {
  public password: string;
  public language_code: string;
  public permissions: any;
  public stores: any;
  public superadmin_id: string;
  public type: string;
  public selectedStores: any;
  // tslint:disable-next-line: max-line-length
  constructor(
    password: string,
    language_code: string,
    permissions: any,
    stores: any,
    superadmin_id: string,
    type: string,
    selectedStores: any
  ) {
    this.password = password;
    this.language_code = language_code;
    this.permissions = permissions;
    this.stores = stores;
    this.superadmin_id = superadmin_id;
    this.type = type;
    this.selectedStores = selectedStores;
  }
}
