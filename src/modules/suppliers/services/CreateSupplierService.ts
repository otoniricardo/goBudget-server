import { inject, injectable } from 'tsyringe';

import ICreateSupplierDTO from '@modules/suppliers/dtos/ICreateSupplierDTO';
import ISuppliersRepository from '@modules/suppliers/repositories/ISuppliersRepository';
import Supplier from '../infra/typeorm/entities/Supplier';

export interface ICreateSupplierResponse {
  supplier?: Supplier;
  error?: {
    field: string;
    message: string;
  };
}

@injectable()
class CreateSupplierService {
  constructor(
    @inject('SupplierRepository')
    private suppliersRepository: ISuppliersRepository,
  ) {}

  async execute({
    contact_email,
    contact_name,
    contact_phone,
    supplier_name,
  }: ICreateSupplierDTO): Promise<ICreateSupplierResponse> {
    const nameExists = await this.suppliersRepository.findByName(supplier_name);

    if (nameExists)
      return {
        error: {
          field: 'supplier_name',
          message: 'Já existe um fornecedor com este nome.',
        },
      };

    const supplier = await this.suppliersRepository.create({
      contact_email,
      supplier_name,
      contact_phone,
      contact_name,
    });

    return { supplier };
  }
}
export default CreateSupplierService;
