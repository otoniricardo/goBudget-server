import { getRepository, Repository } from 'typeorm';

import Product from '@modules/products/infra/typeorm/entities/Product';

import IProductRepository from '@modules/products/repositories/IProductRepository';
import ICreateProducts from '@modules/products/dtos/ICreateProducts';

class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
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
}
export default ProductRepository;
