import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InvoiceValue {
  @Field(() => String)
  type: string;

  @Field(() => Number)
  quantity: number;

  @Field(() => Number)
  price: number;

  @Field(() => Number)
  value: number;

  @Field(() => Number)
  unit_fare: number;
}

@ObjectType()
export class Invoice {
  @Field(() => String)
  id: string;

  @Field(() => String)
  customer: string;

  @Field(() => Date)
  due_date: Date;

  @Field(() => String)
  instalation: string;

  @Field(() => String)
  month: string;

  @Field(() => Number)
  total_value: number;

  @Field(() => String)
  file_url: string;

  @Field(() => [InvoiceValue])
  values: InvoiceValue[];
}
