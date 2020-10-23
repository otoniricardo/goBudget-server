import { getRepository, Repository } from 'typeorm';

import Sale from '@modules/sales/infra/typeorm/entities/Sale';
import ISaleRepository from '@modules/sales/repositories/ISalesRepository';
import ICreateSalesDTO from '@modules/sales/dtos/ICreateSalesDTO';

class SaleRepository implements ISaleRepository {
  private ormRepository: Repository<Sale>;

  constructor() {
    this.ormRepository = getRepository(Sale);
  }

  public async bulkCreate(sales: ICreateSalesDTO[]): Promise<Sale[]> {
    const createdSales = this.ormRepository.create(sales);

    await this.ormRepository.save(sales);

    return createdSales;
  }

  public async findAllByDate(sold_in: Date): Promise<Sale[]> {
    return this.ormRepository.find({
      where: { sold_in },
    });
  }

  public async remove(salesToRemove: Sale[]): Promise<void> {
    await this.ormRepository.remove(salesToRemove);
  }
}
export default SaleRepository;
