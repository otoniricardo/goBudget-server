import csvParse from 'csv-parse';

import ICsvParserProvider from '@shared/container/providers/CsvParserProvider/models/ICsvParserProvider';

import IParseCsvResponseDTO from '@shared/container/providers/CsvParserProvider/dtos/IParseCsvResponseDTO';

import IParseCsvArgsDTO from '../dtos/IParseCsvArgsDTO';

export default class CsvParse implements ICsvParserProvider {
  public async parse({
    stream,
    keys,
  }: IParseCsvArgsDTO): Promise<IParseCsvResponseDTO[]> {
    const parsers = csvParse({
      from_line: 1,
    });

    const parseCSV = stream.pipe(parsers);

    const rows: IParseCsvResponseDTO[] = [];

    parseCSV.on('data', async line => {
      const row = line.map((cell: string) => cell.trim());

      const item = keys.reduce((acc, curr, index) => {
        acc[curr] = row[index];
        return acc;
      }, {} as any);

      rows.push(item);
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    return rows;
  }
}
