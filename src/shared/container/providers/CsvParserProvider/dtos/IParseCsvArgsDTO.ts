import { ReadStream } from 'typeorm/platform/PlatformTools';

export default interface IParseCsvArgsDTO {
  stream: ReadStream;
  keys: string[];
}
