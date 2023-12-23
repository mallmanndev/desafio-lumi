export interface IFilesService {
  listFiles(path: string): Promise<string[]>;
  parsePDF(path: string): Promise<any>;
}
