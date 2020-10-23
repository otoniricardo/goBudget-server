import Sale from '@modules/sales/infra/typeorm/entities/Sale';
import ICreateSalesDTO from '../dtos/ICreateSalesDTO';

export default interface ISalesRepository {
  findAllByDate(sold_id: Date): Promise<Sale[]>;
  remove(salesToRemove: Sale[]): Promise<void>;
  bulkCreate(sales: ICreateSalesDTO[]): Promise<Sale[]>;
}
