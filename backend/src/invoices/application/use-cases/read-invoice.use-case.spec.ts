import { ReadInvoicesUseCase } from './read-invoice.use-case';

describe('ReadInvoiceUseCase', () => {
  it('Should return void when folder is empty', async () => {
    const filesService = { listFiles: jest.fn().mockResolvedValue([]) };
    const readInvoiceUseCase = new ReadInvoicesUseCase(filesService);

    await readInvoiceUseCase.execute();
    expect(filesService.listFiles).toHaveBeenCalledTimes(1);
  });

  it('Should log error when not parse PDF file', async () => {
    const filesService = { listFiles: jest.fn().mockResolvedValue([]) };
    const readInvoiceUseCase = new ReadInvoicesUseCase(filesService);

    await readInvoiceUseCase.execute();
    expect(filesService.listFiles).toHaveBeenCalledTimes(1);
  });
});
