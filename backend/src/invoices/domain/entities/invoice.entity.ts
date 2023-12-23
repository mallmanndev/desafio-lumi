import { InvoiceValue } from './invoice-value.entity';

type InvoiceProps = {
  id: string;
  company: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  customer: string;
  instalation: string;
  mounth: string;
  due_date: Date;
  total_value: number;
  values: InvoiceValue[];
  class: string;
  sub_class: string;
  modality: string;
};

export class Invoice {
  private props: InvoiceProps;

  constructor(data: InvoiceProps) {
    Object.assign(this, data);
  }

  get id() {
    return this.props.id;
  }

  get company() {
    return this.props.company;
  }

  get address() {
    return this.props.address;
  }

  get city() {
    return this.props.city;
  }

  get state() {
    return this.props.state;
  }

  get zip() {
    return this.props.zip;
  }

  get customer() {
    return this.props.customer;
  }

  get instalation() {
    return this.props.instalation;
  }

  get mounth() {
    return this.props.mounth;
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

  get class() {
    return this.props.class;
  }

  get sub_class() {
    return this.props.sub_class;
  }

  get modality() {
    return this.props.modality;
  }
}
