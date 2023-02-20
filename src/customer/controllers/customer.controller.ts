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
import { CustomerDto } from '../dto/customer.dto';    
import { CustomerService } from '../services/customer.service';


@Controller('customer')
export class CustomerController {
    constructor (private customerService: CustomerService) {}

    @Get("/")
    async buscarCustomers(@Res() res) {
      const customers = await this.customerService.buscarCustomers();
      res.status(HttpStatus.OK).json({ msg: "Customers", customers });
      return customers
    }

    @Get("/:customerID")
    async buscarCustomer(@Param("customerID") customerID, @Res() res) {
      const customer = await this.customerService.borrarCustomer(customerID);
      if (!customer) throw new NotFoundException("Customer no encontrado");      
      return res.status(HttpStatus.OK).json({ msg: "Customer", customer });      
    }
    
    @Post("/crear")
    async crearCustomer(@Res() res, @Body() customerDto: CustomerDto) {
      const customerCreado = await this.customerService.crearCustomer(customerDto);      
      res.status(HttpStatus.OK).json({ msg: "Customer creado", customerCreado });
      return customerCreado
    }

    @Patch("/editar")
    async editarCustomer(@Res() res, @Body() customerDto: CustomerDto, @Query("customerID") customerID) {
      const customerEditado = await this.customerService.editarCustomer(customerID, customerDto);
      if (!customerEditado) throw new NotFoundException("Customer no encontrado");      
      return res.status(HttpStatus.OK).json({ msg: "Customer actualizado", customerEditado });
    }

    @Put("/actualizar")
    async actualizarCustomer(@Res() res, @Body() customerDto: CustomerDto, @Query("customerID") customerID) {
      const customerActualizado = await this.customerService.actualizarCustomer(customerID, customerDto);
      if (!customerActualizado) throw new NotFoundException("Customer no encontrado");      
      return res.status(HttpStatus.OK).json({ msg: "Customer actualizado", customerActualizado });
    }

    @Delete("/borrar")
    async borrarCustomer (@Res() res, @Query("customerID") customerID) {
      const customerBorrado = await this.customerService.borrarCustomer(customerID);
      if (!customerBorrado) throw new NotFoundException("Customer no encontrado");      
      return res.status(HttpStatus.OK).json({ msg: "Customer borrado", customerBorrado });
    }

}
