import { Invoice } from '../../domain/entities/invoice.entity';
import { ReadInvoicesUseCase } from './read-invoice.use-case';

describe('ReadInvoiceUseCase', () => {
  const invoicesRepository = {
    save: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return void when folder is empty', async () => {
    const filesService = {
      listFiles: jest.fn().mockResolvedValue([]),
      parsePDF: jest.fn().mockResolvedValue(''),
    };
    const readInvoiceUseCase = new ReadInvoicesUseCase(
      filesService,
      invoicesRepository,
    );

    await readInvoiceUseCase.execute();
    expect(filesService.listFiles).toHaveBeenCalledTimes(1);
    expect(invoicesRepository.save).toHaveBeenCalledTimes(0);
  });

  it('Should log error when not parse PDF file', async () => {
    const filesService = {
      listFiles: jest.fn().mockResolvedValue(['test.pdf']),
      parsePDF: jest.fn().mockRejectedValue('Error'),
    };
    const readInvoiceUseCase = new ReadInvoicesUseCase(
      filesService,
      invoicesRepository,
    );

    await readInvoiceUseCase.execute();
    expect(filesService.listFiles).toHaveBeenCalledTimes(1);
    expect(filesService.parsePDF).toHaveBeenCalledTimes(1);
    expect(filesService.parsePDF).toHaveBeenCalledWith(
      './faturas/pending/test.pdf',
    );
    expect(invoicesRepository.save).toHaveBeenCalledTimes(0);
  });

  it('Should save invoice successfully', async () => {
    const invoice = Invoice.create({
      customer: '7005400387',
      due_date: new Date('2023-07-11'),
      instalation: '3000055479',
      month: 'JUN/2023',
      total_value: 125.26,
      values: [],
    });
    const filesService = {
      listFiles: jest.fn().mockResolvedValue(['test.pdf']),
      parsePDF: jest.fn().mockResolvedValue(invoice),
    };
    const readInvoiceUseCase = new ReadInvoicesUseCase(
      filesService,
      invoicesRepository,
    );

    await readInvoiceUseCase.execute();
    expect(filesService.listFiles).toHaveBeenCalledTimes(1);
    expect(filesService.parsePDF).toHaveBeenCalledTimes(1);
    expect(filesService.parsePDF).toHaveBeenCalledWith(
      './faturas/pending/test.pdf',
    );
    expect(invoicesRepository.save).toHaveBeenCalledTimes(1);
    expect(invoicesRepository.save).toHaveBeenCalledWith(invoice);
  });
});
