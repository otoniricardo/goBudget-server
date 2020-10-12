import {
  Resolver,
  Mutation,
  Arg,
  ObjectType,
  Field,
  UseMiddleware,
  Query,
} from 'type-graphql';
import { container } from 'tsyringe';

import CreateSupplierService from '@modules/suppliers/services/CreateSupplierService';
import GetAllSupliersService from '@modules/suppliers/services/GetAllSuppliersService';
import GetSupplierByIdService from '@modules/suppliers/services/GetSupplierByIdService';

import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';

import EnsureAuthentication from '@shared/infra/middlewares/EnsureAuthentication';

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class CreateSupplierResponse {
  @Field(() => Supplier, { nullable: true })
  supplier?: Supplier;

  @Field(() => FieldError, { nullable: true })
  error?: FieldError;
}

@Resolver()
export default class SupplierResolver {
  @Mutation(() => CreateSupplierResponse)
  @UseMiddleware(EnsureAuthentication)
  async CreateSupplier(
    @Arg('supplier_name') supplier_name: string,
    @Arg('contact_name') contact_name: string,
    @Arg('contact_email') contact_email: string,
    @Arg('contact_phone') contact_phone: string,
  ): Promise<CreateSupplierResponse> {
    const createSupplier = container.resolve(CreateSupplierService);

    const { error, supplier } = await createSupplier.execute({
      supplier_name,
      contact_phone,
      contact_name,
      contact_email,
    });

    return { error, supplier };
  }

  @Query(() => [Supplier])
  @UseMiddleware(EnsureAuthentication)
  async getAllSuppliers(): Promise<Supplier[]> {
    const getSuppliers = container.resolve(GetAllSupliersService);
    const allSuppliers = await getSuppliers.execute();
    return allSuppliers;
  }

  @Query(() => Supplier)
  @UseMiddleware(EnsureAuthentication)
  async getSupplierById(
    @Arg('supplier_id') supplier_id: string,
  ): Promise<Supplier> {
    const getSupplierById = container.resolve(GetSupplierByIdService);
    const supplier = await getSupplierById.execute(supplier_id);
    return supplier;
  }
}
