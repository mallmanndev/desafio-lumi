import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './tasks/task.module';
import { InvoicesModule } from './invoices/invoices.module';

@Module({
  imports: [ScheduleModule.forRoot(), InvoicesModule, TaskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
