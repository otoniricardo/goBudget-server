import { FileUpload } from 'graphql-upload';

export default interface ICreateSalesServiceDTO {
  sold_in: string;
  file: FileUpload;
}
