import { Invoice } from '../entities/invoice.entity';

export interface IFilesService {
  listFiles(path: string): Promise<string[]>;
  parsePDF(path: string): Promise<Invoice>;
  move(path: string, newPath: string): Promise<void>;
}
