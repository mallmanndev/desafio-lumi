type InvoiceValueProps = {
  name: string;
  unit: 'kWh' | null;
  quantity: number;
  value: number;
  pis: number;
  icms_calc_base: number;
  icms_aliq: number;
  icms: number;
  unit_fare: number;
};

export class InvoiceValue {
  private props: InvoiceValueProps;

  constructor(data: InvoiceValueProps) {
    Object.assign(this, data);
  }

  get name() {
    return this.props.name;
  }

  get unit() {
    return this.props.unit;
  }

  get quantity() {
    return this.props.quantity;
  }

  get value() {
    return this.props.value;
  }

  get pis() {
    return this.props.pis;
  }

  get icms_calc_base() {
    return this.props.icms_calc_base;
  }

  get icms_aliq() {
    return this.props.icms_aliq;
  }

  get icms() {
    return this.props.icms;
  }

  get unit_fare() {
    return this.props.unit_fare;
  }
}
