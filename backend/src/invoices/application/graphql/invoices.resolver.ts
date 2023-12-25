import { PrismaService } from '../../../prisma/prisma.service';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Invoice } from './models/invoice.model';

@Resolver(() => Invoice)
export class InvoicesResolver {
  constructor(private readonly prismaService: PrismaService) {}

  @Query(() => [Invoice])
  async invoices(@Args('customer') customer: string) {
    const invoices = await this.prismaService.invoice.findMany({
      include: { values: true },
      where: customer ? { customer } : {},
    });
    return invoices;
  }
}
