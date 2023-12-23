import * as path from 'path';
import { FilesService } from './files.service';

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
    expect(output.nfe_emission_date).toEqual(
      new Date('2023-06-27T03:00:00.000Z'),
    );
    expect(output.nfe_authroization).toBe(1312300052935339);
    expect(output.nfe_key).toEqual(
      '31230606981180000116660000470989551001712718',
    );
  });
});
