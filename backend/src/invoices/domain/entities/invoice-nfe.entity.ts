type InvoiceNfeProps = {
  nfeNumber: string;
  key: string;
  emission_date: Date;
  authorization: number;
};

export class InvoiceNfe {
  private props: InvoiceNfeProps;

  constructor(data: InvoiceNfeProps) {
    this.props = data;
  }

  static create(data: InvoiceNfeProps): InvoiceNfe {
    return new InvoiceNfe(data);
  }

  get key() {
    return this.props.key;
  }

  get emission_date() {
    return this.props.emission_date;
  }

  get authorization() {
    return this.props.authorization;
  }
}
