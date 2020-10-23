import { inject, injectable } from 'tsyringe';
import ICsvParserProvider from '@shared/container/providers/CsvParserProvider/models/ICsvParserProvider';

import Sale from '@modules/sales/infra/typeorm/entities/Sale';

import IProductRepository from '@modules/products/repositories/IProductRepository';

import ISaleRepository from '@modules/sales/repositories/ISalesRepository';
import ICreateSalesServiceDTO from '../dtos/ICreateSalesServiceDTO';
import ICreateSalesDTO from '../dtos/ICreateSalesDTO';

@injectable()
class CreateOrUpdateSalesService {
  constructor(
    @inject('CsvParseProvider')
    private csvParseProvider: ICsvParserProvider,

    @inject('SaleRepository')
    private saleRepository: ISaleRepository,

    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  async execute({ file, sold_in }: ICreateSalesServiceDTO): Promise<Sale[]> {
    const { mimetype } = file;

    if (mimetype !== 'text/csv') throw new Error('Formato inválido');

    const stream = file.createReadStream();

    const lineKeys = ['codigo', 'vendas'];
    const notEmptyKeys = ['codigo', 'vendas'];

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

    const [header, ...parsedSales] = parsedData;

    lineKeys.forEach(key => {
      if (header[key] !== key)
        throw new Error(
          `Arquivo Inválido!! A Coluna "${header[key]}" deve ser a coluna "${key}"`,
        );
    });

    const [month, year] = sold_in.split('/');
    const sold_in_date = new Date(Number(year), Number(month) - 1, 1);

    const serializedParsedSales: ICreateSalesDTO[] = parsedSales.map(sale => {
      const quantity = Number(sale.vendas.replace('.', '').split(',')[0]);
      return {
        product_code: Number(sale.codigo),
        quantity,
        sold_in: sold_in_date,
      };
    });

    const codes = serializedParsedSales.map(sale => sale.product_code);

    const products = await this.productRepository.findByCodes(codes);

    codes.forEach(code => {
      const productExists = products.find(p => p.code === code);
      if (!productExists)
        throw new Error(
          `Produto de código ${code} não encontrado, Atualize o estoque e tente novamente`,
        );
    });

    const alreadyCreatedSales = await this.saleRepository.findAllByDate(
      sold_in_date,
    );
    await this.saleRepository.remove(alreadyCreatedSales);

    const sales = await this.saleRepository.bulkCreate(serializedParsedSales);

    return sales;
  }
}
export default CreateOrUpdateSalesService;
