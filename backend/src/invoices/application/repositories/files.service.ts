import * as fs from 'fs';
import pdf from 'pdf-parse';
import { IFilesService } from '../../../invoices/domain/ports/files.service';

export class FilesService implements IFilesService {
  async listFiles(path: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, files) => {
        if (err) reject(err);
        resolve(files);
      });
    });
  }

  async parsePDF(path: string): Promise<any> {
    const dataBuffer = await fs.readFileSync(path);
    pdf(dataBuffer).then((data) => {
      console.log(data);
    });
  }
}
