import { inject, injectable } from 'tsyringe';
import ICsvParserProvider from '@shared/container/providers/CsvParserProvider/models/ICsvParserProvider';

import IProductRepository from '@modules/products/repositories/IProductRepository';

import { FileUpload } from 'graphql-upload';
import Product from '../infra/typeorm/entities/Product';

type parsedProducts = Omit<
  Product,
  'id' | 'supplier_id' | 'created_at' | 'updated_at'
>;

@injectable()
class UpdateProductsService {
  constructor(
    @inject('CsvParseProvider')
    private csvParseProvider: ICsvParserProvider,

    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute(file: FileUpload): Promise<void> {
    const { mimetype } = file;

    if (mimetype !== 'text/csv') throw new Error('Formato inválido');

    const stream = file.createReadStream();

    const lineKeys = ['codigo', 'referencia', 'nome', 'valor', 'estoque'];
    const notEmptyKeys = ['codigo', 'nome', 'valor', 'estoque'];

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

    const [header, ...parsedProducts] = parsedData;

    lineKeys.forEach(key => {
      if (header[key] !== key)
        throw new Error(
          `Arquivo Inválido!! A Coluna "${header[key]}" deve ser a coluna "${key}"`,
        );
    });

    const serializedParsedProducts: parsedProducts[] = parsedProducts.map(
      product => {
        const price = Number(
          product.valor.replace(/[^\d,-]/g, '').replace(',', '.'),
        );
        const stock = Number(product.estoque.split(',')[0]);
        return {
          code: Number(product.codigo),
          name: product.nome,
          price,
          reference: product.referencia,
          stock,
        };
      },
    );

    const alreadyCreatedProducts = await this.productRepository.findAll();

    const updatedProducts = alreadyCreatedProducts.map(product => {
      const newDataProduct = serializedParsedProducts.find(
        p => p.code === product.code,
      );
      return {
        ...product,
        ...newDataProduct,
      };
    });

    await this.productRepository.bulkSave(updatedProducts);

    const newProducts = serializedParsedProducts.filter(
      serialized =>
        !alreadyCreatedProducts.find(
          created => created.code === serialized.code,
        ),
    );

    await this.productRepository.bulkCreate(newProducts);
  }
}
export default UpdateProductsService;
