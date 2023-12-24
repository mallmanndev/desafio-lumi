import { InvoicesRepository } from './invoices.repository';
import { Invoice } from '../../domain/entities/invoice.entity';
import {
  InvoiceValue,
  InvoiceValueType,
} from '../../domain/entities/invoice-value.entity';

describe('Test Invoices Repository', () => {
  it('Should save invoice', () => {
    const prismaService = {
      invoice: { create: jest.fn() },
    };
    const repository = new InvoicesRepository(prismaService as any);

    const invoice = Invoice.create({
      customer: '7005400387',
      due_date: new Date('2023-07-11'),
      instalation: '3000055479',
      month: 'JUN/2023',
      total_value: 125.26,
      values: [
        InvoiceValue.create({
          type: InvoiceValueType.ENERGIA,
          quantity: 50,
          value: 43.28,
          price: 0.86613683,
          unit_fare: 0.67479161,
        }),
        InvoiceValue.create({
          type: InvoiceValueType.ENERGIA_SEM_ICMS,
          quantity: 1007,
          price: 0.64802788,
          value: 652.55,
          unit_fare: 0.61569129,
        }),
        InvoiceValue.create({
          type: InvoiceValueType.ENERGIA_COMPENSADA,
          quantity: 1007,
          price: 0.61569129,
          value: -620,
          unit_fare: 0.61569129,
        }),
        InvoiceValue.create({
          type: InvoiceValueType.CONTRIBUICAO_ILUMINACAO,
          quantity: 0,
          price: 0,
          value: 49.43,
          unit_fare: 0,
        }),
      ],
    });
    repository.save(invoice);

    expect(prismaService.invoice.create).toHaveBeenCalledTimes(1);
    expect(prismaService.invoice.create.mock.calls[0][0]).toMatchObject({
      data: {
        id: expect.any(String),
        customer: '7005400387',
        due_date: new Date('2023-07-11T00:00:00.000Z'),
        file_url: '',
        instalation: '3000055479',
        month: 'JUN/2023',
        total_value: 125.26,
        values: {
          createMany: {
            data: [
              {
                type: 'ENERGIA',
                value: 43.28,
                price: 0.86613683,
                quantity: 50,
                unit_fare: 0.67479161,
              },
              {
                type: 'ENERGIA_SEM_ICMS',
                value: 652.55,
                price: 0.64802788,
                quantity: 1007,
                unit_fare: 0.61569129,
              },
              {
                type: 'ENERGIA_COMPENSADA',
                value: -620,
                price: 0.61569129,
                quantity: 1007,
                unit_fare: 0.61569129,
              },
              {
                type: 'CONTRIBUICAO_ILUMINACAO',
                value: 49.43,
                price: 0,
                quantity: 0,
                unit_fare: 0,
              },
            ],
          },
        },
      },
    });
  });
});
