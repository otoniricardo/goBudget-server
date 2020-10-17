import { container } from 'tsyringe';

import ICsvParserProvider from '@shared/container/providers/CsvParserProvider/models/ICsvParserProvider';
import CsvParseProvider from '@shared/container/providers/CsvParserProvider/implementations/CsvParse';

const providers = {
  csvParse: CsvParseProvider,
};

container.registerSingleton<ICsvParserProvider>(
  'CsvParseProvider',
  providers.csvParse,
);
