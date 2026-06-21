export type SupplierCreate = {
    id?: string;
    fantasy_name: string;
    cnpj: string;
    phone_number?: string;
    cellPhone_number?: string
    email?: Array<string>
}
export type SupplierFull = SupplierCreate & {
    noConformitys: Array<object>
}