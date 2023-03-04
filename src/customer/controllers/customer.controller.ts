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
    buscarCustomers(@Res() res) {
      const customers = this.customerService.buscarCustomers();
      res.status(HttpStatus.OK).json({ msg: "Customers", customers });
      return customers
    }

    @Get("/:customerNombre")
    buscarCustomer(@Param("customerNombre") customerNombre, @Res() res) {
      const customer = this.customerService.borrarCustomer(customerNombre);
      if (!customer) throw new NotFoundException("Customer no encontrado");      
      return res.status(HttpStatus.OK).json({ msg: "Customer", customer });      
    }
    
    @Post("/crear")
    crearCustomer( @Body() customerDto: CustomerDto ) {
      return this.customerService.crearCustomer(customerDto);      
    }

    @Patch("/editar")
    editarCustomer( @Body() customerDto: CustomerDto, @Query("customerNombre") customerNombre ) {
      return this.customerService.editarCustomer(customerNombre, customerDto)
    }

    @Put("/actualizar")
    actualizarCustomer( @Body() customerDto: CustomerDto, @Query("customerNombre") customerNombre ) {
      return this.customerService.actualizarCustomer(customerNombre, customerDto);
    }

    @Delete("/borrar")
    borrarCustomer ( @Query("customerNombre") customerNombre ) {
      return this.customerService.borrarCustomer(customerNombre);
    }

}
