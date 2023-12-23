import { Module } from '@nestjs/common';
import { TasksService } from './task.service';
import { InvoicesModule } from '../invoices/invoices.module';

@Module({
  imports: [InvoicesModule],
  providers: [TasksService],
})
export class TaskModule {}
