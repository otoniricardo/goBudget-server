import ICreateSupplierDTO from '@modules/suppliers/dtos/ICreateSupplierDTO';
import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';

export default interface IUsersRepository {
  create(data: ICreateSupplierDTO): Promise<Supplier>;
  findByName(supplier_name: string): Promise<Supplier | undefined>;
  findAll(): Promise<Supplier[]>;
  findById(id: string): Promise<Supplier | undefined>;
}
