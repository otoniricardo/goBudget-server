import Product from '@modules/products/infra/typeorm/entities/Product';
import ICreateProducts from '../dtos/ICreateProducts';

export default interface IUsersRepository {
  findAll(): Promise<Product[]>;
  findLatest(): Promise<Product | undefined>;
  bulkCreate(products: ICreateProducts[]): Promise<Product[]>;
  bulkSave(products: ICreateProducts[]): Promise<Product[]>;
  addProductsToSupplier(
    supplier_id: string,
    products_codes: number[],
  ): Promise<void>;
  findBySupplierId(supplier_id: string): Promise<Product[]>;
  findByCodes(codes: number[]): Promise<Product[]>;
}
