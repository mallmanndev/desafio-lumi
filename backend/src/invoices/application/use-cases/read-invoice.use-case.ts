import { Inject, Injectable } from '@nestjs/common';
import { IFilesService } from '../../../invoices/domain/ports/files.service';

/**
 * @description
 * Use case para ler os dados do PDF de fatura e salvar no banco de dados
 * os dados são lidos de uma pasta temporária, onde são salvos os PDFs
 * após a leitura e salvamento no banco de dados, o PDF é movido para uma nova pasta
 * e o caminho do PDF é salvo no banco de dados
 */
@Injectable()
export class ReadInvoicesUseCase {
  constructor(
    @Inject('IFilesService')
    private readonly filesService: IFilesService,
  ) {}

  async execute() {
    console.log('Teste');
    const files = await this.filesService.listFiles(`./faturas/pending/`);
    if (files.length === 0) return;

    // for (const file of files) {
    await this.filesService.parsePDF(`./faturas/pending/${files[0]}`);
    // }

    console.log(files);
  }
}
