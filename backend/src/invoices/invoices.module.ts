import { Module } from '@nestjs/common';
import { ReadInvoicesUseCase } from './application/use-cases/read-invoice.use-case';
import { FilesService } from './application/repositories/files.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    ReadInvoicesUseCase,
    { provide: 'IFilesService', useClass: FilesService },
  ],
  exports: [ReadInvoicesUseCase],
})
export class InvoicesModule {}
