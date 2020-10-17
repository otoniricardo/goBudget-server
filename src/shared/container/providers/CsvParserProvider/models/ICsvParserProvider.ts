import { ReadStream } from 'typeorm/platform/PlatformTools';
import IParseCsvResponseDTO from '@shared/container/providers/CsvParserProvider/dtos/IParseCsvResponseDTO';
import IParseCsvArgsDTO from '../dtos/IParseCsvArgsDTO';

export default interface IParseCsvProvider {
  parse(args: IParseCsvArgsDTO): Promise<IParseCsvResponseDTO[]>;
}
