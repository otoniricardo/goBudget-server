import { inject, injectable } from 'tsyringe';
import ICsvParserProvider from '@shared/container/providers/CsvParserProvider/models/ICsvParserProvider';

import IProductRepository from '@modules/products/repositories/IProductRepository';

import IAddProductsToSupplierDTO from '@modules/suppliers/dtos/IAddProductsToSupplierDTO';

@injectable()
class AddProductsToSupplierService {
  constructor(
    @inject('CsvParseProvider')
    private csvParseProvider: ICsvParserProvider,

    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute({
    file,
    supplier_id,
  }: IAddProductsToSupplierDTO): Promise<void> {
    const { mimetype } = file;

    if (mimetype !== 'text/csv') throw new Error('Formato inválido');

    const stream = file.createReadStream();

    const lineKeys = ['codigo'];
    const notEmptyKeys = ['codigo'];

    const parsedData = await this.csvParseProvider.parse({
      stream,
      keys: lineKeys,
    });

    parsedData.forEach((line, index) => {
      const hasEmptyValue = notEmptyKeys.find(
        key => line[key] === '' || !line[key],
      );
      if (hasEmptyValue)
        throw new Error(`Arquivo inválido!! Campo vazio na linha ${index + 1}`);
    });

    const [header, ...codes] = parsedData;

    lineKeys.forEach(key => {
      if (header[key] !== key)
        throw new Error(
          `Arquivo Inválido!! A Coluna "${header[key]}" deve ser a coluna "${key}"`,
        );
    });

    const serializedCodes: number[] = codes.map(code => Number(code.codigo));

    await this.productRepository.addProductsToSupplier(
      supplier_id,
      serializedCodes,
    );
  }
}
export default AddProductsToSupplierService;
