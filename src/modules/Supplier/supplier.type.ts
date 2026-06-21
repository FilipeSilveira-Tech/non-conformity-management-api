export type SupplierCreate = {
  id?: string;
  fantasy_name: string;
  cnpj: string;
  phone_number?: string | undefined;
  email?: Array<string> | undefined;
};
export type SupplierFull = SupplierCreate & {
  noConformitys: Array<object>;
};
