import { Injectable } from '@nestjs/common';
import { Invoice } from '../../domain/entities/invoice.entity';
import { IInvoicesRepository } from '../../domain/ports/invoices.repository';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class InvoicesRepository implements IInvoicesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(invoice: Invoice): Promise<void> {
    await this.prisma.invoice.create({
      data: {
        id: invoice.id,
        customer: invoice.customer,
        due_date: invoice.due_date,
        file_url: invoice.file_url,
        instalation: invoice.instalation,
        month: invoice.month,
        total_value: invoice.total_value,
        values: {
          createMany: {
            data: invoice.values.map((value) => ({
              type: value.type,
              value: value.value,
              price: value.price,
              quantity: value.quantity,
              unit_fare: value.unit_fare,
            })),
          },
        },
      },
    });
  }
}
