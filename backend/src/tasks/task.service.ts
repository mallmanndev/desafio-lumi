import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ReadInvoicesUseCase } from '../invoices/application/use-cases/read-invoice.use-case';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly readInvoiceUseCase: ReadInvoicesUseCase) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    this.logger.debug('Importando faturas...');
    await this.readInvoiceUseCase.execute();
  }
}
