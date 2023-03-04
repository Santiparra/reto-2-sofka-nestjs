import { Injectable } from '@nestjs/common';
import { Invoice } from '../types/invoice';
import { CrearInvoiceDto } from '../dto/invoice.dto';


@Injectable()
export class InvoiceService {
    constructor() {}

    invoices: Invoice[] = []

    buscarInvoices(): Invoice[] {
        const invoices = this.invoices;
        return  invoices
    }

    buscarInvoice (numeroFactura: number): Invoice {
        return this.invoices.find(factura => factura.numFactura === numeroFactura);
    }

    crearInvoice (crearInvoiceDto: CrearInvoiceDto): Invoice {
        this.invoices.push(crearInvoiceDto)
        return crearInvoiceDto
    }

    editarInvoice (numeroFactura: number, crearInvoiceDto: CrearInvoiceDto): Invoice {
        const editInvoice = this.buscarInvoice(numeroFactura);
        const indice = this.invoices.indexOf(editInvoice);
        const newInvoiceData = { ...editInvoice, ...crearInvoiceDto }
        this.invoices.splice(indice, 1, newInvoiceData)
        return newInvoiceData
    }

    actualizarInvoice (numeroFactura: number, crearInvoiceDto: CrearInvoiceDto) {
        const editInvoice = this.buscarInvoice(numeroFactura);
        const indice = this.invoices.indexOf(editInvoice);
        this.invoices.splice(indice, 1, crearInvoiceDto)
        return crearInvoiceDto
    }

    borrarInvoice (numeroFactura: number): Invoice {
        const deleteInvoice= this.invoices.find(invoice => invoice.numFactura == numeroFactura);
        this.invoices = this.invoices.filter(invoice => invoice.numFactura != numeroFactura);
        return deleteInvoice
    }
}
