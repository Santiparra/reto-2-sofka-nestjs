import { 
    Body,
    Controller, 
    Delete, 
    Get, 
    HttpStatus, 
    NotFoundException, 
    Param, 
    Patch, 
    Post, 
    Put,
    Query,
    Res} from '@nestjs/common';
import { CrearInvoiceDto } from '../dto/invoice.dto';
import { InvoiceService } from '../services/invoice.service';

@Controller('invoice')
export class InvoiceController {
    constructor (private invoiceService: InvoiceService) {}

    @Get("/")
    async buscarInvoices(@Res() res) {
      const invoices = await this.invoiceService.buscarInvoices();
      res.status(HttpStatus.OK).json({ msg: "invoices", invoices });
      return invoices
    }

    @Get("/:invoiceID")
    async buscarInvoice(@Param("invoiceID") invoiceID, @Res() res) {
      const invoice = await this.invoiceService.borrarInvoice(invoiceID);
      if (!invoice) throw new NotFoundException("Invoice no encontrado");      
      return res.status(HttpStatus.OK).json({ msg: "invoice", invoice });      
    }
    
    @Post("/crear")
    async crearInvoice(@Res() res, @Body() crearInvoiceDto: CrearInvoiceDto) {
      const invoiceCreado = await this.invoiceService.crearInvoice(crearInvoiceDto);      
      res.status(HttpStatus.OK).json({ msg: "invoice creado", invoiceCreado });
      return invoiceCreado
    }

    @Patch("/editar")
    async editarInvoice(@Res() res, @Body() crearInvoiceDto: CrearInvoiceDto, @Query("invoiceID") invoiceID) {
      const invoiceEditado = await this.invoiceService.editarInvoice(invoiceID, crearInvoiceDto);
      if (!invoiceEditado) throw new NotFoundException("Invoice no encontrado");      
      return res.status(HttpStatus.OK).json({ msg: "invoice actualizado", invoiceEditado });
    }

    @Put("/actualizar")
    async actualizarInvoice(@Res() res, @Body() crearInvoiceDto: CrearInvoiceDto, @Query("invoiceID") invoiceID) {
      const invoiceActualizado = await this.invoiceService.actualizarInvoice(invoiceID, crearInvoiceDto);
      if (!invoiceActualizado) throw new NotFoundException("Invoice no encontrado");      
      return res.status(HttpStatus.OK).json({ msg: "invoice actualizado", invoiceActualizado });
    }


    @Delete("/borrar")
    async borrarInvoice (@Res() res, @Query("invoiceID") invoiceID) {
      const invoiceBorrado = await this.invoiceService.borrarInvoice(invoiceID);
      if (!invoiceBorrado) throw new NotFoundException("Invoice no encontrado");      
      res.status(HttpStatus.OK).json({ msg: "invoice borrado", invoiceBorrado });
    }

}
