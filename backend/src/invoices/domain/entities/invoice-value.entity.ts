export enum InvoiceValueType {
  ENERGIA = 'ENERGIA',
  ENERGIA_SEM_ICMS = 'ENERGIA_SEM_ICMS',
  ENERGIA_COMPENSADA = 'ENERGIA_COMPENSADA',
  CONTRIBUICAO_ILUMINACAO = 'CONTRIBUICAO_ILUMINACAO',
}

type InvoiceValueProps = {
  type: InvoiceValueType;
  quantity: number;
  price: number;
  value: number;
  unit_fare: number;
};

export class InvoiceValue {
  private props: InvoiceValueProps;

  constructor(data: InvoiceValueProps) {
    this.props = data;
  }

  static create(data: InvoiceValueProps): InvoiceValue {
    return new InvoiceValue(data);
  }

  get type() {
    return this.props.type;
  }

  get quantity() {
    return this.props.quantity;
  }

  get price() {
    return this.props.price;
  }

  get value() {
    return this.props.value;
  }

  get unit_fare() {
    return this.props.unit_fare;
  }
}
