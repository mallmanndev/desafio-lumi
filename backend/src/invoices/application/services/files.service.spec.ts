import * as path from 'path';
import { FilesService } from './files.service';
import { InvoiceValueType } from '../../domain/entities/invoice-value.entity';

describe('Read PDF', () => {
  const filesService = new FilesService();

  it('should read PDF', async () => {
    const output = await filesService.parsePDF(
      path.join(__dirname, '../../../../test/fixtures/invoice-test.pdf'),
    );

    expect(output.customer).toBe('7005400387');
    expect(output.instalation).toBe('3000055479');
    expect(output.month).toBe('JUN/2023');
    expect(output.due_date).toEqual(new Date('2023-07-11T03:00:00.000Z'));

    expect(output.values).toHaveLength(4);

    expect(output.values[0].type).toBe(InvoiceValueType.ENERGIA);
    expect(output.values[0].quantity).toBe(50);
    expect(output.values[0].price).toBe(0.86613683);
    expect(output.values[0].value).toBe(43.28);
    expect(output.values[0].unit_fare).toBe(0.67479161);

    expect(output.values[1].type).toBe(InvoiceValueType.ENERGIA_SEM_ICMS);
    expect(output.values[1].quantity).toBe(1);
    expect(output.values[1].price).toBe(0.64802788);
    expect(output.values[1].value).toBe(652.55);
    expect(output.values[1].unit_fare).toBe(0.61569129);

    expect(output.values[2].type).toBe(InvoiceValueType.ENERGIA_COMPENSADA);
    expect(output.values[2].quantity).toBe(1);
    expect(output.values[2].price).toBe(0.61569129);
    expect(output.values[2].value).toBe(-620);
    expect(output.values[2].unit_fare).toBe(0.61569129);

    expect(output.values[3].type).toBe(
      InvoiceValueType.CONTRIBUICAO_ILUMINACAO,
    );
    expect(output.values[3].quantity).toBe(0);
    expect(output.values[3].price).toBe(0);
    expect(output.values[3].value).toBe(49.43);
    expect(output.values[3].unit_fare).toBe(0);
  });
});
