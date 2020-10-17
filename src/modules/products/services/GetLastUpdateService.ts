import { inject, injectable } from 'tsyringe';

import IProductRepository from '@modules/products/repositories/IProductRepository';

@injectable()
class GetLatestUpdateService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute(): Promise<Date | undefined> {
    const lastUpdate = await this.productRepository.findLatest();

    return lastUpdate && lastUpdate.updated_at;
  }
}
export default GetLatestUpdateService;
