import { FileUpload } from 'graphql-upload';

export default interface IAddProductsToSupplierDTO {
  file: FileUpload;
  supplier_id: string;
}
