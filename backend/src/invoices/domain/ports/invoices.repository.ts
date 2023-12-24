import { Invoice } from '../entities/invoice.entity';

export interface IInvoicesRepository {
  save(invoice: Invoice): Promise<void>;
}
