import Product from '@modules/products/infra/typeorm/entities/Product';
import ICreateProducts from '../dtos/ICreateProducts';

export default interface IUsersRepository {
  findAll(): Promise<Product[]>;
  findLatest(): Promise<Product | undefined>;
  bulkCreate(products: ICreateProducts[]): Promise<Product[]>;
  bulkSave(products: ICreateProducts[]): Promise<Product[]>;
}
