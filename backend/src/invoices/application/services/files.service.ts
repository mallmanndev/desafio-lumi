import * as fs from 'fs';
import * as Pdf from 'pdf-parse';
import { IFilesService } from '../../domain/ports/files.service';
import { Invoice } from '../../../invoices/domain/entities/invoice.entity';
import {
  InvoiceValue,
  InvoiceValueType,
} from '../../../invoices/domain/entities/invoice-value.entity';
import { parse } from 'date-fns';

const PdfTyped = Pdf as any;

export class FilesService implements IFilesService {
  async listFiles(path: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, files) => {
        if (err) reject(err);
        resolve(files);
      });
    });
  }

  async parsePDF(path: string): Promise<Invoice> {
    try {
      const pdfData = {
        customer: '',
        instalation: '',
        month: '',
        due_date: new Date(),
        total_value: 0,
        nfe_emission_date: new Date(),
        nfe_authroization: 0,
        nfe_key: '',
      };
      const dataBuffer = fs.readFileSync(path);
      const data = await PdfTyped(dataBuffer);

      const lines = data.text.split('\n');
      const nonEmptyLines = lines.filter((line) => line.trim() !== '');

      const values = [];

      for (const i in nonEmptyLines) {
        const line = nonEmptyLines[i];

        if (line.includes('Nº DO CLIENTE')) {
          const nIndex = parseInt(i) + 1;
          const [customer, instalation] = this.removeWhitespaces(
            nonEmptyLines[nIndex],
          ).split(' ');
          pdfData.customer = customer;
          pdfData.instalation = instalation;
        }

        if (line.includes('Referente a')) {
          const nIndex = parseInt(i) + 1;
          const [month, due_date, total_value] = this.removeWhitespaces(
            nonEmptyLines[nIndex],
          ).split(' ');
          pdfData.month = month;
          pdfData.due_date = parse(due_date, 'dd/MM/yyyy', new Date());
          pdfData.total_value = parseFloat(total_value.replace(',', '.'));
        }

        if (line.includes('Data de emissão')) {
          const emissionDate = this.removeWhitespaces(line).split(': ')[1];
          pdfData.nfe_emission_date = parse(
            emissionDate,
            'dd/MM/yyyy',
            new Date(),
          );
        }

        if (line.includes('Protocolo de autorização:')) {
          const authorization = this.removeWhitespaces(line).split(': ')[1];
          pdfData.nfe_authroization = parseInt(authorization);
        }

        if (line.includes('chave de acesso:')) {
          const nIndex = parseInt(i) + 1;
          const key = nonEmptyLines[nIndex];
          pdfData.nfe_key = key;
        }

        if (line.includes('Energia ElétricakWh')) {
          const arr = this.removeWhitespaces(line).split(' ');
          values.push(
            InvoiceValue.create({
              type: InvoiceValueType.ENERGIA,
              quantity: parseInt(arr[2]),
              price: parseFloat(arr[3].replace(',', '.')),
              value: parseFloat(arr[4].replace(',', '.')),
              unit_fare: parseFloat(arr[5].replace(',', '.')),
            }),
          );
        }

        if (line.includes('Energia SCEE s/ ICMSkWh')) {
          const arr = this.removeWhitespaces(line).split(' ');
          values.push(
            InvoiceValue.create({
              type: InvoiceValueType.ENERGIA_SEM_ICMS,
              quantity: parseInt(arr[4]),
              price: parseFloat(arr[5].replace(',', '.')),
              value: parseFloat(arr[6].replace(',', '.')),
              unit_fare: parseFloat(arr[7].replace(',', '.')),
            }),
          );
        }

        if (line.includes('Energia compensada')) {
          const arr = this.removeWhitespaces(line).split(' ');
          values.push(
            InvoiceValue.create({
              type: InvoiceValueType.ENERGIA_COMPENSADA,
              quantity: parseInt(arr[4]),
              price: parseFloat(arr[5].replace(',', '.')),
              value: parseFloat(arr[6].replace(',', '.')),
              unit_fare: parseFloat(arr[7].replace(',', '.')),
            }),
          );
        }

        if (line.includes('Contrib Ilum Publica Municipal')) {
          const arr = this.removeWhitespaces(line).split(' ');
          values.push(
            InvoiceValue.create({
              type: InvoiceValueType.CONTRIBUICAO_ILUMINACAO,
              quantity: 0,
              price: 0,
              value: parseFloat(arr[4].replace(',', '.')),
              unit_fare: 0,
            }),
          );
        }
      }

      return Invoice.create({ ...pdfData, values: values });
    } catch (error) {
      console.error('Erro ao extrair dados do PDF:', error);
    }
  }

  private removeWhitespaces(text: string): string {
    return text.replace(/\s{2,}/g, ' ').trim();
  }
}
