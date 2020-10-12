import { getRepository, Repository } from 'typeorm';

import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';

import ISuppliersRepository from '@modules/suppliers/repositories/ISuppliersRepository';
import ICreateSupplierDTO from '@modules/suppliers/dtos/ICreateSupplierDTO';

class SuppliersRepository implements ISuppliersRepository {
  private ormRepository: Repository<Supplier>;

  constructor() {
    this.ormRepository = getRepository(Supplier);
  }

  public async findById(id: string): Promise<Supplier | undefined> {
    return this.ormRepository.findOne(id);
  }

  public async findAll(): Promise<Supplier[]> {
    return this.ormRepository.find();
  }

  public async create({
    contact_email,
    contact_name,
    contact_phone,
    supplier_name,
  }: ICreateSupplierDTO): Promise<Supplier> {
    const supplier = this.ormRepository.create({
      contact_email,
      contact_name,
      contact_phone,
      supplier_name,
    });

    await this.ormRepository.save(supplier);

    return supplier;
  }

  public async findByName(
    supplier_name: string,
  ): Promise<Supplier | undefined> {
    const nameExists = await this.ormRepository.findOne({
      where: { supplier_name },
    });

    return nameExists;
  }
}
export default SuppliersRepository;
