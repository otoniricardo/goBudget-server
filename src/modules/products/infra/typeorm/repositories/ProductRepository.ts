import { getRepository, In, Repository } from 'typeorm';

import Product from '@modules/products/infra/typeorm/entities/Product';

import IProductRepository from '@modules/products/repositories/IProductRepository';
import ICreateProducts from '@modules/products/dtos/ICreateProducts';

class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findByCodes(codes: number[]): Promise<Product[]> {
    return this.ormRepository.find({ where: { code: In(codes) } });
  }

  public async findBySupplierId(supplier_id: string): Promise<Product[]> {
    return this.ormRepository.find({
      where: { supplier_id },
      order: {
        name: 'ASC',
      },
    });
  }

  public async findAll(): Promise<Product[]> {
    return this.ormRepository.find();
  }

  public async bulkCreate(products: ICreateProducts[]): Promise<Product[]> {
    const createdProducts = this.ormRepository.create(products);

    await this.ormRepository.save(products);

    return createdProducts;
  }

  public async bulkSave(products: Product[]): Promise<Product[]> {
    return this.ormRepository.save(products);
  }

  public async findLatest(): Promise<Product | undefined> {
    const [latestRecord] = await this.ormRepository.find({
      order: {
        updated_at: 'DESC',
      },
      take: 1,
    });

    return latestRecord;
  }

  public async addProductsToSupplier(
    supplier_id: string,
    products_codes: number[],
  ): Promise<void> {
    const products = await this.ormRepository.find({
      where: { code: In(products_codes) },
    });

    const updatedProducts = products.map(product => ({
      ...product,
      supplier_id,
    }));

    await this.ormRepository.save(updatedProducts);
  }
}
export default ProductRepository;
