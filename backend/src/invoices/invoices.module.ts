import { Module } from '@nestjs/common';
import { ReadInvoicesUseCase } from './application/use-cases/read-invoice.use-case';
import { FilesService } from './application/services/files.service';
import { InvoicesRepository } from './application/repositories/invoices.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    ReadInvoicesUseCase,
    { provide: 'IFilesService', useClass: FilesService },
    { provide: 'IInvoicesRepository', useClass: InvoicesRepository },
  ],
  exports: [ReadInvoicesUseCase],
})
export class InvoicesModule {}
