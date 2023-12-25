import { randomUUID } from 'crypto';
import { InvoiceValue } from './invoice-value.entity';

type InvoiceProps = {
  id: string;
  customer: string;
  instalation: string;
  month: string;
  due_date: Date;
  total_value: number;
  file_url: string;
  values: InvoiceValue[];
};

export class Invoice {
  private props: InvoiceProps;

  constructor(data: InvoiceProps) {
    this.props = data;
  }

  static create(data: Omit<InvoiceProps, 'id' | 'file_url'>): Invoice {
    const id = randomUUID().toString();
    return new Invoice({ ...data, id, file_url: '' });
  }

  public changeFileUrl(file_url: string): void {
    this.props.file_url = file_url;
  }

  get id() {
    return this.props.id;
  }

  get customer() {
    return this.props.customer;
  }

  get instalation() {
    return this.props.instalation;
  }

  get month() {
    return this.props.month;
  }

  get due_date() {
    return this.props.due_date;
  }

  get total_value() {
    return this.props.total_value;
  }

  get values() {
    return this.props.values;
  }

  get file_url() {
    return this.props.file_url;
  }
}
