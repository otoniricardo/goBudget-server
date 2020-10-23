import { inject, injectable } from 'tsyringe';

import IProductRepository from '@modules/products/repositories/IProductRepository';
import Product from '../infra/typeorm/entities/Product';

@injectable()
class GetProductsBySupplierIdService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute(supplier_id: string): Promise<Product[]> {
    return this.productRepository.findBySupplierId(supplier_id);
  }
}
export default GetProductsBySupplierIdService;
